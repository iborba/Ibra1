import React, { useState } from 'react';
import Footer from '../components/Footer';

function Contact() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="page-wrapper">
      <section className="section">
        <div className="section-inner">
          <div className="section-header" style={{ textAlign: 'center', alignItems: 'center' }}>
            <span className="section-header__eyebrow">Get in Touch</span>
            <h1>Contact Us</h1>
            <p className="section-header__desc" style={{ maxWidth: 560, margin: '0 auto' }}>
              Have a question about our products, partnerships, or wholesale
              orders? We'd love to hear from you.
            </p>
          </div>

          <div className="contact-grid">
            {/* Form */}
            <div>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '48px 0' }}>
                  <h2 className="text-accent">Thank you!</h2>
                  <p className="text-muted mt-sm">
                    Your message has been received. We'll get back to you within
                    24 hours.
                  </p>
                  <button
                    className="btn btn--outline mt-md"
                    onClick={() => setSubmitted(false)}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      type="text"
                      className="form-input"
                      placeholder="Jane Doe"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      id="email"
                      type="email"
                      className="form-input"
                      placeholder="jane@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      className="form-input"
                      placeholder="Product inquiry"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      className="form-input"
                      placeholder="Tell us what you need..."
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn--primary">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Info cards */}
            <div className="contact-info">
              <div className="contact-info-card">
                <div className="contact-info-card__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div>
                  <h4 className="contact-info-card__title">Email</h4>
                  <p className="contact-info-card__text">hello@replastic.co</p>
                  <p className="contact-info-card__text">We reply within 24 h</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-card__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div>
                  <h4 className="contact-info-card__title">Phone</h4>
                  <p className="contact-info-card__text">+1 (555) 123-4567</p>
                  <p className="contact-info-card__text">Mon-Fri, 9 AM - 6 PM EST</p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-card__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <h4 className="contact-info-card__title">Office</h4>
                  <p className="contact-info-card__text">
                    42 Green Loop Drive<br />
                    Portland, OR 97201
                  </p>
                </div>
              </div>

              <div className="contact-info-card">
                <div className="contact-info-card__icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
                <div>
                  <h4 className="contact-info-card__title">Business Hours</h4>
                  <p className="contact-info-card__text">
                    Monday - Friday: 9 AM - 6 PM<br />
                    Saturday: 10 AM - 2 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;
