import React from 'react';
import Footer from '../components/Footer';

function About() {
  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="section-inner">
          <div className="about-hero">
            <span className="hero__badge">Who we are</span>
            <h1 className="about-hero__title">
              Turning waste into <span>wonder</span>
            </h1>
            <p className="about-hero__desc">
              RePlastic was founded on a simple belief: discarded plastic
              doesn't have to stay discarded. We collect, process, and
              transform post-consumer plastic into products that people
              genuinely want to use every day.
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
              <h3 className="about-card__title">Global Impact</h3>
              <p className="about-card__text">
                We partner with collection networks across three continents to
                recover plastic before it reaches the ocean. Each product you buy
                directly funds these recovery operations.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </div>
              <h3 className="about-card__title">Built to Last</h3>
              <p className="about-card__text">
                Recycled doesn't mean fragile. Our products are engineered to
                match or exceed the durability of virgin-material alternatives,
                backed by our multi-year warranty.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
                </svg>
              </div>
              <h3 className="about-card__title">Full Transparency</h3>
              <p className="about-card__text">
                We publish a yearly impact report detailing how much plastic
                we've diverted, our carbon footprint, and the communities
                we've supported through our programs.
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
              <h3 className="about-card__title">Community First</h3>
              <p className="about-card__text">
                From waste-pickers to warehouse staff, fair wages and safe
                conditions aren't optional — they're our foundation. We invest
                in the people who make this work possible.
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
              <h3 className="about-card__title">Circular Design</h3>
              <p className="about-card__text">
                Every RePlastic product is designed to be recycled again at end
                of life. We offer a take-back program so nothing we make ever
                ends up in landfill.
              </p>
            </div>

            <div className="about-card">
              <div className="about-card__icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </div>
              <h3 className="about-card__title">Always Innovating</h3>
              <p className="about-card__text">
                Our R&D lab continuously experiments with new plastic types and
                manufacturing techniques to expand what's possible with recycled
                materials.
              </p>
            </div>
          </div>

          {/* Numbers */}
          <div className="about-numbers">
            <div className="about-number">
              <div className="about-number__value">50 t</div>
              <div className="about-number__label">Plastic diverted yearly</div>
            </div>
            <div className="about-number">
              <div className="about-number__value">12k+</div>
              <div className="about-number__label">Customers worldwide</div>
            </div>
            <div className="about-number">
              <div className="about-number__value">38</div>
              <div className="about-number__label">Collection partners</div>
            </div>
            <div className="about-number">
              <div className="about-number__value">100%</div>
              <div className="about-number__label">Recycled materials</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default About;
