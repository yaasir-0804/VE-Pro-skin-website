import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, CreditCard } from 'lucide-react';
import axios from 'axios';
import './CheckoutPage.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cart.length === 0) {
      navigate('/cart');
      return;
    }
    setCartItems(cart);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setSubtotal(total);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const shippingFee = subtotal >= 999 ? 0 : 50;
  const total = subtotal + shippingFee;

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);

    try {
      // Submit to pre-launch campaign
      const campaignResponse = await axios.post(`${API}/campaign/submit`, {
        customer: formData,
        items: cartItems,
        total_amount: total
      });

      if (campaignResponse.data.success) {
        // Clear cart
        localStorage.removeItem('cart');
        window.dispatchEvent(new Event('cartUpdated'));
        
        // Redirect to campaign thank you page
        navigate(`/campaign-thank-you?code=${campaignResponse.data.discount_code}`);
      }
    } catch (error) {
      console.error('Campaign submission error:', error);
      alert('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <div className="container section-padding-small">
        <h1 className="hero-medium" style={{ marginBottom: '48px', textAlign: 'center' }}>
          Secure Checkout
        </h1>

        <div className="checkout-layout">
          {/* Checkout Form */}
          <div className="checkout-form-section">
            <form onSubmit={handlePayment}>
              <div className="form-section">
                <h2 className="heading-2" style={{ marginBottom: '24px' }}>
                  Delivery Information
                </h2>

                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="form-input"
                    rows="3"
                    required
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%', marginTop: '32px' }}
                disabled={loading}
              >
                <Lock size={18} />
                {loading ? 'Processing...' : `Pay ₹${total} Securely`}
              </button>

              <div className="payment-info">
                <CreditCard size={16} />
                <span className="body-small">
                  Powered by Razorpay • UPI, Cards, Wallets, COD accepted
                </span>
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="checkout-summary">
            <h3 className="heading-2" style={{ marginBottom: '24px' }}>
              Order Summary
            </h3>

            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  <img src={item.image} alt={item.name} className="summary-item-image" />
                  <div className="summary-item-details">
                    <p className="body-regular">{item.name}</p>
                    <p className="body-small" style={{ color: 'var(--text-secondary)' }}>
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="body-regular">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row">
              <span className="body-regular">Subtotal</span>
              <span className="body-regular">₹{subtotal}</span>
            </div>

            <div className="summary-row">
              <span className="body-regular">Shipping</span>
              <span className="body-regular">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-row summary-total">
              <span className="heading-3">Total</span>
              <span className="heading-2">₹{total}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
