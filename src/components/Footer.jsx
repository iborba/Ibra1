import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-name">
            <span className="text-accent">RP</span> RePlastic
          </div>
          <p className="footer__brand-desc">
            Everyday products made from recycled plastic. We turn waste into
            durable, beautiful goods — so you can live sustainably without
            compromise.
          </p>
        </div>

        <div>
          <h4 className="footer__col-title">Shop</h4>
          <div className="footer__links">
            <Link to="/">All Products</Link>
            <Link to="/">Garden</Link>
            <Link to="/">Home</Link>
            <Link to="/">Accessories</Link>
          </div>
        </div>

        <div>
          <h4 className="footer__col-title">Company</h4>
          <div className="footer__links">
            <Link to="/about">About Us</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/about">Our Mission</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        &copy; {new Date().getFullYear()} RePlastic. All rights reserved. Built
        with recycled pixels.
      </div>
    </footer>
  );
}

export default Footer;
