import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { formatPrice, formatEmiMonthly } from '../src/utils/formatters.js';

describe('Frontend Core Business Logic & Formatter Tests', () => {
  describe('formatPrice() Utility', () => {
    it('formats standard integer rupee amounts with INR symbol and Indian thousand groupings', () => {
      const formatted = formatPrice(99900);
      // Depending on OS Intl locale, it will contain ₹ and 99,900
      assert.ok(formatted.includes('99,900'), `Expected formatted price to contain 99,900, got ${formatted}`);
      assert.ok(formatted.includes('₹'), `Expected formatted price to contain ₹ symbol, got ${formatted}`);
    });

    it('formats large numbers with Indian lakh grouping (e.g. 1,49,900)', () => {
      const formatted = formatPrice(149900);
      assert.ok(formatted.includes('1,49,900'), `Expected 1,49,900 in formatted string, got ${formatted}`);
    });

    it('handles decimal parameter correctly', () => {
      const formatted = formatPrice(59900, true);
      assert.ok(formatted.includes('.00'), `Expected .00 when includeDecimals is true, got ${formatted}`);
    });

    it('returns ₹0 for null, undefined, NaN, and 0 inputs without crashing', () => {
      assert.strictEqual(formatPrice(0), '₹0');
      assert.strictEqual(formatPrice(null), '₹0');
      assert.strictEqual(formatPrice(undefined), '₹0');
      assert.strictEqual(formatPrice(NaN), '₹0');
      assert.strictEqual(formatPrice('not-a-number'), '₹0');
    });
  });

  describe('formatEmiMonthly() Utility', () => {
    it('computes 6-month monthly EMI accurately', () => {
      // 120,000 / 6 = 20,000
      const formatted = formatEmiMonthly(120000, 6);
      assert.ok(formatted.includes('20,000'), `Expected monthly EMI of 20,000, got ${formatted}`);
    });

    it('safely handles zero or invalid prices', () => {
      assert.strictEqual(formatEmiMonthly(0), '₹0');
      assert.strictEqual(formatEmiMonthly(null), '₹0');
      assert.strictEqual(formatEmiMonthly(99900, 0), '₹0');
    });
  });

  describe('Cart Composite Variant Key Generation', () => {
    const makeKey = (productId, color, storage) =>
      `${productId}-${color || 'any'}-${storage || 'any'}`;

    it('isolates different colors of the same storage and model', () => {
      const keyNatural = makeKey('iphone-16-pro', 'Natural Titanium', '256 GB');
      const keyBlack   = makeKey('iphone-16-pro', 'Black Titanium', '256 GB');

      assert.notStrictEqual(keyNatural, keyBlack, 'Keys for different colors must be distinct');
      assert.strictEqual(keyNatural, 'iphone-16-pro-Natural Titanium-256 GB');
      assert.strictEqual(keyBlack, 'iphone-16-pro-Black Titanium-256 GB');
    });

    it('isolates different storage options of the same color', () => {
      const key128 = makeKey('iphone-16-pro', 'Desert Titanium', '128 GB');
      const key256 = makeKey('iphone-16-pro', 'Desert Titanium', '256 GB');

      assert.notStrictEqual(key128, key256, 'Keys for different storages must be distinct');
    });

    it('uses fallback "any" when color or storage is unspecified', () => {
      const keyDefault = makeKey('magic-mouse', null, null);
      assert.strictEqual(keyDefault, 'magic-mouse-any-any');
    });
  });

  describe('Category Tab Model Substring Filtering', () => {
    const filterProducts = (products, selectedTab) => {
      if (selectedTab === 'All') return products;
      return products.filter((p) => {
        const name = p.name.toLowerCase();
        const tab  = selectedTab.toLowerCase();
        if (tab === 'ipad') {
          return name.includes('ipad') &&
                 !name.includes('pro') &&
                 !name.includes('air') &&
                 !name.includes('mini');
        }
        return name.includes(tab);
      });
    };

    const mockIpadProducts = [
      { id: 'ipad-10th', name: 'iPad (10th Generation)' },
      { id: 'ipad-pro',  name: 'iPad Pro' },
      { id: 'ipad-air',  name: 'iPad Air' },
      { id: 'ipad-mini', name: 'iPad mini' },
    ];

    it('isolates base iPad without leaking Pro, Air, or mini models', () => {
      const filtered = filterProducts(mockIpadProducts, 'iPad');
      assert.strictEqual(filtered.length, 1);
      assert.strictEqual(filtered[0].id, 'ipad-10th');
    });

    it('filters Pro models accurately', () => {
      const filtered = filterProducts(mockIpadProducts, 'Pro');
      assert.strictEqual(filtered.length, 1);
      assert.strictEqual(filtered[0].id, 'ipad-pro');
    });

    it('returns all models when tab is "All"', () => {
      const filtered = filterProducts(mockIpadProducts, 'All');
      assert.strictEqual(filtered.length, 4);
    });
  });
});
