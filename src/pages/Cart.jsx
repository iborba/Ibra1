import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Footer from '../components/Footer';

function Cart() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } =
    useCart();

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="section-inner">
          <div className="section-header">
            <span className="section-header__eyebrow">Your Selection</span>
            <h1>Shopping Cart</h1>
          </div>

          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__icon">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.35 }}>
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                </svg>
              </div>
              <p className="cart-empty__text">Your cart is empty</p>
              <Link to="/" className="btn btn--primary">
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="cart-layout">
              {/* Items */}
              <div className="cart-items">
                {items.map((item) => (
                  <div className="cart-item" key={item.id}>
                    <div className="cart-item__image">
                      <Link to={`/product/${item.id}`}>
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </div>
                    <div className="cart-item__info">
                      <Link to={`/product/${item.id}`}>
                        <div className="cart-item__name">{item.name}</div>
                      </Link>
                      <div className="cart-item__price">
                        ${item.price.toFixed(2)} each
                      </div>
                      <div className="cart-item__controls">
                        <div className="cart-item__qty">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity - 1)
                            }
                            aria-label="Decrease"
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            aria-label="Increase"
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-item__subtotal">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                        <button
                          className="cart-item__remove"
                          onClick={() => removeItem(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="cart-summary">
                <h3 className="cart-summary__title">Order Summary</h3>
                <div className="cart-summary__row">
                  <span>Items ({totalItems})</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="cart-summary__row">
                  <span>Shipping</span>
                  <span className="text-accent">Free</span>
                </div>
                <div className="cart-summary__row total">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <button className="btn btn--primary" style={{ width: '100%' }}>
                  Proceed to Checkout
                </button>
                <button
                  className="btn btn--outline btn--sm"
                  style={{ width: '100%' }}
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Cart;
