import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeviceIcon from './DeviceIcon';
import './ChapterNav.css';

const ChapterNav = ({ items = [] }) => {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [items]);

  const handleScroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -300 : 300;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  if (!items.length) return null;

  return (
    <nav className="chapternav" aria-label="Category Navigation">
      <div className="chapternav__wrapper">
        {canScrollLeft && (
          <button
            className="chapternav__paddle chapternav__paddle--left"
            onClick={() => handleScroll('left')}
            aria-label="Previous items"
          >
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="11 4 6 9 11 14" />
            </svg>
          </button>
        )}

        <ul
          className="chapternav__items"
          ref={scrollRef}
          onScroll={checkScroll}
        >
          {items.map((item, idx) => (
            <li key={item.label || idx} className="chapternav__item">
              <Link to={item.path} className="chapternav__link">
                <div className="chapternav__icon-wrapper">
                  {item.icon && item.icon.startsWith('http') ? (
                    <img src={item.icon} alt="" className="chapternav__icon chapternav__icon--img" />
                  ) : (
                    <DeviceIcon name={item.label} className="chapternav__icon" />
                  )}
                </div>
                <span className="chapternav__label">{item.label}</span>
                {item.badge && (
                  <span className="chapternav__badge">{item.badge}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>

        {canScrollRight && (
          <button
            className="chapternav__paddle chapternav__paddle--right"
            onClick={() => handleScroll('right')}
            aria-label="Next items"
          >
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="7 4 12 9 7 14" />
            </svg>
          </button>
        )}
      </div>
    </nav>
  );
};

export default ChapterNav;
