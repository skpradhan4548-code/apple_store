/**
 * Centralized formatting utilities for Apple Store
 * Provides standardized, locale-aware currency and number formatting.
 */

/**
 * Formats a numeric price into Indian Rupee currency format (e.g. ₹99,900 or ₹1,39,900.00)
 * @param {number} amount - Price amount
 * @param {boolean} includeDecimals - Whether to render .00
 * @returns {string}
 */
export const formatPrice = (amount, includeDecimals = false) => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return '₹0';
  }

  const options = {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: includeDecimals ? 2 : 0,
    minimumFractionDigits: includeDecimals ? 2 : 0,
  };

  return new Intl.NumberFormat('en-IN', options).format(amount);
};

/**
 * Formats 6-month No Cost EMI calculation
 * @param {number} basePrice
 * @returns {string}
 */
export const formatEmiMonthly = (basePrice, months = 6) => {
  if (!basePrice || months <= 0) return '₹0';
  const monthly = Math.round(basePrice / months);
  return formatPrice(monthly, true);
};
