import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './LineupCard.css';

const LineupCard = ({ product }) => {
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  if (!product) return null;

  const colors = product.colors || [];
  const activeColor = colors[selectedColorIdx];
  const displayImage = activeColor?.image || product.image;

  // EMI calculation (6 months approx)
  const monthlyEmi = Math.round(product.basePrice / 6);
  const formattedPrice = `₹${product.basePrice.toLocaleString('en-IN')}.00*`;
  const formattedEmi = `or ₹${monthlyEmi.toLocaleString('en-IN')}/mo. for 6 mo.‡`;

  return (
    <article className="lineup-card">
      {/* ── Product Media Container ── */}
      <div
        className="lineup-card__media-box"
        style={{ backgroundColor: product.bg || '#f5f5f7' }}
      >
        <img
          src={displayImage}
          alt={product.name}
          className="lineup-card__img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spaceblack-select-202310?wid=452&hei=420&fmt=jpeg&qlt=90';
          }}
        />
      </div>

      {/* ── Color Swatches ── */}
      <div className="lineup-card__swatches" role="radiogroup" aria-label="Available colors">
        {colors.length > 0 ? (
          colors.map((c, i) => (
            <button
              key={c.label || i}
              type="button"
              className={`lineup-card__swatch ${i === selectedColorIdx ? 'lineup-card__swatch--active' : ''}`}
              style={{ backgroundColor: c.hex }}
              onClick={() => setSelectedColorIdx(i)}
              title={c.label}
              aria-label={c.label}
              aria-checked={i === selectedColorIdx}
              role="radio"
            />
          ))
        ) : (
          <div className="lineup-card__swatch-placeholder" />
        )}
      </div>

      {/* ── Header Info ── */}
      <div className="lineup-card__info">
        {product.tag && (
          <span className="lineup-card__tag">{product.tag}</span>
        )}
        <h3 className="lineup-card__name">{product.name}</h3>
        {product.tagline && (
          <p className="lineup-card__tagline">{product.tagline}</p>
        )}

        {/* ── Pricing ── */}
        <div className="lineup-card__pricing">
          <span className="lineup-card__price">From {formattedPrice}</span>
          <span className="lineup-card__emi">{formattedEmi}</span>
        </div>

        {/* ── Action CTAs ── */}
        <div className="lineup-card__ctas">
          <Link
            to={`/product/${product.id}`}
            className="lineup-card__btn lineup-card__btn--buy"
          >
            Buy
          </Link>
          <Link
            to={`/product/${product.id}`}
            className="lineup-card__link"
          >
            Learn more &gt;
          </Link>
        </div>
      </div>

      {/* ── Specs Comparison Section ── */}
      {product.specs && product.specs.length > 0 && (
        <div className="lineup-card__specs">
          <hr className="lineup-card__divider" />
          <ul className="lineup-card__specs-list">
            {product.specs.slice(0, 3).map((spec, idx) => (
              <li key={idx} className="lineup-card__spec-item">
                <span className="lineup-card__spec-value">{spec.value}</span>
                <span className="lineup-card__spec-label">{spec.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
};

export default LineupCard;
