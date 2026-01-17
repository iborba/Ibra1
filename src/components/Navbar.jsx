import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/">Início</Link>
      <Link to="/carrinho">Carrinho</Link>
    </nav>
  );
}

export default Navbar;
