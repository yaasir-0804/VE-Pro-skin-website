import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, User, Menu, X } from 'lucide-react';
import './Header.css';

const Header = ({ cartCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="navigation-header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="navigation-logo">
            VÉ PRO SKIN
          </Link>

          {/* Desktop Navigation */}
          <nav className="navigation-menu">
            <Link to="/" className="navigation-link">Home</Link>
            <Link to="/products" className="navigation-link">Shop</Link>
            <Link to="/quiz" className="navigation-link">Skin Quiz</Link>
            <Link to="/about" className="navigation-link">About</Link>
          </nav>

          {/* Utilities */}
          <div className="navigation-utilities">
            <Link to="/account" className="utility-icon">
              <User size={20} />
            </Link>
            <Link to="/cart" className="utility-icon cart-icon">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </Link>
            <button 
              className="mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <nav className="mobile-navigation">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/products" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link to="/quiz" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>Skin Quiz</Link>
            <Link to="/about" className="mobile-nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
