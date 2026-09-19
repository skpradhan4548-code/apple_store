import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Navbar from './Navbar';
import Footer from './Footer';
import { formatPrice } from '../utils/formatters';
import './CartPage.css';

const CartPage = () => {
  const { items, totalItems, totalPrice, removeFromCart, updateQty, clearCart } = useCart();
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <Navbar />

      <main className="cart-main" aria-label="Shopping Bag">
        <div className="cart-inner">

          {/* Header */}
          <div className="cart-header">
            <h1 className="cart-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 18 18" fill="currentColor" aria-hidden="true">
                <path d="M15.5 5h-2.757A3.751 3.751 0 009 1.5 3.751 3.751 0 005.257 5H2.5L1 17.5h16L15.5 5zM9 3a2.25 2.25 0 012.23 2H6.77A2.25 2.25 0 019 3zm0 9a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
              Your Bag
            </h1>
            {items.length > 0 && (
              <button id="clear-bag-btn" className="cart-clear-btn" onClick={clearCart} aria-label="Clear all items">
                Remove all
              </button>
            )}
          </div>

          {items.length === 0 ? (
            /* ── Empty State ── */
            <div className="cart-empty">
              <div className="cart-empty__icon" aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 18 18" fill="#d2d2d7">
                  <path d="M15.5 5h-2.757A3.751 3.751 0 009 1.5 3.751 3.751 0 005.257 5H2.5L1 17.5h16L15.5 5zM9 3a2.25 2.25 0 012.23 2H6.77A2.25 2.25 0 019 3zm0 9a2 2 0 110-4 2 2 0 010 4z"/>
                </svg>
              </div>
              <h2 className="cart-empty__title">Your bag is empty.</h2>
              <p className="cart-empty__sub">Add products to your bag to get started.</p>
              <Link to="/" id="continue-shopping-btn" className="cart-empty__cta">Continue Shopping &rsaquo;</Link>
            </div>
          ) : (
            <div className="cart-body">
              {/* ── Items ── */}
              <div className="cart-items" role="list">
                {items.map(item => (
                  <div key={item.key} className="cart-item" role="listitem">
                    <div className="cart-item__img-wrap">
                      <img src={item.image} alt={item.name} className="cart-item__img" />
                    </div>
                    <div className="cart-item__info">
                      <p className="cart-item__name">{item.name}</p>
                      {item.variant && (
                        <p className="cart-item__variant">{item.variant}</p>
                      )}
                      <p className="cart-item__price">{formatPrice(item.price)}</p>
                    </div>
                    <div className="cart-item__controls">
                      {/* Qty stepper */}
                      <div className="cart-qty" role="group" aria-label="Quantity">
                        <button
                          id={`qty-minus-${item.key}`}
                          className="cart-qty__btn"
                          onClick={() => updateQty(item.key, item.qty - 1)}
                          disabled={item.qty <= 1}
                          aria-label="Decrease quantity"
                        >−</button>
                        <span className="cart-qty__val" aria-live="polite">{item.qty}</span>
                        <button
                          id={`qty-plus-${item.key}`}
                          className="cart-qty__btn"
                          onClick={() => updateQty(item.key, item.qty + 1)}
                          aria-label="Increase quantity"
                        >+</button>
                      </div>
                      {/* Line total */}
                      <p className="cart-item__total">{formatPrice(item.price * item.qty)}</p>
                      {/* Remove */}
                      <button
                        id={`remove-${item.key}`}
                        className="cart-item__remove"
                        onClick={() => removeFromCart(item.key)}
                        aria-label={`Remove ${item.name}`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 18 18" fill="currentColor">
                          <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* ── Summary ── */}
              <aside className="cart-summary" aria-label="Order summary">
                <div className="cart-summary__card">
                  <h2 className="cart-summary__title">Summary</h2>

                  <div className="cart-summary__row">
                    <span>Items ({totalItems})</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Shipping</span>
                    <span className="cart-summary__free">Free</span>
                  </div>
                  <div className="cart-summary__row">
                    <span>Estimated Tax</span>
                    <span>{formatPrice(Math.round(totalPrice * 0.18))}</span>
                  </div>

                  <div className="cart-summary__divider" />

                  <div className="cart-summary__row cart-summary__row--total">
                    <span>Total</span>
                    <span>{formatPrice(totalPrice + Math.round(totalPrice * 0.18))}</span>
                  </div>

                  <button
                    id="checkout-btn"
                    className="cart-summary__checkout"
                    onClick={() => navigate('/checkout')}
                  >
                    Check Out
                  </button>

                  <p className="cart-summary__emi">
                    Or pay as low as {formatPrice(Math.ceil((totalPrice + Math.round(totalPrice * 0.18)) / 6))}/mo.
                    with No Cost EMI.*
                  </p>

                  <div className="cart-summary__methods">
                    <span title="Visa">VISA</span>
                    <span title="Mastercard">MC</span>
                    <span title="UPI">UPI</span>
                    <span title="Apple Pay">⊕</span>
                  </div>
                </div>

                {/* Continue Shopping */}
                <Link to="/" id="continue-shopping-link" className="cart-continue">
                  ← Continue Shopping
                </Link>
              </aside>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
