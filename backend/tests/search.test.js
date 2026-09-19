const { describe, it } = require('node:test');
const assert = require('node:assert/strict');

const escapeRegex = (text) => text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');

describe('Search Query Sanitization Tests', () => {
  it('escapes regex metacharacters without crashing', () => {
    const maliciousInputs = [
      'iPhone (16)',
      'iPad [Pro]',
      'MacBook+Air',
      'Apple.*Watch',
      'AirPods???',
      '^HomePod$',
      '{test}',
      'price\\value',
    ];

    for (const input of maliciousInputs) {
      const escaped = escapeRegex(input);
      // Ensure we can safely create a RegExp from escaped string
      assert.doesNotThrow(() => {
        new RegExp(escaped, 'i');
      }, `Failed to create safe RegExp from input: ${input}`);
    }
  });

  it('matches target strings accurately with escaped regex', () => {
    const raw = 'iPhone (16)';
    const escaped = escapeRegex(raw);
    const regex = new RegExp(escaped, 'i');

    assert.ok(regex.test('New iPhone (16) Ultra'));
    assert.strictEqual(regex.test('iPhone 16 without parens'), false);
  });
});
