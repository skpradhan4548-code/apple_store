import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { formatPrice } from '../data/products';
import { useCart } from '../context/CartContext';
import Navbar from './navabar';
import Footer from './footer';
import './ProductPage.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const ProductPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product,         setProduct]         = useState(null);
  const [related,         setRelated]         = useState([]);
  const [loading,         setLoading]         = useState(true);
  const [error,           setError]           = useState(null);
  const [selectedColor,   setSelectedColor]   = useState(0);
  const [selectedStorage, setSelectedStorage] = useState(0);
  const [added,           setAdded]           = useState(false);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);
    setSelectedColor(0);
    setSelectedStorage(0);

    const loadProduct = async () => {
      try {
        const res = await fetch(`${API_BASE}/products/${id}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error('Product not found');
          }
          throw new Error('Failed to load product');
        }
        const data = await res.json();
        if (!data.product) {
          throw new Error('Product not found');
        }

        if (isMounted) {
          setProduct(data.product);

          // Fetch related category products from backend
          if (data.product.category) {
            try {
              const relRes = await fetch(`${API_BASE}/products/category/${data.product.category}`);
              if (relRes.ok) {
                const relData = await relRes.json();
                if (isMounted && relData.products) {
                  setRelated(relData.products.filter(p => p.id !== id).slice(0, 4));
                }
              }
            } catch {
              // Related failure is non-blocking
            }
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [id]);

  /* Show Loading state */
  if (loading) {
    return (
      <div className="pp-page">
        <Navbar />
        <div className="pp-404__inner" style={{ minHeight: '60vh' }}>
          <div className="pp-loading-spinner" />
          <p style={{ color: '#86868b', fontSize: '17px', marginTop: '16px' }}>Loading product details...</p>
        </div>
        <Footer />
      </div>
    );
  }

  /* Show 404 if product not found or server error */
  if (error || !product) {
    return (
      <div className="pp-404">
        <Navbar />
        <div className="pp-404__inner">
          <h1>Product not found</h1>
          <p style={{ color: '#86868b', fontSize: '15px' }}>
            {error || 'The requested product is not currently available.'}
          </p>
          <Link to="/" className="pp-404__back">← Back to Store</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const {
    name,
    tagline,
    longDesc,
    image,
    bg,
    textColor,
    accentColor,
    colors = [],
    storage = [],
    specs = [],
  } = product;

  const activeVariant = storage.length > 0 ? storage[selectedStorage] : null;
  const activeColor   = colors.length > 0 ? colors[selectedColor] : null;
  const currentPrice  = activeVariant?.price ?? activeColor?.price ?? product.basePrice;

  const handleAddToCart = () => {
    addToCart(product, activeVariant || activeColor, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="pp-page">
      <Navbar />

      {/* ── Hero ── */}
      <section className="pp-hero" style={{ background: bg, color: textColor }} aria-label={`${name} hero`}>
        <div className="pp-hero__inner">
          <div className="pp-hero__text">
            <p className="pp-hero__tag" style={{ color: accentColor }}>{product.tag}</p>
            <h1 className="pp-hero__name">{name}</h1>
            <p className="pp-hero__tagline">{tagline}</p>
            <p className="pp-hero__longdesc">{longDesc}</p>
          </div>
          <div className="pp-hero__img-wrap">
            <img src={image} alt={name} className="pp-hero__img" />
          </div>
        </div>
      </section>

      {/* ── Buy Box ── */}
      <section className="pp-buy" aria-label="Purchase options">
        <div className="pp-buy__inner">
          <h2 className="pp-buy__title">Configure your {name}</h2>

          {/* Color Picker */}
          {colors.length > 0 && (
            <div className="pp-buy__section">
              <p className="pp-buy__label">
                Color — <strong>{colors[selectedColor].label}</strong>
              </p>
              <div className="pp-buy__colors" role="radiogroup" aria-label="Color">
                {colors.map((c, i) => (
                  <button
                    key={c.label}
                    id={`color-${id}-${i}`}
                    className={`pp-color-swatch ${selectedColor === i ? 'pp-color-swatch--active' : ''}`}
                    style={{ background: c.hex }}
                    title={c.label}
                    aria-label={c.label}
                    aria-checked={selectedColor === i}
                    role="radio"
                    onClick={() => setSelectedColor(i)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Storage / Size Picker */}
          {storage.length > 0 && (
            <div className="pp-buy__section">
              <p className="pp-buy__label">Storage / Size</p>
              <div className="pp-buy__storage" role="radiogroup" aria-label="Storage">
                {storage.map((s, i) => (
                  <button
                    key={s.label}
                    id={`storage-${id}-${i}`}
                    className={`pp-storage-btn ${selectedStorage === i ? 'pp-storage-btn--active' : ''}`}
                    aria-checked={selectedStorage === i}
                    role="radio"
                    onClick={() => setSelectedStorage(i)}
                  >
                    <span className="pp-storage-label">{s.label}</span>
                    <span className="pp-storage-price">{formatPrice(s.price)}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price + CTA */}
          <div className="pp-buy__cta">
            <div className="pp-buy__price-wrap">
              <span className="pp-buy__from">From</span>
              <span className="pp-buy__price">{formatPrice(currentPrice)}</span>
            </div>
            <div className="pp-buy__btns">
              <button
                id={`add-to-cart-${id}`}
                className={`pp-btn pp-btn--primary ${added ? 'pp-btn--added' : ''}`}
                onClick={handleAddToCart}
                aria-live="polite"
              >
                {added ? '✓ Added to Bag' : 'Add to Bag'}
              </button>
              <Link to="/cart" id={`view-bag-${id}`} className="pp-btn pp-btn--secondary">
                View Bag &rsaquo;
              </Link>
            </div>
          </div>

          {/* Financing Nudge */}
          <p className="pp-buy__emi">
            Or pay just <strong>{formatPrice(Math.ceil(currentPrice / 6))}/mo.</strong>{' '}
            for 6 months with No Cost EMI.*{' '}
            <a href="#">More financing options &rsaquo;</a>
          </p>
        </div>
      </section>

      {/* ── Specs ── */}
      <section className="pp-specs" aria-label="Specifications">
        <div className="pp-specs__inner">
          <h2 className="pp-specs__title">Key specs</h2>
          <dl className="pp-specs__grid">
            {specs.map(s => (
              <div key={s.label} className="pp-specs__item">
                <dt className="pp-specs__dt">{s.label}</dt>
                <dd className="pp-specs__dd">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Related ── */}
      {related.length > 0 && (
        <section className="pp-related" aria-label="You may also like">
          <div className="pp-related__inner">
            <h2 className="pp-related__title">You may also like</h2>
            <div className="pp-related__grid">
              {related.map(p => (
                <Link key={p.id} to={`/product/${p.id}`} className="pp-related-card" style={{ background: p.bg, color: p.textColor }}>
                  <img src={p.image} alt={p.name} className="pp-related-card__img" loading="lazy" />
                  <p className="pp-related-card__name">{p.name}</p>
                  <p className="pp-related-card__price" style={{ color: p.accentColor }}>{formatPrice(p.basePrice)}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductPage;
