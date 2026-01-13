import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../data/mockProducts';
import { Star, ShoppingCart, ArrowLeft, Clock, Eye } from 'lucide-react';
import './ProductDetailPage.css';

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 12, seconds: 56 });

  useEffect(() => {
    const foundProduct = getProductById(productId);
    setProduct(foundProduct);
  }, [productId]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    alert('Product added to cart!');
  };

  if (!product) {
    return (
      <div className="container section-padding">
        <p className="body-large">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="product-detail-page">
      <div className="container section-padding-small">
        <Link to="/products" className="back-link">
          <ArrowLeft size={16} />
          Back to Products
        </Link>

        <div className="product-detail-grid">
          {/* Product Image */}
          <div className="product-image-section">
            <img src={product.image} alt={product.name} className="product-detail-image" />
          </div>

          {/* Product Info */}
          <div className="product-info-section">
            <div className="product-meta">
              <span className="product-category body-small">{product.category}</span>
              <span className="product-skin-type body-small">{product.skinType}</span>
            </div>

            <h1 className="hero-medium" style={{ marginTop: '16px' }}>{product.name}</h1>
            {product.subtitle && (
              <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                {product.subtitle}
              </p>
            )}

            <div className="product-rating-large">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill={i < Math.floor(product.rating) ? "var(--text-primary)" : "none"} />
                ))}
              </div>
              <span className="body-regular">{product.rating} ({product.reviews} reviews)</span>
            </div>

            <div className="product-pricing-large">
              <span className="current-price-large">₹{product.price}</span>
              <span className="original-price-large">₹{product.originalPrice}</span>
              <span className="discount-badge-large">{product.discount}% Off</span>
            </div>

            {/* Urgency Timer */}
            <div className="urgency-timer">
              <Clock size={16} />
              <span>Launch offer ends in</span>
              <span className="timer-display">
                {String(timeLeft.hours).padStart(2, '0')}:
                {String(timeLeft.minutes).padStart(2, '0')}:
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>

            {/* Social Proof */}
            <div className="social-proof-detail">
              <div className="proof-item">
                <Eye size={16} />
                <span className="body-small">{product.viewsToday} people viewing now</span>
              </div>
              <div className="proof-item">
                <ShoppingCart size={16} />
                <span className="body-small">{product.boughtToday} bought today</span>
              </div>
            </div>

            {/* Stock Warning */}
            <div className="stock-warning">
              Only {product.stock} left in stock!
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label className="body-regular">Quantity:</label>
              <div className="quantity-controls">
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </button>
                <span className="qty-display">{quantity}</span>
                <button 
                  className="qty-btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <button className="btn-primary add-to-cart-btn" onClick={addToCart}>
              <ShoppingCart size={18} />
              Add to Cart
            </button>

            {/* Key Ingredients */}
            <div className="product-section">
              <h3 className="heading-3">Key Ingredients</h3>
              <div className="ingredients-list">
                {product.ingredients.map((ing, idx) => (
                  <span key={idx} className="ingredient-tag">{ing}</span>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="product-section">
              <h3 className="heading-3">Benefits</h3>
              <ul className="benefits-list">
                {product.benefits.map((benefit, idx) => (
                  <li key={idx} className="body-regular">{benefit}</li>
                ))}
              </ul>
            </div>

            {/* Description */}
            <div className="product-section">
              <h3 className="heading-3">Description</h3>
              <p className="body-regular" style={{ whiteSpace: 'pre-line', lineHeight: '1.7' }}>
                {product.fullDescription}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
