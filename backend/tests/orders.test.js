const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

describe('Order Processing & Financial Logic Tests', () => {
  describe('Order Number Generation', () => {
    const generateOrderNumber = () => 'W' + Math.floor(100000000 + Math.random() * 900000000);

    it('generates an order number starting with W followed by 9 digits', () => {
      for (let i = 0; i < 50; i++) {
        const orderNum = generateOrderNumber();
        assert.match(orderNum, /^W\d{9}$/, `Expected order number ${orderNum} to match ^W\\d{9}$`);
      }
    });

    it('generates distinct random order numbers across successive calls', () => {
      const set = new Set();
      for (let i = 0; i < 20; i++) {
        set.add(generateOrderNumber());
      }
      assert.strictEqual(set.size, 20, 'All generated order numbers should be unique in small sample');
    });
  });

  describe('Authoritative Financial Calculation Engine', () => {
    const calculateTotals = (subtotal) => {
      const tax = Math.round(subtotal * 0.18);
      const shipping = 0; // Free Apple delivery
      const total = subtotal + tax + shipping;
      return { tax, shipping, total };
    };

    it('calculates 18% GST/tax accurately with integer rounding', () => {
      const { tax, total } = calculateTotals(134900);
      assert.strictEqual(tax, 24282); // 134900 * 0.18 = 24282
      assert.strictEqual(total, 159182);
    });

    it('handles zero amount safely', () => {
      const { tax, total } = calculateTotals(0);
      assert.strictEqual(tax, 0);
      assert.strictEqual(total, 0);
    });

    it('resolves correct variant pricing from product storage tier', () => {
      const product = {
        id: 'iphone-16-pro',
        name: 'iPhone 16 Pro',
        basePrice: 119900,
        storage: [
          { label: '128 GB', price: 119900 },
          { label: '256 GB', price: 129900 },
          { label: '512 GB', price: 149900 },
          { label: '1 TB',   price: 169900 },
        ],
      };

      const resolvePrice = (itemStorage) => {
        if (!itemStorage || !product.storage?.length) return product.basePrice;
        const matched = product.storage.find(
          s => s.label.toLowerCase().trim() === itemStorage.toLowerCase().trim()
        );
        return matched ? matched.price : product.basePrice;
      };

      assert.strictEqual(resolvePrice('128 GB'), 119900);
      assert.strictEqual(resolvePrice('256 GB'), 129900);
      assert.strictEqual(resolvePrice('512 GB'), 149900);
      assert.strictEqual(resolvePrice('1 TB'), 169900);
      assert.strictEqual(resolvePrice('non-existent'), 119900); // Fallback to base price
      assert.strictEqual(resolvePrice(null), 119900);
    });
  });
});
