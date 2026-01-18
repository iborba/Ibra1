import React from 'react';
import { Link } from 'react-router-dom';
import ParceirosCards from './ParceirosCards';

function Navbar() {
  return (
    <nav className="navbar-vertical">
      <div className="navbar-brand-vertical">
        <Link to="/">🗑️ Sacos para Resíduos</Link>
      </div>
      <div className="navbar-links-vertical">
        <Link to="/">Início</Link>
        <Link to="/carrinho">Carrinho</Link>
        <Link to="/quem-somos">Quem Somos</Link>
        <Link to="/contato">Contato</Link>
      </div>
      <div className="navbar-parceiros">
        <h3>Parceiros</h3>
        <ParceirosCards />
      </div>
    </nav>
  );
}

export default Navbar;
