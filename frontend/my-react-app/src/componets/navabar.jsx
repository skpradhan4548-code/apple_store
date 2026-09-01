import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './navabar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchRef = useRef(null);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location]);

  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const navLinks = [
    { label: 'Store', path: '/' },
    { label: 'Mac', path: '/mac' },
    { label: 'iPad', path: '/ipad' },
    { label: 'iPhone', path: '/iphone' },
    { label: 'Watch', path: '/watch' },
    { label: 'AirPods', path: '/airpods' },
    { label: 'TV & Home', path: '/tv-home' },
    { label: 'Entertainment', path: '/entertainment' },
    { label: 'Accessories', path: '/' },
    { label: 'Support', path: '/' },
  ];

  return (
    <>
      {/* Promo Banner */}
      <div className="promo-banner">
        <span>
          Get up to 6 months of No Cost EMI* plus up to ₹15,000 instant cashback‡ on selected products with eligible cards.{' '}
          <a href="#">Shop &rsaquo;</a>
        </span>
      </div>

      <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
        <nav className="navbar__inner" role="navigation" aria-label="Global">

          {/* Apple Logo */}
          <Link to="/" className="navbar__logo" aria-label="Apple">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" width="18" height="22" fill="currentColor" aria-hidden="true">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 672.4 0 541.2 0 426.6c0-175.2 114.4-267.8 226.7-267.8 60 0 109.7 40.4 147.2 40.4 35.7 0 92-43 161.6-43 25.8 0 108.2 2.6 168.6 71.9zm-209.7-144.5c31.4-37 54.4-88.2 54.4-139.4 0-7.1-.6-14.3-1.9-20.1-51.5 2-112.5 34.5-149.5 76.7-28.5 32-56.4 83.1-56.4 135.1 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 46.4 0 102.5-31.1 138-71.7z"/>
            </svg>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="navbar__links" role="list">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link
                  to={link.path}
                  className={`navbar__link ${location.pathname === link.path && link.path !== '/' ? 'navbar__link--active' : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Actions */}
          <div className="navbar__actions">
            {/* Search */}
            <button
              id="nav-search-btn"
              className={`navbar__icon-btn ${searchOpen ? 'navbar__icon-btn--active' : ''}`}
              aria-label="Search apple.com"
              aria-expanded={searchOpen}
              onClick={() => setSearchOpen(!searchOpen)}
            >
              {searchOpen ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                  <path d="M17.273 16.22l-4.537-4.537A6.932 6.932 0 0014 7.5 7 7 0 107.5 14.5a6.933 6.933 0 004.183-1.264l4.537 4.537zM7.5 13A5.5 5.5 0 117.5 2a5.5 5.5 0 010 11z"/>
                </svg>
              )}
            </button>

            {/* Bag with live badge */}
            <Link to="/cart" id="nav-bag-btn" className="navbar__icon-btn navbar__bag-btn" aria-label={`Shopping Bag - ${totalItems} items`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M15.5 5h-2.757A3.751 3.751 0 009 1.5 3.751 3.751 0 005.257 5H2.5L1 17.5h16L15.5 5zM9 3a2.25 2.25 0 012.23 2H6.77A2.25 2.25 0 019 3zm0 9a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
              {totalItems > 0 && (
                <span className="navbar__badge" aria-hidden="true">{totalItems > 9 ? '9+' : totalItems}</span>
              )}
            </Link>

            {/* Auth */}
            {user ? (
              <button id="nav-user-btn" className="navbar__user-btn" onClick={() => { logout(); navigate('/'); }}>
                {user.name.split(' ')[0]} · Sign Out
              </button>
            ) : (
              <Link to="/login" id="nav-signin-btn" className="navbar__login-btn">Sign In</Link>
            )}

            {/* Hamburger (mobile) */}
            <button
              id="nav-menu-btn"
              className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Search Dropdown */}
        <div className={`navbar__search-bar ${searchOpen ? 'navbar__search-bar--open' : ''}`} role="search">
          <div className="navbar__search-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="#6e6e73" aria-hidden="true">
              <path d="M17.273 16.22l-4.537-4.537A6.932 6.932 0 0014 7.5 7 7 0 107.5 14.5a6.933 6.933 0 004.183-1.264l4.537 4.537zM7.5 13A5.5 5.5 0 117.5 2a5.5 5.5 0 010 11z"/>
            </svg>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search apple.com"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search apple.com"
            />
            <button className="navbar__search-cancel" onClick={() => { setSearchOpen(false); setSearchQuery(''); }}>
              Cancel
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="navbar__mobile-menu" role="menu">
            <ul>
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="navbar__mobile-link" role="menuitem">{link.label}</Link>
                </li>
              ))}
              <li className="navbar__mobile-divider" />
              <li><Link to="/login" className="navbar__mobile-link navbar__mobile-link--signin" role="menuitem">Sign In</Link></li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
