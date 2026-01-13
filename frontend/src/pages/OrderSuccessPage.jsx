import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';
import './OrderSuccessPage.css';

const OrderSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order_id');
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  return (
    <div className="order-success-page">
      <div className="container section-padding">
        <div className="success-content">
          <div className="success-icon">
            <CheckCircle size={64} color="var(--status-success)" />
          </div>

          <h1 className="hero-medium" style={{ marginTop: '24px' }}>
            Order Placed Successfully!
          </h1>

          <p className="body-large" style={{ color: 'var(--text-secondary)', marginTop: '16px', textAlign: 'center', maxWidth: '500px' }}>
            Thank you for your order. We've received your payment and will start processing your order right away.
          </p>

          {orderId && (
            <div className="order-id-box">
              <Package size={20} />
              <div>
                <p className="body-small" style={{ color: 'var(--text-secondary)' }}>Order ID</p>
                <p className="body-regular" style={{ fontWeight: '700' }}>{orderId}</p>
              </div>
            </div>
          )}

          <div className="success-details">
            <h3 className="heading-3" style={{ marginBottom: '16px' }}>What's Next?</h3>
            <ul className="success-list">
              <li className="body-regular">You'll receive an order confirmation email shortly</li>
              <li className="body-regular">Your order will be dispatched within 1-2 business days</li>
              <li className="body-regular">Track your order status from your account</li>
              <li className="body-regular">Expected delivery: 5-7 business days</li>
            </ul>
          </div>

          <div className="success-actions">
            <Link to="/" className="btn-primary">
              Continue Shopping
              <ArrowRight size={16} />
            </Link>
            <Link to="/products" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;
