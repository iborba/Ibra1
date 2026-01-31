import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-name">
            <span className="text-accent">PD</span> Plásticos da Dá
          </div>
          <p className="footer__brand-desc">
            Sacos de lixo residenciais e industriais, materiais de limpeza —
            tudo fabricado com plástico reciclado. Qualidade, resistência e
            compromisso com o meio ambiente.
          </p>
        </div>

        <div>
          <h4 className="footer__col-title">Loja</h4>
          <div className="footer__links">
            <Link to="/">Todos os Produtos</Link>
            <Link to="/">Sacos de Lixo</Link>
            <Link to="/">Limpeza Residencial</Link>
          </div>
        </div>

        <div>
          <h4 className="footer__col-title">Empresa</h4>
          <div className="footer__links">
            <Link to="/about">Sobre Nós</Link>
            <Link to="/contact">Contato</Link>
            <Link to="/about">Nossa Missão</Link>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        &copy; {new Date().getFullYear()} Plásticos da Dá. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}

export default Footer;
