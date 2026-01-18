import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">🗑️ Sacos de Lixo</Link>
      </div>
      <div className="navbar-links">
        <Link to="/">Início</Link>
        <Link to="/carrinho">Carrinho</Link>
      </div>
    </nav>
  );
}

export default Navbar;
