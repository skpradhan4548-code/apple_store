import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './ProductCarousel.css';

const ProductCarousel = ({ products = [], categorySlug = '' }) => {
  const trackRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  // ── Scroll state tracker ──
  const checkScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 20);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 20);

    // Calculate which card is "centered"
    const cardWidth = 300 + 20; // card + gap
    const idx = Math.round(scrollLeft / cardWidth);
    setActiveIdx(Math.min(idx, products.length - 1));
  }, [products.length]);

  useEffect(() => {
    checkScroll();
    const el = trackRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [checkScroll, products]);

  // Reset state when products or category changes
  useEffect(() => {
    setSelectedProduct(null);
    setSelectedColorIdx(0);
    setActiveIdx(0);
    if (trackRef.current) {
      trackRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  }, [categorySlug, products]);

  const scroll = (direction) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = 300 + 20;
    const amount = direction === 'left' ? -cardWidth : cardWidth;
    el.scrollBy({ left: amount, behavior: 'smooth' });
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setSelectedColorIdx(0);
  };

  const closeSpotlight = () => {
    setSelectedProduct(null);
    setSelectedColorIdx(0);
  };

  if (!products || products.length === 0) return null;

  const spotlightImage = selectedProduct
    ? (selectedProduct.colors?.[selectedColorIdx]?.image || selectedProduct.image)
    : null;

  return (
    <section className="prod-carousel" aria-label={`Featured ${categorySlug} products`}>
      {/* ── Section Header ── */}
      <div className="prod-carousel__header">
        <h2 className="prod-carousel__title">
          Shop {categorySlug.charAt(0).toUpperCase() + categorySlug.slice(1)}.
        </h2>
        <p className="prod-carousel__subtitle">
          All models. Take your pick.
        </p>
      </div>

      {/* ── Carousel Container ── */}
      <div className="prod-carousel__stage">
        {/* Left Paddle */}
        {canScrollLeft && (
          <button
            className="prod-carousel__paddle prod-carousel__paddle--left"
            onClick={() => scroll('left')}
            aria-label="Previous products"
          >
            <svg viewBox="0 0 36 36" width="36" height="36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <polyline points="21 12 15 18 21 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}

        {/* Scrollable Track */}
        <div className="prod-carousel__track" ref={trackRef}>
          {products.map((prod, idx) => {
            const displayImg = prod.colors?.[0]?.image || prod.image;
            const isActive = idx === activeIdx;

            return (
              <article
                key={prod.id || prod._id || idx}
                className={`prod-carousel__card ${isActive ? 'prod-carousel__card--active' : ''}`}
                onClick={() => handleCardClick(prod)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCardClick(prod)}
                aria-label={`View ${prod.name}`}
              >
                {/* Product Image */}
                <div
                  className="prod-carousel__card-media"
                  style={{ backgroundColor: prod.bg || '#fafafa' }}
                >
                  {prod.tag && (
                    <span className="prod-carousel__card-badge">{prod.tag}</span>
                  )}
                  <img
                    src={displayImg}
                    alt={prod.name}
                    className="prod-carousel__card-img"
                    loading="lazy"
                    draggable={false}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.opacity = '0.4';
                    }}
                  />
                </div>

                {/* Color Dots Preview */}
                {prod.colors && prod.colors.length > 1 && (
                  <div className="prod-carousel__card-dots">
                    {prod.colors.slice(0, 5).map((c, i) => (
                      <span
                        key={i}
                        className="prod-carousel__card-dot"
                        style={{ backgroundColor: c.hex }}
                        title={c.label}
                      />
                    ))}
                    {prod.colors.length > 5 && (
                      <span className="prod-carousel__card-dot-more">
                        +{prod.colors.length - 5}
                      </span>
                    )}
                  </div>
                )}

                {/* Product Info */}
                <div className="prod-carousel__card-info">
                  <h3 className="prod-carousel__card-name">{prod.name}</h3>
                  {prod.tagline && (
                    <p className="prod-carousel__card-tagline">{prod.tagline}</p>
                  )}
                  <p className="prod-carousel__card-price">
                    From ₹{prod.basePrice?.toLocaleString('en-IN')}.00
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Right Paddle */}
        {canScrollRight && (
          <button
            className="prod-carousel__paddle prod-carousel__paddle--right"
            onClick={() => scroll('right')}
            aria-label="Next products"
          >
            <svg viewBox="0 0 36 36" width="36" height="36" fill="none">
              <circle cx="18" cy="18" r="17" stroke="currentColor" strokeWidth="1" opacity="0.3" />
              <polyline points="15 12 21 18 15 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>

      {/* ── Pagination Dots ── */}
      {products.length > 1 && (
        <div className="prod-carousel__pagination" role="tablist">
          {products.map((_, idx) => (
            <button
              key={idx}
              className={`prod-carousel__dot ${idx === activeIdx ? 'prod-carousel__dot--active' : ''}`}
              onClick={() => {
                const cardWidth = 300 + 20;
                trackRef.current?.scrollTo({
                  left: idx * cardWidth,
                  behavior: 'smooth',
                });
              }}
              role="tab"
              aria-selected={idx === activeIdx}
              aria-label={`Go to product ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* ── Product Spotlight Modal (on image click) ── */}
      {selectedProduct && (
        <div className="prod-carousel__spotlight-overlay" onClick={closeSpotlight}>
          <div
            className="prod-carousel__spotlight"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="prod-carousel__spotlight-close"
              onClick={closeSpotlight}
              aria-label="Close spotlight"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Large product image */}
            <div
              className="prod-carousel__spotlight-media"
              style={{ backgroundColor: selectedProduct.bg || '#fafafa' }}
            >
              <img
                src={spotlightImage}
                alt={selectedProduct.name}
                className="prod-carousel__spotlight-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.opacity = '0.4';
                }}
              />
            </div>

            {/* Product details */}
            <div className="prod-carousel__spotlight-details">
              {selectedProduct.tag && (
                <span className="prod-carousel__spotlight-badge">{selectedProduct.tag}</span>
              )}
              <h3 className="prod-carousel__spotlight-name">{selectedProduct.name}</h3>
              {selectedProduct.tagline && (
                <p className="prod-carousel__spotlight-tagline">{selectedProduct.tagline}</p>
              )}
              <p className="prod-carousel__spotlight-price">
                From ₹{selectedProduct.basePrice?.toLocaleString('en-IN')}.00
              </p>

              {/* Color Swatches */}
              {selectedProduct.colors && selectedProduct.colors.length > 0 && (
                <div className="prod-carousel__spotlight-swatches" role="radiogroup" aria-label="Select color">
                  {selectedProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      className={`prod-carousel__spotlight-swatch ${i === selectedColorIdx ? 'prod-carousel__spotlight-swatch--active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setSelectedColorIdx(i)}
                      title={c.label}
                      aria-label={c.label}
                      role="radio"
                      aria-checked={i === selectedColorIdx}
                    />
                  ))}
                </div>
              )}

              {/* Specs */}
              {selectedProduct.specs && selectedProduct.specs.length > 0 && (
                <ul className="prod-carousel__spotlight-specs">
                  {selectedProduct.specs.slice(0, 4).map((spec, idx) => (
                    <li key={idx} className="prod-carousel__spotlight-spec">
                      <strong>{spec.value}</strong>
                      <span>{spec.label}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* CTAs */}
              <div className="prod-carousel__spotlight-ctas">
                <Link
                  to={`/product/${selectedProduct.id}`}
                  className="prod-carousel__spotlight-btn prod-carousel__spotlight-btn--buy"
                  onClick={closeSpotlight}
                >
                  Buy
                </Link>
                <Link
                  to={`/product/${selectedProduct.id}`}
                  className="prod-carousel__spotlight-btn prod-carousel__spotlight-btn--learn"
                  onClick={closeSpotlight}
                >
                  Learn more &gt;
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductCarousel;
