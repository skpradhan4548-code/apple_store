import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './BagDropdown.css';

/**
 * Apple-faithful Bag Dropdown Flyout
 */
const BagDropdown = ({ isOpen, onClose }) => {
  const { items, totalItems, totalPrice } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className="bag-dropdown"
      role="dialog"
      aria-label="Shopping Bag"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bag-dropdown__arrow" />
      <div className="bag-dropdown__inner">
        {items.length === 0 ? (
          /* Empty Bag State */
          <div className="bag-dropdown__empty">
            <h3 className="bag-dropdown__title">Your Bag is empty.</h3>
            <div className="bag-dropdown__links">
              <Link to="/cart" className="bag-dropdown__sublink" onClick={onClose}>
                <svg viewBox="0 0 18 18" width="16" height="16" fill="currentColor">
                  <path d="M15 1H3a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2V3a2 2 0 00-2-2zm-3 12H6v-1h6v1zm2-3H4V9h10v1zm0-3H4V6h10v1z"/>
                </svg>
                <span>Orders</span>
              </Link>
              {!user && (
                <Link to="/login" className="bag-dropdown__sublink" onClick={onClose}>
                  <svg viewBox="0 0 18 18" width="16" height="16" fill="currentColor">
                    <path d="M9 9a4 4 0 100-8 4 4 0 000 8zm0 2c-4 0-8 2-8 5v1h16v-1c0-3-4-5-8-5z"/>
                  </svg>
                  <span>Sign in</span>
                </Link>
              )}
            </div>
          </div>
        ) : (
          /* Populated Bag State */
          <div className="bag-dropdown__populated">
            <div className="bag-dropdown__header">
              <span className="bag-dropdown__count">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your Bag</span>
              <span className="bag-dropdown__total">₹{totalPrice.toLocaleString('en-IN')}</span>
            </div>

            <ul className="bag-dropdown__items">
              {items.slice(0, 3).map((item) => (
                <li key={item.key} className="bag-dropdown__item">
                  <img src={item.image} alt={item.name} className="bag-dropdown__thumb" />
                  <div className="bag-dropdown__details">
                    <Link
                      to={`/product/${item.id}`}
                      className="bag-dropdown__name"
                      onClick={onClose}
                    >
                      {item.name}
                    </Link>
                    {item.variant && <span className="bag-dropdown__variant">{item.variant}</span>}
                    <div className="bag-dropdown__price-row">
                      <span>Qty: {item.qty}</span>
                      <span className="bag-dropdown__price">₹{(item.price * item.qty).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {items.length > 3 && (
              <div className="bag-dropdown__more">
                +{items.length - 3} more items in bag
              </div>
            )}

            <div className="bag-dropdown__actions">
              <button
                className="bag-dropdown__btn bag-dropdown__btn--primary"
                onClick={() => {
                  onClose();
                  navigate('/cart');
                }}
              >
                Review Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default React.memo(BagDropdown);
