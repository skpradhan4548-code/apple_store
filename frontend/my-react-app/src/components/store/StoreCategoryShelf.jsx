import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './StoreCategoryShelf.css';

const SHELF_CATEGORIES = [
  {
    name: 'Mac',
    path: '/mac',
    image: '/store/mac-shelf.png',
  },
  {
    name: 'iPhone',
    path: '/iphone',
    image: '/store/iphone-shelf.png',
  },
  {
    name: 'iPad',
    path: '/ipad',
    image: '/store/ipad-shelf.png',
  },
  {
    name: 'Apple Watch',
    path: '/watch',
    image: '/store/watch-shelf.png',
  },
  {
    name: 'AirPods',
    path: '/airpods',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=200&hei=130&fmt=png-alpha&qlt=90',
  },
  {
    name: 'AirTag',
    path: '/store',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/airtag-single-select-202104?wid=200&hei=130&fmt=png-alpha&qlt=90',
  },
  {
    name: 'Apple TV 4K',
    path: '/tv-home',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/apple-tv-4k-hero-select-202210?wid=200&hei=130&fmt=png-alpha&qlt=90',
  },
  {
    name: 'HomePod',
    path: '/tv-home',
    image: 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/homepod-select-midnight-202210?wid=200&hei=130&fmt=png-alpha&qlt=90',
  },
];

const StoreCategoryShelf = () => {
  const scrollRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [canScrollLeft, setCanScrollLeft] = useState(false);

  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = direction === 'left' ? -320 : 320;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  return (
    <section className="store-shelf" aria-label="Apple Store Categories">
      {/* ── Top Header Block (Store + Subhead) ── */}
      <div className="store-shelf__header">
        <div className="store-shelf__header-left">
          <h1 className="store-shelf__title">Store</h1>
        </div>
        <div className="store-shelf__header-right">
          <h2 className="store-shelf__subhead">
            The best way to buy the products you love.
          </h2>
          <div className="store-shelf__links">
            <a href="#specialist" className="store-shelf__link">
              Connect with a Specialist &#8599;
            </a>
            <a href="#find-store" className="store-shelf__link">
              Find an Apple Store &#8599;
            </a>
          </div>
        </div>
      </div>

      {/* ── Category Shelf Carousel ── */}
      <div className="store-shelf__carousel-container">
        {canScrollLeft && (
          <button
            className="store-shelf__paddle store-shelf__paddle--left"
            onClick={() => handleScroll('left')}
            aria-label="Previous categories"
          >
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="11 4 6 9 11 14" />
            </svg>
          </button>
        )}

        <div
          className="store-shelf__carousel"
          ref={scrollRef}
          onScroll={checkScroll}
        >
          {SHELF_CATEGORIES.map((cat) => (
            <Link key={cat.name} to={cat.path} className="store-shelf__card">
              <div className="store-shelf__card-img-box">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="store-shelf__card-img"
                  loading="eager"
                  onError={(e) => {
                    e.target.style.opacity = '0.5';
                  }}
                />
              </div>
              <span className="store-shelf__card-name">{cat.name}</span>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button
            className="store-shelf__paddle store-shelf__paddle--right"
            onClick={() => handleScroll('right')}
            aria-label="Next categories"
          >
            <svg viewBox="0 0 18 18" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="7 4 12 9 7 14" />
            </svg>
          </button>
        )}
      </div>
    </section>
  );
};

export default StoreCategoryShelf;
