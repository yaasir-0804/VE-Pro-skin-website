import React from 'react';
import { Link } from 'react-router-dom';
import { products, productCategories } from '../data/mockProducts';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import './HomePage.css';

const HomePage = () => {
  const bestSellers = products.filter(p => p.badge === 'Best Seller').slice(0, 4);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-large">Clinical Skincare.<br />Visible Results.</h1>
            <p className="body-large" style={{ maxWidth: '560px', marginTop: '24px', color: 'var(--text-secondary)' }}>
              Dermo-tested, cruelty-free formulas for acne, glow & barrier repair — made for Indian skin.
            </p>
            
            <div className="hero-buttons">
              <Link to="/products" className="btn-primary">
                Shop by Skin Type
                <ArrowRight size={16} />
              </Link>
              <Link to="/quiz" className="btn-primary">
                Take Skin Quiz
                <ArrowRight size={16} />
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="trust-badges-row">
              <div className="trust-badge-item">✓ Dermatologist Tested</div>
              <div className="trust-badge-item">✓ Cruelty Free</div>
              <div className="trust-badge-item">✓ No Parabens</div>
              <div className="trust-badge-item">✓ Made for Indian Skin</div>
            </div>

            {/* Social Proof */}
            <div className="social-proof-bar">
              <TrendingUp size={16} />
              <span>12,340+ people bought this week</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-padding-small">
        <div className="container">
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Shop by Category
          </h2>
          
          <div className="category-grid">
            {['Cleanser', 'Moisturiser', 'Serum'].map((category) => (
              <Link 
                to={`/products?category=${category}`} 
                key={category}
                className="category-card hover-lift"
              >
                <div className="category-card-content">
                  <h3 className="heading-3">{category}</h3>
                  <p className="body-small">3 Products</p>
                </div>
                <ArrowRight size={20} className="category-arrow" />
              </Link>
            ))}
            <div className="category-card coming-soon-category">
              <div className="category-card-content">
                <h3 className="heading-3">Sunscreen</h3>
                <p className="body-small" style={{ color: 'var(--accent-warm)', fontWeight: '500' }}>Coming Soon</p>
              </div>
              <ArrowRight size={20} className="category-arrow" style={{ opacity: 0.4 }} />
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section-padding-small" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 className="heading-1">Best Sellers</h2>
            <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
              Most loved by our customers
            </p>
          </div>
          
          <div className="product-grid">
            {bestSellers.map((product) => (
              <Link 
                to={product.comingSoon ? '#' : `/product/${product.id}`}
                key={product.id}
                className={`product-card hover-lift ${product.comingSoon ? 'coming-soon-card' : ''}`}
                onClick={(e) => product.comingSoon && e.preventDefault()}
              >
                <div className={`product-badge ${product.comingSoon ? 'coming-soon-badge' : ''}`}>
                  {product.badge}
                </div>
                {product.image ? (
                  <img src={product.image} alt={product.name} className="product-card-image" />
                ) : (
                  <div className="product-card-image-placeholder">
                    <div className="coming-soon-icon">
                      <span style={{ fontSize: '48px' }}>⏳</span>
                    </div>
                  </div>
                )}
                
                <div className="product-card-body">
                  <div className="product-skin-type body-small">{product.skinType}</div>
                  <h3 className="heading-3" style={{ margin: '8px 0' }}>{product.name}</h3>
                  
                  <div className="product-ingredients body-small">
                    {product.ingredients.slice(0, 2).join(' • ')}
                  </div>
                  
                  <div className="product-benefits body-small">
                    {product.benefits.slice(0, 2).join(' • ')}
                  </div>
                  
                  {!product.comingSoon && (
                    <>
                      <div className="product-rating">
                        <Star size={14} fill="var(--text-primary)" />
                        <span className="body-small">{product.rating} ({product.reviews} reviews)</span>
                      </div>
                      
                      <div className="product-pricing">
                        <span className="original-price">₹{product.originalPrice}</span>
                        <span className="current-price">₹{product.price}</span>
                        <span className="discount-badge">{product.discount}% Off</span>
                      </div>
                      
                      <div className="product-stock body-small">Only {product.stock} left in stock</div>
                    </>
                  )}
                  
                  {product.comingSoon && (
                    <div className="coming-soon-text">
                      <p className="body-regular" style={{ color: 'var(--accent-warm)', fontWeight: '500' }}>
                        Launching Soon
                      </p>
                      <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                        Be the first to know when it's available
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/products" className="btn-primary">
              View All Products
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Skin Quiz CTA */}
      <section className="section-padding">
        <div className="container">
          <div className="quiz-cta-section">
            <h2 className="hero-medium">Not sure what to choose?</h2>
            <p className="body-large" style={{ color: 'var(--text-secondary)', marginTop: '16px', marginBottom: '32px' }}>
              Take our personalized skin quiz and discover your perfect routine
            </p>
            <Link to="/quiz" className="btn-primary">
              Find My Routine
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="section-padding-small" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <h2 className="heading-1" style={{ textAlign: 'center', marginBottom: '48px' }}>
            Why Choose VÉ PRO SKIN
          </h2>
          
          <div className="trust-grid">
            <div className="trust-card">
              <h3 className="heading-3">Ingredient Transparency</h3>
              <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                Full INCI lists and percentage disclosure for all active ingredients
              </p>
            </div>
            
            <div className="trust-card">
              <h3 className="heading-3">Dermatologist Tested</h3>
              <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                Clinically tested formulas proven safe and effective
              </p>
            </div>
            
            <div className="trust-card">
              <h3 className="heading-3">Cruelty Free</h3>
              <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                Never tested on animals. Ethical beauty you can trust
              </p>
            </div>
            
            <div className="trust-card">
              <h3 className="heading-3">Made for Indian Skin</h3>
              <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
                Formulated specifically for Indian skin types and climate
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
