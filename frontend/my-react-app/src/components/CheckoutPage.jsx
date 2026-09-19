import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
import { formatPrice } from '../utils/formatters';
import Navbar from './Navbar';
import Footer from './Footer';
import './CheckoutPage.css';

const DEFAULT_CARD = {
  number: '•••• •••• •••• 4242',
  expiry: '12/28',
  cvv: '•••',
};

const CheckoutPage = () => {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user, token } = useAuth();

  // Step state: 'checkout' | 'processing' | 'confirmed'
  const [step, setStep] = useState('checkout');
  const [confirmedOrder, setConfirmedOrder] = useState(null);
  const [apiError, setApiError] = useState('');

  // Form states
  const [form, setForm] = useState(() => ({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    street: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
  }));

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [upiId, setUpiId] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Full name is required.';
    if (!form.email.trim()) e.email = 'Email address is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address.';
    if (!form.phone.trim()) e.phone = 'Mobile number is required.';
    else if (form.phone.replace(/\D/g, '').length < 10) e.phone = 'Enter a valid 10-digit mobile number.';
    if (!form.street.trim()) e.street = 'Street address is required.';
    if (!form.city.trim()) e.city = 'City is required.';
    if (!form.postalCode.trim()) e.postalCode = 'PIN code is required.';
    else if (!/^\d{6}$/.test(form.postalCode.trim())) e.postalCode = 'Enter a valid 6-digit PIN code.';

    if (paymentMethod === 'upi' && !upiId.includes('@')) {
      e.upi = 'Enter a valid UPI ID (e.g. user@okaxis).';
    }

    return e;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 120, behavior: 'smooth' });
      return;
    }

    setStep('processing');
    setApiError('');

    try {
      const orderPayload = {
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
        },
        shippingAddress: {
          street: form.street.trim(),
          city: form.city.trim(),
          state: form.state.trim(),
          postalCode: form.postalCode.trim(),
          country: 'India',
        },
        items: items.map(item => ({
          id: item.id,
          name: item.name,
          variant: item.variant,
          color: item.color,
          storage: item.storage,
          qty: item.qty,
          image: item.image,
        })),
        paymentMethod,
      };

      const response = await apiClient.createOrder(orderPayload, token);

      if (response?.order) {
        setConfirmedOrder(response.order);
        setStep('confirmed');
        clearCart();
        window.scrollTo(0, 0);
      } else {
        throw new Error('Unexpected order response from server.');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setApiError(err.message || 'Unable to complete order. Please check your details and try again.');
      setStep('checkout');
    }
  };

  const estimatedTax = Math.round(totalPrice * 0.18);
  const orderTotal = totalPrice + estimatedTax;

  /* Empty bag edge case (if not in confirmation screen) */
  if (items.length === 0 && step !== 'confirmed') {
    return (
      <div className="checkout-page">
        <Navbar />
        <div className="checkout-empty">
          <div className="checkout-empty__inner">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#86868b" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6zM3 6h18M16 10a4 4 0 01-8 0" />
            </svg>
            <h1 className="checkout-empty__title">Your Bag is empty</h1>
            <p className="checkout-empty__desc">Add an item to your bag before checking out.</p>
            <Link to="/" className="checkout-btn checkout-btn--primary">
              Continue Shopping
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  /* Confirmed Order Receipt */
  if (step === 'confirmed' && confirmedOrder) {
    return (
      <div className="checkout-page">
        <Navbar />
        <main className="checkout-confirmed" role="main" aria-label="Order Confirmation">
          <div className="checkout-confirmed__inner">
            <div className="checkout-confirmed__badge">
              <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#34c759" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <span className="checkout-confirmed__eyebrow">ORDER CONFIRMED</span>
            <h1 className="checkout-confirmed__title">Thank you for your order.</h1>
            <p className="checkout-confirmed__subtitle">
              Order number <strong>{confirmedOrder.orderNumber}</strong>
            </p>
            <p className="checkout-confirmed__notice">
              We've sent a receipt and delivery confirmation to <strong>{confirmedOrder.customer.email}</strong>.
            </p>

            {/* Delivery Timeline Card */}
            <div className="checkout-confirmed__delivery-card">
              <div className="checkout-confirmed__delivery-header">
                <div>
                  <span className="checkout-confirmed__delivery-tag">Standard Delivery</span>
                  <p className="checkout-confirmed__delivery-date">Estimated: Within 2–3 Business Days</p>
                </div>
                <span className="checkout-confirmed__delivery-free">FREE</span>
              </div>
              <p className="checkout-confirmed__delivery-address">
                Delivering to: {confirmedOrder.customer.name}, {confirmedOrder.shippingAddress.street}, {confirmedOrder.shippingAddress.city}, {confirmedOrder.shippingAddress.state} {confirmedOrder.shippingAddress.postalCode}
              </p>
            </div>

            {/* Itemized Order List */}
            <div className="checkout-confirmed__items">
              <h2 className="checkout-confirmed__section-title">Items in this order</h2>
              {confirmedOrder.items.map((item, idx) => (
                <div key={idx} className="checkout-confirmed__item">
                  <img src={item.image} alt={item.name} className="checkout-confirmed__item-img" />
                  <div className="checkout-confirmed__item-info">
                    <h3 className="checkout-confirmed__item-name">{item.name}</h3>
                    {item.variant && <p className="checkout-confirmed__item-variant">{item.variant}</p>}
                    <p className="checkout-confirmed__item-qty">Quantity: {item.qty}</p>
                  </div>
                  <div className="checkout-confirmed__item-price">
                    {formatPrice(item.price * item.qty)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="checkout-confirmed__summary">
              <div className="checkout-summary__row">
                <span>Subtotal</span>
                <span>{formatPrice(confirmedOrder.subtotal)}</span>
              </div>
              <div className="checkout-summary__row">
                <span>Shipping</span>
                <span className="checkout-summary__free">Free</span>
              </div>
              <div className="checkout-summary__row">
                <span>Estimated Tax (18%)</span>
                <span>{formatPrice(confirmedOrder.tax)}</span>
              </div>
              <div className="checkout-summary__divider" />
              <div className="checkout-summary__row checkout-summary__row--total">
                <span>Total Paid</span>
                <span>{formatPrice(confirmedOrder.total)}</span>
              </div>
            </div>

            <div className="checkout-confirmed__actions">
              <Link to="/" className="checkout-btn checkout-btn--primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <Navbar />

      <main className="checkout-main" role="main" aria-label="Checkout">
        <div className="checkout-header">
          <h1 className="checkout-header__title">Checkout</h1>
          <p className="checkout-header__sub">Fast, secure checkout with free standard delivery.</p>
        </div>

        {apiError && (
          <div className="checkout-error-banner" role="alert">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            <span>{apiError}</span>
          </div>
        )}

        <div className="checkout-layout">
          {/* Left: Checkout Form */}
          <form className="checkout-form" onSubmit={handleSubmitOrder} noValidate>
            {/* 1. Contact & Shipping Information */}
            <section className="checkout-card" aria-label="Shipping Address">
              <div className="checkout-card__header">
                <span className="checkout-card__step">1</span>
                <h2 className="checkout-card__title">Shipping Address</h2>
              </div>

              <div className="checkout-form__grid">
                <div className={`checkout-group ${errors.name ? 'checkout-group--error' : ''}`}>
                  <label htmlFor="chk-name">Full Name</label>
                  <input
                    id="chk-name"
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    autoComplete="name"
                  />
                  {errors.name && <span className="checkout-err">{errors.name}</span>}
                </div>

                <div className={`checkout-group ${errors.email ? 'checkout-group--error' : ''}`}>
                  <label htmlFor="chk-email">Email Address</label>
                  <input
                    id="chk-email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="name@example.com"
                    autoComplete="email"
                  />
                  {errors.email && <span className="checkout-err">{errors.email}</span>}
                </div>

                <div className={`checkout-group checkout-group--full ${errors.phone ? 'checkout-group--error' : ''}`}>
                  <label htmlFor="chk-phone">Mobile Phone Number</label>
                  <input
                    id="chk-phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                  />
                  {errors.phone && <span className="checkout-err">{errors.phone}</span>}
                </div>

                <div className={`checkout-group checkout-group--full ${errors.street ? 'checkout-group--error' : ''}`}>
                  <label htmlFor="chk-street">Street Address</label>
                  <input
                    id="chk-street"
                    type="text"
                    name="street"
                    value={form.street}
                    onChange={handleChange}
                    placeholder="House / Flat No., Street, Area"
                    autoComplete="street-address"
                  />
                  {errors.street && <span className="checkout-err">{errors.street}</span>}
                </div>

                <div className={`checkout-group ${errors.city ? 'checkout-group--error' : ''}`}>
                  <label htmlFor="chk-city">City</label>
                  <input
                    id="chk-city"
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="e.g. Mumbai"
                    autoComplete="address-level2"
                  />
                  {errors.city && <span className="checkout-err">{errors.city}</span>}
                </div>

                <div className="checkout-group">
                  <label htmlFor="chk-state">State</label>
                  <select id="chk-state" name="state" value={form.state} onChange={handleChange}>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Telangana">Telangana</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="West Bengal">West Bengal</option>
                    <option value="Rajasthan">Rajasthan</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                  </select>
                </div>

                <div className={`checkout-group ${errors.postalCode ? 'checkout-group--error' : ''}`}>
                  <label htmlFor="chk-pin">PIN Code</label>
                  <input
                    id="chk-pin"
                    type="text"
                    name="postalCode"
                    maxLength={6}
                    value={form.postalCode}
                    onChange={handleChange}
                    placeholder="400001"
                    autoComplete="postal-code"
                  />
                  {errors.postalCode && <span className="checkout-err">{errors.postalCode}</span>}
                </div>
              </div>
            </section>

            {/* 2. Payment Method */}
            <section className="checkout-card" aria-label="Payment Method">
              <div className="checkout-card__header">
                <span className="checkout-card__step">2</span>
                <h2 className="checkout-card__title">Payment Method</h2>
              </div>

              <div className="checkout-payment-options" role="radiogroup" aria-label="Payment Options">
                <label className={`checkout-pay-opt ${paymentMethod === 'card' ? 'checkout-pay-opt--active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <div className="checkout-pay-opt__content">
                    <span className="checkout-pay-opt__title">Credit / Debit Card</span>
                    <span className="checkout-pay-opt__sub">Visa, Mastercard, American Express, RuPay</span>
                  </div>
                </label>

                <label className={`checkout-pay-opt ${paymentMethod === 'upi' ? 'checkout-pay-opt--active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === 'upi'}
                    onChange={() => setPaymentMethod('upi')}
                  />
                  <div className="checkout-pay-opt__content">
                    <span className="checkout-pay-opt__title">UPI Instant Transfer</span>
                    <span className="checkout-pay-opt__sub">Google Pay, PhonePe, Paytm, BHIM</span>
                  </div>
                </label>

                <label className={`checkout-pay-opt ${paymentMethod === 'apple_pay' ? 'checkout-pay-opt--active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="apple_pay"
                    checked={paymentMethod === 'apple_pay'}
                    onChange={() => setPaymentMethod('apple_pay')}
                  />
                  <div className="checkout-pay-opt__content">
                    <span className="checkout-pay-opt__title">Apple Pay / Apple Card</span>
                    <span className="checkout-pay-opt__sub">Touch ID or Face ID instant verification</span>
                  </div>
                </label>

                <label className={`checkout-pay-opt ${paymentMethod === 'emi' ? 'checkout-pay-opt--active' : ''}`}>
                  <input
                    type="radio"
                    name="payment"
                    value="emi"
                    checked={paymentMethod === 'emi'}
                    onChange={() => setPaymentMethod('emi')}
                  />
                  <div className="checkout-pay-opt__content">
                    <span className="checkout-pay-opt__title">No Cost EMI</span>
                    <span className="checkout-pay-opt__sub">6 Months No Cost EMI from {formatPrice(Math.ceil(orderTotal / 6))}/mo.</span>
                  </div>
                </label>
              </div>

              {paymentMethod === 'card' && (
                <div className="checkout-card-inputs">
                  <div className="checkout-group">
                    <label>Card Number</label>
                    <input type="text" readOnly value={DEFAULT_CARD.number} />
                  </div>
                  <div className="checkout-card-row">
                    <div className="checkout-group">
                      <label>Expiry</label>
                      <input type="text" readOnly value={DEFAULT_CARD.expiry} />
                    </div>
                    <div className="checkout-group">
                      <label>CVV</label>
                      <input type="text" readOnly value={DEFAULT_CARD.cvv} />
                    </div>
                  </div>
                  <p className="checkout-secure-note">
                    🔒 Demo test mode: Secure test card pre-selected.
                  </p>
                </div>
              )}

              {paymentMethod === 'upi' && (
                <div className="checkout-upi-input">
                  <div className={`checkout-group ${errors.upi ? 'checkout-group--error' : ''}`}>
                    <label htmlFor="chk-upi">Enter your VPA / UPI ID</label>
                    <input
                      id="chk-upi"
                      type="text"
                      placeholder="username@okhdfcbank"
                      value={upiId}
                      onChange={(e) => {
                        setUpiId(e.target.value);
                        if (errors.upi) setErrors(prev => ({ ...prev, upi: '' }));
                      }}
                    />
                    {errors.upi && <span className="checkout-err">{errors.upi}</span>}
                  </div>
                </div>
              )}
            </section>

            <button
              id="place-order-btn"
              type="submit"
              disabled={step === 'processing'}
              className="checkout-submit-btn"
            >
              {step === 'processing' ? 'Processing Order...' : `Place Your Order — ${formatPrice(orderTotal)}`}
            </button>
          </form>

          {/* Right: Order Summary */}
          <aside className="checkout-summary" aria-label="Order Summary">
            <div className="checkout-summary__card">
              <h2 className="checkout-summary__title">Summary</h2>

              <div className="checkout-summary__items">
                {items.map(item => (
                  <div key={item.key} className="checkout-summary__item">
                    <img src={item.image} alt={item.name} className="checkout-summary__item-img" />
                    <div className="checkout-summary__item-info">
                      <h3 className="checkout-summary__item-name">{item.name}</h3>
                      {item.variant && <p className="checkout-summary__item-variant">{item.variant}</p>}
                      <span className="checkout-summary__item-qty">Qty: {item.qty}</span>
                    </div>
                    <span className="checkout-summary__item-price">
                      {formatPrice(item.price * item.qty)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="checkout-summary__breakdown">
                <div className="checkout-summary__row">
                  <span>Items ({totalItems})</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>
                <div className="checkout-summary__row">
                  <span>Shipping</span>
                  <span className="checkout-summary__free">Free</span>
                </div>
                <div className="checkout-summary__row">
                  <span>Estimated Tax (18%)</span>
                  <span>{formatPrice(estimatedTax)}</span>
                </div>
                <div className="checkout-summary__divider" />
                <div className="checkout-summary__row checkout-summary__row--total">
                  <span>Total</span>
                  <span>{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <div className="checkout-security-badge">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                <span>End-to-end 256-bit encrypted transaction</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
