import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import products from '../data/products';
import { useCart } from '../context/CartContext';
import Toast from '../components/Toast';
import Footer from '../components/Footer';

function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState(null);
  const { addItem } = useCart();

  if (!product) {
    return (
      <div className="page-wrapper">
        <section className="section">
          <div className="section-inner" style={{ textAlign: 'center', padding: '80px 0' }}>
            <h1>Product not found</h1>
            <p className="text-muted mt-sm">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/" className="btn btn--primary mt-md">
              Back to Shop
            </Link>
          </div>
        </section>
      </div>
    );
  }

  function handleAdd() {
    addItem(product, quantity);
    setToast(`${quantity}x ${product.name} added to cart`);
    setQuantity(1);
  }

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="section-inner">
          <Link to="/" className="back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to products
          </Link>

          <div className="detail">
            <div className="detail__image-wrap">
              <img src={product.image} alt={product.name} />
            </div>

            <div className="detail__info">
              <span className="detail__category">{product.category}</span>
              <h1 className="detail__title">{product.name}</h1>
              <p className="detail__desc">{product.description}</p>

              <div className="detail__price">
                ${product.price.toFixed(2)} <span>USD</span>
              </div>

              <div className="detail__quantity">
                <span className="detail__quantity-label">Quantity</span>
                <button
                  className="detail__qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="detail__qty-value">{quantity}</span>
                <button
                  className="detail__qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="detail__actions">
                <button className="btn btn--primary" onClick={handleAdd}>
                  Add to Cart
                </button>
                <Link to="/cart" className="btn btn--outline">
                  View Cart
                </Link>
              </div>

              <div className="detail__features">
                <div className="detail__feature">
                  <span className="detail__feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  100% Recycled
                </div>
                <div className="detail__feature">
                  <span className="detail__feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Durable design
                </div>
                <div className="detail__feature">
                  <span className="detail__feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Free shipping
                </div>
                <div className="detail__feature">
                  <span className="detail__feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Take-back program
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {toast && <Toast message={toast} onClose={() => setToast(null)} key={toast} />}
    </div>
  );
}

export default ProductDetail;
