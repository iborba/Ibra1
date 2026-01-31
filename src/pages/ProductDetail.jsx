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
            <h1>Produto não encontrado</h1>
            <p className="text-muted mt-sm">
              O produto que você procura não existe ou foi removido.
            </p>
            <Link to="/" className="btn btn--primary mt-md">
              Voltar à Loja
            </Link>
          </div>
        </section>
      </div>
    );
  }

  function handleAdd() {
    addItem(product, quantity);
    setToast(`${quantity}x ${product.name} adicionado ao carrinho`);
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
            Voltar aos produtos
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
                R$ {product.price.toFixed(2).replace('.', ',')} <span>BRL</span>
              </div>

              <div className="detail__quantity">
                <span className="detail__quantity-label">Quantidade</span>
                <button
                  className="detail__qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Diminuir quantidade"
                >
                  -
                </button>
                <span className="detail__qty-value">{quantity}</span>
                <button
                  className="detail__qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Aumentar quantidade"
                >
                  +
                </button>
              </div>

              <div className="detail__actions">
                <button className="btn btn--primary" onClick={handleAdd}>
                  Adicionar ao Carrinho
                </button>
                <Link to="/cart" className="btn btn--outline">
                  Ver Carrinho
                </Link>
              </div>

              <div className="detail__features">
                <div className="detail__feature">
                  <span className="detail__feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  100% Reciclado
                </div>
                <div className="detail__feature">
                  <span className="detail__feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Design durável
                </div>
                <div className="detail__feature">
                  <span className="detail__feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Frete grátis
                </div>
                <div className="detail__feature">
                  <span className="detail__feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </span>
                  Programa de devolução
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
