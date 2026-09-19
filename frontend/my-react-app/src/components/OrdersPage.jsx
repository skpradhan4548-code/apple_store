import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import apiClient from '../services/apiClient';
import { formatPrice } from '../utils/formatters';
import Navbar from './Navbar';
import Footer from './Footer';
import './OrdersPage.css';

const OrdersPage = () => {
  const { token } = useAuth();

  const [ordersData, setOrdersData] = useState({
    token,
    orders: [],
    loading: Boolean(token),
    error: null,
  });

  const loading = ordersData.token === token ? ordersData.loading : Boolean(token);
  const orders = ordersData.token === token ? ordersData.orders : [];
  const error = ordersData.token === token ? ordersData.error : null;

  // Guest order lookup state
  const [lookupQuery, setLookupQuery] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const [lookupError, setLookupError] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!token) return;

    let isMounted = true;
    apiClient.getMyOrders(token)
      .then((res) => {
        if (isMounted) {
          setOrdersData({
            token,
            orders: res.orders || [],
            loading: false,
            error: null,
          });
        }
      })
      .catch((err) => {
        if (isMounted) {
          console.error('Fetch orders error:', err);
          setOrdersData({
            token,
            orders: [],
            loading: false,
            error: err.message || 'Unable to load orders',
          });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    setIsLookingUp(true);
    setLookupError('');
    setSearchedOrder(null);

    try {
      const res = await apiClient.getOrderById(lookupQuery.trim(), token);
      if (res?.order) {
        setSearchedOrder(res.order);
      } else {
        setLookupError(`No order found matching "${lookupQuery.trim()}".`);
      }
    } catch (err) {
      setLookupError(err.message || 'Order not found. Please verify your order number.');
    } finally {
      setIsLookingUp(false);
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return '';
    const d = new Date(isoString);
    return d.toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="orders-page">
      <Navbar />

      <main className="orders-main" role="main" aria-label="Your Orders">
        <header className="orders-header">
          <h1 className="orders-title">Your Orders</h1>
          <p className="orders-subtitle">
            Track deliveries, view past receipts, and manage recent purchases.
          </p>
        </header>

        {/* ── Order Lookup Bar ── */}
        <section className="orders-lookup-card" aria-label="Track an Order">
          <form className="orders-lookup-form" onSubmit={handleLookup}>
            <div className="orders-lookup-input-wrap">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#86868b" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Enter Order Number (e.g. W396923893)"
                className="orders-lookup-input"
              />
            </div>
            <button
              type="submit"
              disabled={isLookingUp || !lookupQuery.trim()}
              className="orders-lookup-btn"
            >
              {isLookingUp ? 'Searching...' : 'Track Order'}
            </button>
          </form>

          {lookupError && (
            <p className="orders-lookup-err" role="alert">{lookupError}</p>
          )}

          {/* Looked up order modal/card */}
          {searchedOrder && (
            <div className="orders-lookup-result">
              <span className="orders-lookup-result-title">Search Result:</span>
              <OrderCard order={searchedOrder} formatDate={formatDate} />
            </div>
          )}
        </section>

        {/* ── Authenticated User Orders List ── */}
        {token ? (
          <section className="orders-list-section" aria-label="Order History">
            {loading ? (
              <div className="orders-loader">
                <div className="orders-spinner" />
                <p>Loading your orders...</p>
              </div>
            ) : error ? (
              <div className="orders-error">
                <p>{error}</p>
              </div>
            ) : orders.length > 0 ? (
              <div className="orders-list">
                {orders.map((order) => (
                  <OrderCard key={order._id || order.orderNumber} order={order} formatDate={formatDate} />
                ))}
              </div>
            ) : (
              <div className="orders-empty">
                <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#86868b" strokeWidth="1.5">
                  <path d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <h2>No orders placed yet</h2>
                <p>When you place an order, it will appear here.</p>
                <Link to="/" className="orders-cta-btn">Start Shopping</Link>
              </div>
            )}
          </section>
        ) : (
          !searchedOrder && (
            <div className="orders-guest-prompt">
              <p>
                Already have an Apple ID?{' '}
                <Link to="/login" className="orders-signin-link">Sign in</Link> to view your complete order history.
              </p>
            </div>
          )
        )}
      </main>

      <Footer />
    </div>
  );
};

/* ── Individual Order Card Component ── */
const OrderCard = ({ order, formatDate }) => {
  const isConfirmed = order.status === 'confirmed' || order.status === 'delivered';

  return (
    <article className="order-card" aria-label={`Order ${order.orderNumber}`}>
      <div className="order-card__header">
        <div className="order-card__meta">
          <span className="order-card__eyebrow">ORDER PLACED</span>
          <span className="order-card__date">{formatDate(order.createdAt)}</span>
        </div>

        <div className="order-card__meta">
          <span className="order-card__eyebrow">TOTAL</span>
          <span className="order-card__total">{formatPrice(order.total)}</span>
        </div>

        <div className="order-card__meta">
          <span className="order-card__eyebrow">SHIP TO</span>
          <span className="order-card__recipient" title={`${order.customer.name}, ${order.shippingAddress.city}`}>
            {order.customer.name}
          </span>
        </div>

        <div className="order-card__meta order-card__meta--end">
          <span className="order-card__eyebrow">ORDER # {order.orderNumber}</span>
          <span className={`order-card__status-pill ${isConfirmed ? 'order-card__status-pill--confirmed' : ''}`}>
            {order.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Item rows */}
      <div className="order-card__items">
        {order.items.map((item, idx) => (
          <div key={idx} className="order-item">
            <img src={item.image} alt={item.name} className="order-item__thumb" />
            <div className="order-item__info">
              <Link to={`/product/${item.productId}`} className="order-item__name">
                {item.name}
              </Link>
              {item.variant && <span className="order-item__variant">{item.variant}</span>}
              <span className="order-item__qty">Quantity: {item.qty}</span>
            </div>
            <div className="order-item__price">
              {formatPrice(item.price * item.qty)}
            </div>
          </div>
        ))}
      </div>

      <div className="order-card__footer">
        <span className="order-card__payment-info">
          Paid via {order.payment?.method?.toUpperCase() || 'CARD'} • Standard Delivery Included
        </span>
        <span className="order-card__delivery-est">
          Estimated: 2–3 Business Days
        </span>
      </div>
    </article>
  );
};

export default OrdersPage;
