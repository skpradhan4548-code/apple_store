import { useState } from 'react';
import { Link } from 'react-router-dom';
import './LineupCard.css';

/**
 * LineupCard — Apple-style product tile for "Explore the line-up" section.
 *
 * Props:
 *   product {Object} — { id, name, tagline, tag, image, bg, basePrice, colors[] }
 *   colors  — [{ label, hex, image }]
 */
const LineupCard = ({ product }) => {
  const [colorIdx, setColorIdx] = useState(0);

  if (!product) return null;

  const { name, tagline, tag, basePrice, colors = [] } = product;
  const activeColor = colors[colorIdx];
  const displayImage = activeColor?.image || product.image;

  // EMI: 6-month no-cost EMI (industry-standard Apple India pattern)
  const emi = Math.round(basePrice / 6);

  return (
    <article className="lineup-card">
      {/* ── Image Area ── */}
      <div
        className="lineup-card__media"
        style={{ backgroundColor: product.bg || 'var(--color-fill-secondary)' }}
      >
        {tag && <span className="lineup-card__badge">{tag}</span>}

        <img
          src={displayImage}
          alt={name}
          className="lineup-card__img"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.style.opacity = '0.35';
          }}
        />
      </div>

      {/* ── Color Swatches ── */}
      <div className="lineup-card__swatches" role="radiogroup" aria-label="Colours">
        {colors.length > 0
          ? colors.map((c, i) => (
              <button
                key={c.label || i}
                type="button"
                role="radio"
                aria-checked={i === colorIdx}
                aria-label={c.label}
                title={c.label}
                className={`lineup-card__swatch${i === colorIdx ? ' lineup-card__swatch--active' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setColorIdx(i)}
              />
            ))
          : null}
      </div>

      {/* ── Product Name ── */}
      <h3 className="lineup-card__name">{name}</h3>

      {/* ── Tagline ── */}
      {tagline && <p className="lineup-card__tagline">{tagline}</p>}

      {/* ── Pricing ── */}
      <div className="lineup-card__pricing">
        <span className="lineup-card__price">
          From ₹{basePrice.toLocaleString('en-IN')}.00‡‡
        </span>
        <span className="lineup-card__emi">
          or ₹{emi.toLocaleString('en-IN')}.00/mo. for 6 mo.‡‡‡
        </span>
      </div>

      {/* ── CTAs ── */}
      <div className="lineup-card__ctas">
        <Link to={`/product/${product.id}`} className="lineup-card__cta-learn">
          Learn more
        </Link>
        <Link to={`/product/${product.id}`} className="lineup-card__cta-buy">
          Buy &gt;
        </Link>
      </div>
    </article>
  );
};

export default LineupCard;
