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
            Produtos do dia a dia feitos de plástico reciclado. Transformamos
            resíduos em produtos duráveis e bonitos — para que você viva de
            forma sustentável sem abrir mão de nada.
          </p>
        </div>

        <div>
          <h4 className="footer__col-title">Loja</h4>
          <div className="footer__links">
            <Link to="/">Todos os Produtos</Link>
            <Link to="/">Jardim</Link>
            <Link to="/">Casa</Link>
            <Link to="/">Acessórios</Link>
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
        &copy; {new Date().getFullYear()} RePlastic. Todos os direitos
        reservados. Feito com pixels reciclados.
      </div>
    </footer>
  );
}

export default Footer;
