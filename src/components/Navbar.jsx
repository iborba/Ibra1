import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { to: '/', label: 'Início' },
    { to: '/about', label: 'Sobre Nós' },
    { to: '/contact', label: 'Contato' },
  ];

  function isActive(path) {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  }

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav__logo">
          <span className="nav__logo-icon">RP</span>
          RePlastic
        </Link>

        <div className="nav__links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={isActive(link.to) ? 'active' : ''}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav__actions">
          <Link to="/cart" className="nav__cart-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Carrinho
            {totalItems > 0 && (
              <span className="nav__cart-badge">{totalItems}</span>
            )}
          </Link>

          <button
            className={`nav__hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Alternar menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`nav__mobile-menu ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={isActive(link.to) ? 'active' : ''}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </>
  );
}

export default Navbar;
