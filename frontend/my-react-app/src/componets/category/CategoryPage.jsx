import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../navabar';
import Footer from '../footer';
import ChapterNav from './ChapterNav';
import CategoryHero from './CategoryHero';
import LineupCard from './LineupCard';
import ProductCarousel from './ProductCarousel';
import './CategoryPage.css';

const CategoryPage = ({ categorySlug = 'mac' }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const [activeTabIdx, setActiveTabIdx] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll to top on category change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`http://localhost:5000/api/categories/${categorySlug}`).then((r) => {
        if (!r.ok) throw new Error('Category not found');
        return r.json();
      }),
      fetch(`http://localhost:5000/api/products/category/${categorySlug}`).then((r) => {
        if (!r.ok) throw new Error('Products could not be loaded');
        return r.json();
      }),
    ])
      .then(([catRes, prodRes]) => {
        if (isMounted) {
          setCategoryData(catRes.category);
          setProducts(prodRes.products || []);
          setActiveTabIdx(0);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [categorySlug]);

  // Client-side instant filter by selected tab (using useMemo for performance)
  const filteredProducts = useMemo(() => {
    if (!categoryData?.filterTabs || activeTabIdx === 0) {
      return products;
    }
    const currentTab = categoryData.filterTabs[activeTabIdx].toLowerCase();

    return products.filter((p) => {
      const text = `${p.name} ${p.tagline || ''} ${p.description || ''} ${p.category || ''} ${p.specs?.map(s => `${s.label} ${s.value}`).join(' ') || ''}`.toLowerCase();
      
      if (currentTab === 'laptops') {
        return text.includes('macbook') || text.includes('laptop');
      }
      if (currentTab === 'desktops') {
        return text.includes('imac') || text.includes('mini') || text.includes('studio') || text.includes('desktop');
      }
      
      const cleanTab = currentTab.replace(/s$/, '');
      return text.includes(currentTab) || text.includes(cleanTab);
    });
  }, [products, activeTabIdx, categoryData]);

  if (loading) {
    return (
      <div className="category-page">
        <Navbar />
        <div className="category-page__loader">
          <div className="category-page__spinner" />
          <p>Loading {categorySlug.toUpperCase()}...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !categoryData) {
    return (
      <div className="category-page">
        <Navbar />
        <div className="category-page__error">
          <h2>We couldn't find the {categorySlug} page.</h2>
          <p>Please check the link or browse our other categories.</p>
          <Link to="/" className="category-page__back-btn">Return to Store</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="category-page">
      <Navbar />

      {/* ── 1. Top Promotion Ribbon ── */}
      {categoryData.promo && (
        <aside className="category-page__promo" aria-label="Special Offers">
          <div className="category-page__promo-content">
            <span>{categoryData.promo.text}</span>{' '}
            <Link to={categoryData.promo.linkUrl || '#'} className="category-page__promo-link">
              {categoryData.promo.linkText} &gt;
            </Link>
          </div>
        </aside>
      )}

      {/* ── 2. ChapterNav Ribbon ── */}
      <ChapterNav items={categoryData.chapterNav} />

      {/* ── 3. Giant Category Header ── */}
      <header className="category-page__header">
        <h1 className="category-page__title">{categoryData.title}</h1>
      </header>

      {/* ── 4. Cinematic Hero Showcase ── */}
      {categoryData.hero && <CategoryHero hero={categoryData.hero} />}

      {/* ── 4½. Dynamic Product Carousel ── */}
      <ProductCarousel products={products} categorySlug={categorySlug} />

      {/* ── 5. Explore the Line-up Section ── */}
      <section className="category-page__lineup" aria-label={`Explore the ${categoryData.title} line-up`}>
        <div className="category-page__lineup-header">
          <h2 className="category-page__lineup-title">Explore the line-up.</h2>
          <Link to="#" className="category-page__compare-link">
            Compare all models &gt;
          </Link>
        </div>

        {/* Segmented Filter Pills */}
        {categoryData.filterTabs && categoryData.filterTabs.length > 1 && (
          <div className="category-page__tabs" role="tablist">
            {categoryData.filterTabs.map((tab, idx) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={idx === activeTabIdx}
                className={`category-page__tab-btn ${
                  idx === activeTabIdx ? 'category-page__tab-btn--active' : ''
                }`}
                onClick={() => setActiveTabIdx(idx)}
              >
                {tab}
              </button>
            ))}
          </div>
        )}

        {/* Product Lineup Grid */}
        <div className="category-page__grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((prod) => (
              <LineupCard key={prod.id || prod._id} product={prod} />
            ))
          ) : (
            <div className="category-page__no-results">
              <p>No models matching this filter currently available.</p>
            </div>
          )}
        </div>
      </section>

      {/* ── 6. Ecosystem Value Propositions ── */}
      <section className="category-page__why" aria-label={`Why Apple is the best place to buy ${categoryData.title}`}>
        <h2 className="category-page__why-title">Why Apple is the best place to buy {categoryData.title}.</h2>
        <div className="category-page__why-grid">
          <div className="category-page__why-card">
            <span className="category-page__why-icon">💳</span>
            <h3 className="category-page__why-card-title">Ways to Buy</h3>
            <p className="category-page__why-card-desc">
              Monthly payment options available including No Cost EMI from ₹4,150/mo.
            </p>
          </div>
          <div className="category-page__why-card">
            <span className="category-page__why-icon">🔄</span>
            <h3 className="category-page__why-card-title">Apple Trade In</h3>
            <p className="category-page__why-card-desc">
              Trade in your current device for instant credit towards a new one.
            </p>
          </div>
          <div className="category-page__why-card">
            <span className="category-page__why-icon">🚚</span>
            <h3 className="category-page__why-card-title">Free Delivery</h3>
            <p className="category-page__why-card-desc">
              Free scheduled delivery or pickup options available nationwide.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
