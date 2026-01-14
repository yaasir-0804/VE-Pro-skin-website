import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-section">
            <h3 className="footer-heading">VÉ PRO SKIN</h3>
            <p className="footer-text">
              Clinical skincare with visible results. Dermo-tested, cruelty-free formulas made for Indian skin.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Shop</h4>
            <Link to="/products?category=Cleanser" className="footer-link">Cleansers</Link>
            <Link to="/products?category=Moisturiser" className="footer-link">Moisturisers</Link>
            <Link to="/products?category=Serum" className="footer-link">Serums</Link>
            <Link to="/products?category=Sunscreen" className="footer-link">Sunscreens</Link>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Help</h4>
            <Link to="/quiz" className="footer-link">Skin Quiz</Link>
            <Link to="/about" className="footer-link">About Us</Link>
            <Link to="/contact" className="footer-link">Contact</Link>
            <Link to="/faq" className="footer-link">FAQ</Link>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Trust</h4>
            <div className="trust-badges">
              <div className="trust-badge">✓ Dermatologist Tested</div>
              <div className="trust-badge">✓ Cruelty Free</div>
              <div className="trust-badge">✓ No Parabens</div>
              <div className="trust-badge">✓ Made for Indian Skin</div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text">© 2025 VÉ PRO SKIN. All rights reserved.</p>
          <div className="footer-legal">
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
