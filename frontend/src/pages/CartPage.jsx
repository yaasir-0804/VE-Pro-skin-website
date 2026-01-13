import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import './CartPage.css';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    loadCart();
    
    const handleCartUpdate = () => loadCart();
    window.addEventListener('cartUpdated', handleCartUpdate);
    return () => window.removeEventListener('cartUpdated', handleCartUpdate);
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    setCartItems(cart);
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(total);
  };

  const updateQuantity = (productId, newQuantity) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const item = cart.find(i => i.id === productId);
    
    if (item && newQuantity > 0 && newQuantity <= item.stock) {
      item.quantity = newQuantity;
      localStorage.setItem('cart', JSON.stringify(cart));
      loadCart();
      window.dispatchEvent(new Event('cartUpdated'));
    }
  };

  const removeItem = (productId) => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const updatedCart = cart.filter(i => i.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCart();
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const shippingFee = subtotal >= 999 ? 0 : 50;
  const total = subtotal + shippingFee;

  if (cartItems.length === 0) {
    return (
      <div className="container section-padding">
        <div className="empty-cart">
          <ShoppingBag size={64} color="var(--text-light)" />
          <h2 className="heading-2" style={{ marginTop: '24px' }}>Your cart is empty</h2>
          <p className="body-regular" style={{ color: 'var(--text-secondary)', marginTop: '12px' }}>
            Add products to your cart to see them here
          </p>
          <Link to="/products" className="btn-primary" style={{ marginTop: '32px' }}>
            Shop Now
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container section-padding-small">
        <h1 className="hero-medium" style={{ marginBottom: '48px' }}>Shopping Cart</h1>

        <div className="cart-layout">
          {/* Cart Items */}
          <div className="cart-items-section">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                
                <div className="cart-item-details">
                  <Link to={`/product/${item.id}`} className="cart-item-name heading-3">
                    {item.name}
                  </Link>
                  <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                    {item.skinType}
                  </p>
                  <p className="body-regular" style={{ marginTop: '8px' }}>
                    ₹{item.price}
                  </p>
                </div>

                <div className="cart-item-actions">
                  <div className="quantity-controls-cart">
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="qty-display">{item.quantity}</span>
                    <button 
                      className="qty-btn"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <p className="cart-item-total heading-3">
                    ₹{item.price * item.quantity}
                  </p>

                  <button 
                    className="remove-btn"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="order-summary">
            <h3 className="heading-2" style={{ marginBottom: '24px' }}>Order Summary</h3>

            <div className="summary-row">
              <span className="body-regular">Subtotal</span>
              <span className="body-regular">₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span className="body-regular">Shipping</span>
              <span className="body-regular">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>

            {subtotal < 999 && (
              <p className="body-small" style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Add ₹{999 - subtotal} more for free shipping
              </p>
            )}

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span className="heading-3">Total</span>
              <span className="heading-2">₹{total}</span>
            </div>

            <Link to="/checkout" className="btn-primary" style={{ width: '100%', marginTop: '24px' }}>
              Proceed to Checkout
              <ArrowRight size={16} />
            </Link>

            <div className="payment-methods">
              <p className="body-small" style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                We accept
              </p>
              <div className="payment-icons">
                <span className="payment-badge">UPI</span>
                <span className="payment-badge">Cards</span>
                <span className="payment-badge">Wallets</span>
                <span className="payment-badge">COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
