import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import products, { categories } from '../data/products';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import Footer from '../components/Footer';

function Home() {
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [toast, setToast] = useState(null);
  const { addItem } = useCart();

  const filtered =
    activeCategory === 'Todos'
      ? products
      : products.filter((p) => p.category === activeCategory);

  function handleAdd(product) {
    addItem(product, 1);
    setToast(`${product.name} adicionado ao carrinho`);
  }

  return (
    <div className="page-wrapper">
      {/* Hero */}
      <section className="section">
        <div className="section-inner hero">
          <div className="hero__content">
            <span className="hero__badge">Sustentável por design</span>
            <h1 className="hero__title">
              Produtos feitos de <span>plástico reciclado</span>
            </h1>
            <p className="hero__desc">
              Do resíduo do oceano até a sua porta. Cada produto do nosso
              catálogo é feito de plástico reciclado pós-consumo — durável,
              bonito e gentil com o planeta.
            </p>
            <div className="hero__actions">
              <a href="#products" className="btn btn--primary">
                Ver Produtos
              </a>
              <Link to="/about" className="btn btn--outline">
                Nossa História
              </Link>
            </div>

            <div className="hero__stats">
              <div>
                <div className="hero__stat-value">50 t</div>
                <div className="hero__stat-label">Plástico desviado</div>
              </div>
              <div>
                <div className="hero__stat-value">12 mil+</div>
                <div className="hero__stat-label">Clientes satisfeitos</div>
              </div>
              <div>
                <div className="hero__stat-value">100%</div>
                <div className="hero__stat-label">Materiais reciclados</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="section" id="products">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-header__eyebrow">Nosso Catálogo</span>
            <h2>Conheça nossos produtos</h2>
            <p className="section-header__desc">
              Cada item é projetado para durar e feito inteiramente de materiais
              reciclados. Filtre por categoria para encontrar o que você precisa.
            </p>
          </div>

          <div className="filter-pills">
            <button
              className={`filter-pill ${activeCategory === 'Todos' ? 'active' : ''}`}
              onClick={() => setActiveCategory('Todos')}
            >
              Todos
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
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                    <button
                      className="product-card__add-btn"
                      onClick={() => handleAdd(product)}
                      aria-label={`Adicionar ${product.name} ao carrinho`}
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
