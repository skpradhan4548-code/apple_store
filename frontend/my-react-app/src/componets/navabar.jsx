import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useMegaMenu } from '../hooks/useMegaMenu';
import MegaMenu from './MegaMenu';
import BagDropdown from './BagDropdown';
import './navabar.css';

const NAV_LINKS = [
  { id: 'store', label: 'Store', path: '/' },
  { id: 'mac', label: 'Mac', path: '/mac' },
  { id: 'ipad', label: 'iPad', path: '/ipad' },
  { id: 'iphone', label: 'iPhone', path: '/iphone' },
  { id: 'watch', label: 'Watch', path: '/watch' },
  { id: 'airpods', label: 'AirPods', path: '/airpods' },
  { id: 'tv-home', label: 'TV & Home', path: '/tv-home' },
  { id: 'entertainment', label: 'Entertainment', path: '/entertainment' },
  { id: 'accessories', label: 'Accessories', path: '/' },
  { id: 'support', label: 'Support', path: '/' },
];

const SEARCH_QUICK_LINKS = [
  { label: 'Find a Store', path: '/' },
  { label: 'MacBook Pro', path: '/product/macbook-pro' },
  { label: 'iPhone 16 Pro', path: '/product/iphone-16-pro' },
  { label: 'Apple Watch Series 10', path: '/product/apple-watch-series-10' },
  { label: 'AirPods Pro 2', path: '/product/airpods-pro' },
  { label: 'Apple Trade In', path: '/' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [bagOpen, setBagOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedMobileCategory, setExpandedMobileCategory] = useState(null);

  const searchRef = useRef(null);
  const location  = useLocation();
  const navigate  = useNavigate();
  const { totalItems } = useCart();
  const { user, logout } = useAuth();

  // Dynamic Mega Menu hook connected to Backend
  const {
    menuData,
    loading: loadingMenu,
    activeMenu,
    openMenu,
    closeMenuWithDelay,
    cancelClose,
    closeImmediately,
  } = useMegaMenu();

  // 1. Sticky scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Body Scroll Lock when any overlay is active
  useEffect(() => {
    const isAnyOverlayOpen = Boolean(activeMenu || searchOpen || bagOpen || mobileOpen);
    if (isAnyOverlayOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeMenu, searchOpen, bagOpen, mobileOpen]);

  // 3. Escape key closes all overlays
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // 4. Focus search input when search opens
  useEffect(() => {
    if (searchOpen && searchRef.current) searchRef.current.focus();
  }, [searchOpen]);

  const closeAll = () => {
    closeImmediately();
    setMobileOpen(false);
    setSearchOpen(false);
    setBagOpen(false);
    setExpandedMobileCategory(null);
  };

  const handleLinkHover = (id) => {
    if (searchOpen) setSearchOpen(false);
    if (bagOpen) setBagOpen(false);
    openMenu(id);
  };

  const toggleSearch = () => {
    closeImmediately();
    setBagOpen(false);
    setSearchOpen((prev) => !prev);
  };

  const toggleBag = () => {
    closeImmediately();
    setSearchOpen(false);
    setBagOpen((prev) => !prev);
  };

  // Filtered search links
  const filteredQuickLinks = SEARCH_QUICK_LINKS.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <>
      {/* Top Announcement Promo */}
      <div className="promo-banner">
        <span>
          Get up to 6 months of No Cost EMI* plus up to ₹15,000 instant cashback‡ on selected products with eligible cards.{' '}
          <a href="#">Shop &rsaquo;</a>
        </span>
      </div>

      {/* Dimmer Backdrop Overlay */}
      <div
        className={`navbar__backdrop ${activeMenu || searchOpen || bagOpen ? 'navbar__backdrop--visible' : ''}`}
        onClick={closeAll}
        aria-hidden="true"
      />

      <header
        className={`navbar ${scrolled ? 'navbar--scrolled' : ''} ${activeMenu || bagOpen ? 'navbar--menu-open' : ''}`}
        onMouseLeave={() => closeMenuWithDelay(220)}
      >
        <nav className="navbar__inner" role="navigation" aria-label="Global">
          {/* Apple Logo */}
          <Link
            to="/"
            className="navbar__logo"
            aria-label="Apple"
            onClick={closeAll}
            onMouseEnter={closeImmediately}
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 814 1000" width="18" height="22" fill="currentColor">
              <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 672.4 0 541.2 0 426.6c0-175.2 114.4-267.8 226.7-267.8 60 0 109.7 40.4 147.2 40.4 35.7 0 92-43 161.6-43 25.8 0 108.2 2.6 168.6 71.9zm-209.7-144.5c31.4-37 54.4-88.2 54.4-139.4 0-7.1-.6-14.3-1.9-20.1-51.5 2-112.5 34.5-149.5 76.7-28.5 32-56.4 83.1-56.4 135.1 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 46.4 0 102.5-31.1 138-71.7z"/>
            </svg>
          </Link>

          {/* Desktop Nav Links (with Spotlight Dimming) */}
          <ul className="navbar__links" role="list">
            {NAV_LINKS.map((link) => (
              <li
                key={link.id}
                onMouseEnter={() => handleLinkHover(link.id)}
              >
                <Link
                  to={link.path}
                  className={`navbar__link ${location.pathname === link.path && link.path !== '/' ? 'navbar__link--active' : ''} ${activeMenu === link.id ? 'navbar__link--hovered' : ''}`}
                  onClick={closeAll}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions (Search, Bag, User, Mobile Hamburger) */}
          <div className="navbar__actions" onMouseEnter={closeImmediately}>
            {/* Search Button */}
            <button
              id="nav-search-btn"
              className={`navbar__icon-btn ${searchOpen ? 'navbar__icon-btn--active' : ''}`}
              aria-label="Search"
              onClick={toggleSearch}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                {searchOpen ? (
                  <path d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"/>
                ) : (
                  <path d="M17.273 16.22l-4.537-4.537A6.932 6.932 0 0014 7.5 7 7 0 107.5 14.5a6.933 6.933 0 004.183-1.264l4.537 4.537zM7.5 13A5.5 5.5 0 117.5 2a5.5 5.5 0 010 11z"/>
                )}
              </svg>
            </button>

            {/* Bag Button with Dropdown Trigger */}
            <button
              id="nav-bag-btn"
              className={`navbar__icon-btn navbar__bag-btn ${bagOpen ? 'navbar__icon-btn--active' : ''}`}
              aria-label={`Bag (${totalItems})`}
              onClick={toggleBag}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="currentColor">
                <path d="M15.5 5h-2.757A3.751 3.751 0 009 1.5 3.751 3.751 0 005.257 5H2.5L1 17.5h16L15.5 5zM9 3a2.25 2.25 0 012.23 2H6.77A2.25 2.25 0 019 3zm0 9a2 2 0 110-4 2 2 0 010 4z"/>
              </svg>
              {totalItems > 0 && <span className="navbar__badge">{totalItems > 9 ? '9+' : totalItems}</span>}
            </button>

            {/* Auth Button */}
            {user ? (
              <button className="navbar__user-btn" onClick={() => { closeAll(); logout(); navigate('/'); }}>
                {user.name.split(' ')[0]} · Sign Out
              </button>
            ) : (
              <Link to="/login" className="navbar__login-btn" onClick={closeAll}>Sign In</Link>
            )}

            {/* Mobile Hamburger Button */}
            <button
              className={`navbar__hamburger ${mobileOpen ? 'navbar__hamburger--open' : ''}`}
              aria-label="Menu"
              onClick={() => {
                closeImmediately();
                setMobileOpen(!mobileOpen);
              }}
            >
              <span /><span /><span />
            </button>
          </div>
        </nav>

        {/* Dynamic Reusable Mega Menu Component */}
        <MegaMenu
          activeMenu={activeMenu}
          isOpen={Boolean(activeMenu)}
          data={menuData}
          isLoading={loadingMenu}
          onClose={closeAll}
          onMouseEnter={cancelClose}
          onMouseLeave={() => closeMenuWithDelay(220)}
        />

        {/* Mini Bag Dropdown Flyout */}
        <BagDropdown isOpen={bagOpen} onClose={closeAll} />

        {/* Search Bar Dropdown with Quick Links */}
        <div className={`navbar__search-bar ${searchOpen ? 'navbar__search-bar--open' : ''}`}>
          <div className="navbar__search-inner">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 18 18" fill="#86868b">
              <path d="M17.273 16.22l-4.537-4.537A6.932 6.932 0 0014 7.5 7 7 0 107.5 14.5a6.933 6.933 0 004.183-1.264l4.537 4.537zM7.5 13A5.5 5.5 0 117.5 2a5.5 5.5 0 010 11z"/>
            </svg>
            <input
              ref={searchRef}
              type="search"
              placeholder="Search apple.com"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="navbar__search-cancel" onClick={closeAll}>
              Cancel
            </button>
          </div>

          {searchOpen && (
            <div className="navbar__search-quicklinks">
              <span className="navbar__search-quicklinks-title">
                {searchQuery ? 'Suggestions' : 'Quick Links'}
              </span>
              <ul className="navbar__search-quicklinks-list">
                {filteredQuickLinks.length > 0 ? (
                  filteredQuickLinks.map((item) => (
                    <li key={item.label} className="navbar__search-quicklink-item">
                      <Link to={item.path} onClick={closeAll}>
                        <svg viewBox="0 0 16 16" width="12" height="12" fill="#86868b">
                          <path d="M6 3l5 5-5 5" stroke="#86868b" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{item.label}</span>
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="navbar__search-quicklink-item">
                    <span style={{ color: '#86868b', fontSize: '13px' }}>No matching results</span>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>

        {/* Mobile Accordion Drawer */}
        {mobileOpen && (
          <div className="navbar__mobile-menu">
            <ul>
              {NAV_LINKS.map((link) => {
                const category = menuData?.[link.id];
                const isExpanded = expandedMobileCategory === link.id;

                return (
                  <li key={link.id} className="navbar__mobile-item">
                    <div className="navbar__mobile-row">
                      <Link to={link.path} className="navbar__mobile-link" onClick={closeAll}>
                        {link.label}
                      </Link>
                      {category && (
                        <button
                          className={`navbar__mobile-chevron ${isExpanded ? 'navbar__mobile-chevron--open' : ''}`}
                          onClick={() => setExpandedMobileCategory(isExpanded ? null : link.id)}
                        >
                          <svg viewBox="0 0 10 6" width="10" height="6">
                            <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                          </svg>
                        </button>
                      )}
                    </div>

                    {category && isExpanded && (
                      <div className="navbar__mobile-sublist">
                        {category.columns.map((col) => (
                          <div key={col.title} className="navbar__mobile-subgroup">
                            <span className="navbar__mobile-subtitle">{col.title}</span>
                            {col.items.map((sub) => (
                              <Link key={sub.label} to={sub.path} className="navbar__mobile-sublink" onClick={closeAll}>
                                {sub.label}
                                {sub.badge && <span className="megamenu__badge">{sub.badge}</span>}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
              <li className="navbar__mobile-divider" />
              <li><Link to="/login" className="navbar__mobile-link navbar__mobile-link--signin" onClick={closeAll}>Sign In</Link></li>
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Navbar;
