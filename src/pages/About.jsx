import React from 'react';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="section-inner">
          <div className="about-hero">
            <span className="hero__badge">Quem somos</span>
            <h1 className="about-hero__title">
              Transformando resíduos em <span>soluções de limpeza</span>
            </h1>
            <p className="about-hero__desc">
              A Plásticos da Dá nasceu de uma crença simples: plástico
              descartado pode virar produto de qualidade. Fabricamos sacos de
              lixo e materiais de limpeza a partir de plástico reciclado
              pós-consumo — resistentes, acessíveis e sustentáveis.
            </p>
          </div>

          {/* Values grid */}
          <div className="about-grid">
            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="about-card__title">Impacto Global</h3>
              <p className="about-card__text">
                Trabalhamos com redes de coleta em três continentes para
                recuperar plástico antes que ele chegue ao oceano. Cada produto
                que você compra financia diretamente essas operações de
                recuperação.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="about-card__title">Feito para Durar</h3>
              <p className="about-card__text">
                Reciclado não significa frágil. Nossos sacos de lixo e
                materiais de limpeza são projetados para igualar ou superar
                a resistência de alternativas com material virgem.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 className="about-card__title">Transparência Total</h3>
              <p className="about-card__text">
                Publicamos um relatório anual de impacto detalhando quanto
                plástico desviamos, nossa pegada de carbono e as comunidades
                que apoiamos através dos nossos programas.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              </div>
              <h3 className="about-card__title">Comunidade em Primeiro Lugar</h3>
              <p className="about-card__text">
                De catadores a equipe de armazém, salários justos e condições
                seguras não são opcionais — são nossa base. Investimos nas
                pessoas que tornam este trabalho possível.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <h3 className="about-card__title">Design Circular</h3>
              <p className="about-card__text">
                Cada produto Plásticos da Dá é projetado para ser reciclado
                novamente ao fim de sua vida útil. Oferecemos um programa de
                devolução para que nada que fabricamos vá para o aterro.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <h3 className="about-card__title">Sempre Inovando</h3>
              <p className="about-card__text">
                Nosso laboratório de P&D experimenta continuamente novos tipos
                de plástico e técnicas de fabricação para expandir o que é
                possível com materiais reciclados.
              </p>
            </div>
          </div>

          {/* Numbers */}
          <div className="about-numbers">
            <div className="about-number">
              <div className="about-number__value">50 t</div>
              <div className="about-number__label">Plástico desviado por ano</div>
            </div>
            <div className="about-number">
              <div className="about-number__value">12 mil+</div>
              <div className="about-number__label">Clientes no mundo todo</div>
            </div>
            <div className="about-number">
              <div className="about-number__value">38</div>
              <div className="about-number__label">Parceiros de coleta</div>
            </div>
            <div className="about-number">
              <div className="about-number__value">100%</div>
              <div className="about-number__label">Materiais reciclados</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
