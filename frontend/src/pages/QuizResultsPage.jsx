import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/mockProducts';
import { Sparkles, ArrowRight, ShoppingCart } from 'lucide-react';
import './QuizResultsPage.css';

const QuizResultsPage = () => {
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);
  const [skinTypeResult, setSkinTypeResult] = useState('');

  useEffect(() => {
    const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers') || '{}');
    
    if (!quizAnswers.skinType) {
      navigate('/quiz');
      return;
    }

    // Map quiz answers to skin type
    const skinTypeMap = {
      'oily': 'Oily / Acne-Prone',
      'normal': 'Normal / Combination',
      'dry': 'Dry / Sensitive'
    };

    const userSkinType = skinTypeMap[quizAnswers.skinType];
    setSkinTypeResult(userSkinType);

    // Get recommended products (Cleanser, Serum, Moisturiser)
    const recommended = ['Cleanser', 'Serum', 'Moisturiser'].map(category => {
      return products.find(p => p.category === category && p.skinType === userSkinType);
    }).filter(Boolean);

    setRecommendations(recommended);
  }, [navigate]);

  const addRoutineToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    recommendations.forEach(product => {
      const existingItem = cart.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }
    });
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    navigate('/cart');
  };

  const bundlePrice = recommendations.reduce((sum, p) => sum + p.price, 0);
  const bundleDiscount = Math.round(bundlePrice * 0.1);
  const bundleTotal = bundlePrice - bundleDiscount;

  return (
    <div className="quiz-results-page">
      <div className="container section-padding-small">
        <div className="results-header">
          <Sparkles size={48} color="var(--text-primary)" />
          <h1 className="hero-medium" style={{ marginTop: '24px' }}>Your Perfect Routine</h1>
          <p className="body-large" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            Based on your answers, we recommend products for <strong>{skinTypeResult}</strong> skin
          </p>
        </div>

        <div className="routine-section">
          <h2 className="heading-2" style={{ marginBottom: '32px', textAlign: 'center' }}>
            Recommended 3-Step Routine
          </h2>

          <div className="routine-grid">
            {recommendations.map((product, index) => (
              <div key={product.id} className="routine-card">
                <div className="routine-step">Step {index + 1}</div>
                <img src={product.image} alt={product.name} className="routine-image" />
                
                <div className="routine-info">
                  <div className="body-small" style={{ color: 'var(--text-secondary)' }}>
                    {product.category}
                  </div>
                  <h3 className="heading-3" style={{ margin: '8px 0' }}>{product.name}</h3>
                  
                  <div className="routine-benefits body-small">
                    {product.benefits.slice(0, 2).join(' • ')}
                  </div>

                  <div className="routine-price">
                    <span className="current-price">₹{product.price}</span>
                    <span className="original-price">₹{product.originalPrice}</span>
                  </div>

                  <Link to={`/product/${product.id}`} className="btn-secondary">
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Bundle Offer */}
          <div className="bundle-offer">
            <div className="bundle-content">
              <h3 className="heading-2">Complete Routine Bundle</h3>
              <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Get all 3 products together and save extra 10%
              </p>
            </div>

            <div className="bundle-pricing">
              <div className="bundle-price-row">
                <span className="body-regular">Bundle Price:</span>
                <span className="body-regular" style={{ textDecoration: 'line-through' }}>
                  ₹{bundlePrice}
                </span>
              </div>
              <div className="bundle-price-row">
                <span className="body-regular">You Save:</span>
                <span className="body-regular" style={{ color: 'var(--status-error)' }}>
                  -₹{bundleDiscount}
                </span>
              </div>
              <div className="bundle-total-row">
                <span className="heading-3">Total:</span>
                <span className="heading-2">₹{bundleTotal}</span>
              </div>
            </div>

            <button className="btn-primary" onClick={addRoutineToCart} style={{ width: '100%' }}>
              <ShoppingCart size={18} />
              Add Complete Routine to Cart
            </button>
          </div>

          {/* Why This Routine */}
          <div className="why-routine-section">
            <h3 className="heading-2" style={{ textAlign: 'center', marginBottom: '32px' }}>
              Why This Routine Works for You
            </h3>

            <div className="why-routine-grid">
              <div className="why-card">
                <h4 className="heading-3">Cleanser</h4>
                <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Gently removes impurities without disrupting your skin barrier
                </p>
              </div>

              <div className="why-card">
                <h4 className="heading-3">Serum</h4>
                <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Delivers concentrated actives to target your specific concerns
                </p>
              </div>

              <div className="why-card">
                <h4 className="heading-3">Moisturiser</h4>
                <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                  Locks in hydration and strengthens your skin's natural protection
                </p>
              </div>
            </div>
          </div>

          {/* Retake Quiz */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/quiz" className="btn-secondary">
              Retake Quiz
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizResultsPage;
