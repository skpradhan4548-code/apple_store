const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;

describe('Authentication Unit Tests', () => {
  describe('Email Regex Validation', () => {
    it('accepts valid standard email addresses', () => {
      const validEmails = [
        'customer@apple.com',
        'subha.dev@gmail.com',
        'tim.cook@apple.co.in',
        'user+tag@domain.org',
      ];
      for (const email of validEmails) {
        assert.ok(EMAIL_REGEX.test(email), `Expected ${email} to be valid`);
      }
    });

    it('rejects malformed email addresses', () => {
      const invalidEmails = [
        '',
        'notanemail',
        '@domain.com',
        'user@',
        'user@domain',
        'user @domain.com',
        'user@domain..com',
      ];
      for (const email of invalidEmails) {
        assert.strictEqual(EMAIL_REGEX.test(email), false, `Expected ${email} to be invalid`);
      }
    });
  });

  describe('Password Length Validation', () => {
    it('enforces minimum 6 character password length', () => {
      const isPasswordValid = (pw) => typeof pw === 'string' && pw.length >= 6;

      assert.strictEqual(isPasswordValid('12345'), false);
      assert.strictEqual(isPasswordValid(''), false);
      assert.strictEqual(isPasswordValid(null), false);
      assert.strictEqual(isPasswordValid('123456'), true);
      assert.strictEqual(isPasswordValid('SuperSecretApplePassword'), true);
    });
  });

  describe('JWT Token Lifecycle', () => {
    const TEST_SECRET = 'test_secret_for_unit_testing_12345';

    it('signs and verifies a valid user payload', () => {
      const userId = '64fa1234abcd5678ef012345';
      const token = jwt.sign({ id: userId }, TEST_SECRET, { expiresIn: '1h' });

      assert.ok(token, 'Token should be generated');
      const decoded = jwt.verify(token, TEST_SECRET);
      assert.strictEqual(decoded.id, userId);
    });

    it('rejects tampered or improperly signed tokens', () => {
      const token = jwt.sign({ id: 'valid_user' }, TEST_SECRET);
      const WRONG_SECRET = 'wrong_secret_signature';

      assert.throws(() => {
        jwt.verify(token, WRONG_SECRET);
      }, /invalid signature/);
    });
  });
});
