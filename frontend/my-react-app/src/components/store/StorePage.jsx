import { useState, useEffect } from 'react';
import Navbar from '../Navbar';
import Footer from '../Footer';
import StoreCategoryShelf from './StoreCategoryShelf';
import LineupCard from '../category/LineupCard';
import apiClient from '../../services/apiClient';
import './StorePage.css';

const StorePage = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    apiClient.getProducts()
      .then((products) => {
        setLatestProducts(products);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading store products:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="store-page">
      <Navbar />

      {/* ── 1. Store Header & Category Shelf Carousel ── */}
      <StoreCategoryShelf />

      {/* ── 2. The Latest Section ── */}
      <section className="store-page__section" aria-label="The latest products">
        <div className="store-page__section-header">
          <h2 className="store-page__section-title">
            The latest. <span className="store-page__section-sub">Take a look at what's new.</span>
          </h2>
        </div>

        <div className="store-page__shelf-slider">
          {loading ? (
            <div className="store-page__loader">Loading products...</div>
          ) : (
            latestProducts.slice(0, 4).map((prod) => (
              <div key={prod.id || prod._id} className="store-page__card-wrapper">
                <LineupCard product={prod} />
              </div>
            ))
          )}
        </div>
      </section>

      {/* ── 3. Help is Here Assistance Banner ── */}
      <section className="store-page__help-section" aria-label="Help and Assistance">
        <div className="store-page__help-card">
          <div className="store-page__help-text">
            <span className="store-page__help-eyebrow">APPLE SPECIALIST</span>
            <h3 className="store-page__help-title">Shop one on one with a Specialist online.</h3>
            <p className="store-page__help-desc">
              Get buying advice, explore trade-in values, and choose the right Mac, iPhone, or iPad for you.
            </p>
          </div>
          <button className="store-page__help-btn">Chat with a Specialist</button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default StorePage;
