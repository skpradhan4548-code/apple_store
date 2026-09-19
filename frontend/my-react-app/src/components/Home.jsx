import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import HeroSection from './Herosection';
import Footer from './Footer';
import apiClient from '../services/apiClient';
import { formatPrice } from '../utils/formatters';
import { PRODUCTS as FALLBACK_PRODUCTS } from '../data/products';
import './Home.css';

/* ─── TV+ Shows ──────────────────────────────────────── */
const tvShows = [
  { title: 'Severance',          genre: 'Drama',   color: '#0a0a0a' },
  { title: 'The Morning Show',   genre: 'Drama',   color: '#1a0a0a' },
  { title: 'Ted Lasso',          genre: 'Comedy',  color: '#0a1a0a' },
  { title: 'Foundation',         genre: 'Sci-Fi',  color: '#0a0a1a' },
  { title: 'Slow Horses',        genre: 'Thriller',color: '#1a1500' },
];

/* ─── Why Apple items ─────────────────────────────────── */
const whyItems = [
  { icon: '🛡️', title: 'Privacy Built In',  desc: 'Apple products are designed from the ground up to protect your data and privacy.' },
  { icon: '♿', title: 'Accessibility',      desc: 'Powerful features built in that work for everyone, right out of the box.' },
  { icon: '🌱', title: 'Environment',        desc: 'Our goal: carbon neutrality across our entire footprint by 2030.' },
  { icon: '🛠️', title: 'Apple Support',      desc: 'Expert advice, the Apple way. In store, online, or over the phone.' },
];

/* ─── Home Page ──────────────────────────────────────── */
const Home = () => {
  const [products, setProducts] = useState(FALLBACK_PRODUCTS);

  useEffect(() => {
    let isMounted = true;
    apiClient.getProducts()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      })
      .catch((err) => {
        console.warn('API getProducts fallback engaged:', err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const large = products.filter(p => p.size === 'large');
  const grid  = products.filter(p => p.size !== 'large');

  // Ensure large section always displays featured items
  const featured = large.length > 0 ? large : products.slice(0, 3);
  const standard = large.length > 0 ? grid : products.slice(3);

  return (
    <div className="home">
      <Navbar />
      <main id="main-content">
        <HeroSection />

        {/* Large Feature Cards — iPhone 16 Pro, 16, MacBook Pro */}
        <section className="home__section" aria-label="Featured products">
          <div className="home__large-grid">
            {featured.map(p => <ProductCard key={p.id || p._id} product={p} />)}
          </div>
        </section>

        {/* Product Grid */}
        <section className="home__section" aria-label="All products">
          <div className="home__product-grid">
            {standard.map(p => <ProductCard key={p.id || p._id} product={p} />)}
          </div>
        </section>

        {/* Apple TV+ */}
        <section className="home__section home__tv-section" aria-label="Apple TV+">
          <div className="home__tv-banner">
            <div className="home__tv-header">
              <div className="home__tv-logo">tv<span>+</span></div>
              <div>
                <h2 className="home__tv-title">Stream award&#8209;winning Apple Originals.</h2>
                <p className="home__tv-sub">Try it free.* 3 months free with any Apple device.</p>
                <div className="home__tv-links">
                  <a href="#" className="home__tv-btn home__tv-btn--blue">Watch now</a>
                  <a href="#" className="home__tv-btn">Try it free</a>
                </div>
              </div>
            </div>
            <div className="home__tv-shows">
              {tvShows.map(show => (
                <div key={show.title} className="home__tv-card" style={{ background: show.color }}>
                  <span className="home__tv-card-genre">{show.genre}</span>
                  <p className="home__tv-card-title">{show.title}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Apple */}
        <section className="home__section home__why-section" aria-label="Why Apple">
          <h2 className="home__why-title">The Apple experience.<br/>Built for you.</h2>
          <div className="home__why-grid">
            {whyItems.map(item => (
              <div key={item.title} className="home__why-card">
                <span className="home__why-icon">{item.icon}</span>
                <h3 className="home__why-name">{item.title}</h3>
                <p className="home__why-desc">{item.desc}</p>
                <a href="#" className="home__why-link">Learn more &rsaquo;</a>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

/* ─── Product Card ──────────────────────────────────── */
export const ProductCard = ({ product }) => {
  const { id, tag, name, tagline, description, bg, textColor, accentColor, image, basePrice } = product;
  const isLight = textColor === '#ffffff' || textColor === 'rgb(255 255 255)';

  return (
    <article className="pcard" style={{ background: bg || 'var(--color-fill-secondary)', color: textColor || 'var(--color-text-primary)' }} aria-label={name}>
      {tag && <span className="pcard__tag" style={{ color: accentColor || 'var(--apple-tag)' }}>{tag}</span>}
      <div className="pcard__img-wrap">
        <img src={image} alt={name} className="pcard__img" loading="lazy" />
      </div>
      <h2 className="pcard__name">{name}</h2>
      {tagline && <p className="pcard__tagline">{tagline}</p>}
      {description && <p className="pcard__desc">{description}</p>}
      <p className="pcard__price" style={{ color: accentColor || 'var(--color-text-primary)' }}>
        From {formatPrice(basePrice)}
      </p>
      <div className="pcard__links">
        <Link to={`/product/${id}`} id={`learn-more-${id}`} className={`pcard__btn pcard__btn--${isLight ? 'light' : 'dark'}`}>
          Learn more &rsaquo;
        </Link>
        <Link to={`/product/${id}`} id={`shop-${id}`} className={`pcard__btn pcard__btn--${isLight ? 'light-outline' : 'dark-outline'}`}>
          Shop &rsaquo;
        </Link>
      </div>
    </article>
  );
};

export default Home;
