import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { products, productCategories, skinTypes } from '../data/mockProducts';
import { Star, Filter } from 'lucide-react';
import './ProductsPage.css';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedSkinType, setSelectedSkinType] = useState('All');

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    if (selectedSkinType !== 'All') {
      filtered = filtered.filter(p => p.skinType === selectedSkinType);
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedSkinType]);

  return (
    <div className="products-page">
      <div className="container section-padding-small">
        <div className="page-header">
          <h1 className="hero-medium">Our Products</h1>
          <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            Clinical formulas for every skin type
          </p>
        </div>

        {/* Filters */}
        <div className="filters-section">
          <div className="filter-group">
            <label className="filter-label">
              <Filter size={16} />
              Category
            </label>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${selectedCategory === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedCategory('All')}
              >
                All
              </button>
              {productCategories.map(cat => (
                <button 
                  key={cat}
                  className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label">
              <Filter size={16} />
              Skin Type
            </label>
            <div className="filter-buttons">
              <button 
                className={`filter-btn ${selectedSkinType === 'All' ? 'active' : ''}`}
                onClick={() => setSelectedSkinType('All')}
              >
                All
              </button>
              {skinTypes.map(type => (
                <button 
                  key={type}
                  className={`filter-btn ${selectedSkinType === type ? 'active' : ''}`}
                  onClick={() => setSelectedSkinType(type)}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <Link 
              to={product.comingSoon ? '#' : `/product/${product.id}`}
              key={product.id}
              className={`product-card hover-lift ${product.comingSoon ? 'coming-soon-card' : ''}`}
              onClick={(e) => product.comingSoon && e.preventDefault()}
            >
              {product.badge && (
                <div className={`product-badge ${product.comingSoon ? 'coming-soon-badge' : ''}`}>
                  {product.badge}
                </div>
              )}
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
                {product.subtitle && (
                  <div className="product-subtitle body-small">{product.subtitle}</div>
                )}
                
                <div className="product-ingredients body-small">
                  {product.ingredients.slice(0, 2).join(' • ')}
                </div>
                
                {!product.comingSoon && (
                  <>
                    <div className="product-rating">
                      <Star size={14} fill="var(--text-primary)" />
                      <span className="body-small">{product.rating} ({product.reviews})</span>
                    </div>
                    
                    <div className="product-pricing">
                      <span className="original-price">₹{product.originalPrice}</span>
                      <span className="current-price">₹{product.price}</span>
                      <span className="discount-badge">{product.discount}% Off</span>
                    </div>
                    
                    <div className="product-stock body-small">Only {product.stock} left</div>
                  </>
                )}
                
                {product.comingSoon && (
                  <div className="coming-soon-text">
                    <p className="body-regular" style={{ color: 'var(--accent-warm)', fontWeight: '500' }}>
                      Launching Soon
                    </p>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      Be the first to know
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p className="body-large">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
