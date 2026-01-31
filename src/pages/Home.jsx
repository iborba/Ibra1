import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products, { categories } from '../data/products';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import Footer from '../components/Footer';

function Home() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [toast, setToast] = useState(null);
  const { addItem } = useCart();

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  function handleAdd(product) {
    addItem(product, 1);
    setToast(`${product.name} added to cart`);
  }

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="section">
        <div className="section-inner hero">
          <div className="hero__content">
            <span className="hero__badge">Sustainable by design</span>
            <h1 className="hero__title">
              Products made from <span>recycled plastic</span>
            </h1>
            <p className="hero__desc">
              From ocean waste to your doorstep. Every product in our catalog is
              crafted from post-consumer recycled plastic — durable, beautiful,
              and kind to the planet.
            </p>
            <div className="hero__actions">
              <a href="#products" className="btn btn--primary">
                Browse Products
              </a>
              <Link to="/about" className="btn btn--outline">
                Our Story
              </Link>
            </div>

            <div className="hero__stats">
              <div>
                <div className="hero__stat-value">50 t</div>
                <div className="hero__stat-label">Plastic diverted</div>
              </div>
              <div>
                <div className="hero__stat-value">12k+</div>
                <div className="hero__stat-label">Happy customers</div>
              </div>
              <div>
                <div className="hero__stat-value">100%</div>
                <div className="hero__stat-label">Recycled materials</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section" id="products">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-header__eyebrow">Our Catalog</span>
            <h2>Browse our products</h2>
            <p className="section-header__desc">
              Each item is designed to last and made entirely from recycled
              materials. Filter by category to find exactly what you need.
            </p>
          </div>

          <div className="filter-pills">
            <button
              className={`filter-pill ${activeCategory === 'All' ? 'active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="product-grid">
            {filtered.map((product) => (
              <div className="product-card" key={product.id}>
                <Link to={`/product/${product.id}`}>
                  <div className="product-card__image-wrap">
                    <img src={product.image} alt={product.name} loading="lazy" />
                    {product.badge && (
                      <span className="product-card__badge">{product.badge}</span>
                    )}
                  </div>
                </Link>
                <div className="product-card__body">
                  <div className="product-card__category">{product.category}</div>
                  <Link to={`/product/${product.id}`}>
                    <h3 className="product-card__name">{product.name}</h3>
                  </Link>
                  <p className="product-card__desc">{product.shortDescription}</p>
                  <div className="product-card__footer">
                    <span className="product-card__price">
                      ${product.price.toFixed(2)}
                    </span>
                    <button
                      className="product-card__add-btn"
                      onClick={() => handleAdd(product)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {toast && <Toast message={toast} onClose={() => setToast(null)} key={toast} />}
    </div>
  );
}

export default Home;
