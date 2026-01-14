import React, { useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Sparkles, Gift, Heart, ArrowRight } from 'lucide-react';
import './CampaignThankYouPage.css';

const CampaignThankYouPage = () => {
  const [searchParams] = useSearchParams();
  const discountCode = searchParams.get('code') || 'SKIN25NOW';

  useEffect(() => {
    // Confetti effect or celebration animation could go here
  }, []);

  return (
    <div className="campaign-thank-you-page">
      <div className="container section-padding">
        <div className="campaign-content">
          <div className="campaign-icon">
            <Sparkles size={64} color="var(--accent-warm)" />
          </div>

          <h1 className="hero-medium" style={{ marginTop: '24px', textAlign: 'center' }}>
            Thanks for Being Part of Our Journey! ✨
          </h1>

          <div className="campaign-message">
            <p className="body-large" style={{ textAlign: 'center', marginBottom: '32px' }}>
              <strong>This campaign is by our brand to see what you're excited about before we launch!</strong>
            </p>

            <div className="discount-code-box">
              <Gift size={32} color="var(--accent-warm)" />
              <div>
                <p className="body-regular" style={{ color: 'var(--text-secondary)' }}>
                  Your Exclusive Launch Discount Code
                </p>
                <h2 className="heading-1 discount-code">{discountCode}</h2>
                <p className="body-large" style={{ marginTop: '8px', color: 'var(--status-error)', fontWeight: '700' }}>
                  Get 25% OFF when we go live!
                </p>
              </div>
            </div>

            <div className="campaign-final-message">
              <Heart size={24} color="var(--accent-warm)" />
              <p className="body-large" style={{ textAlign: 'center' }}>
                Thanks for sticking with us — <strong>glowing skin is coming</strong>, and trust us, <strong>it's worth the wait.</strong> 💖
              </p>
            </div>
          </div>

          <div className="campaign-details">
            <h3 className="heading-2" style={{ textAlign: 'center', marginBottom: '24px' }}>
              What Happens Next?
            </h3>
            <div className="details-grid">
              <div className="detail-card">
                <span className="detail-number">1</span>
                <p className="body-regular">We'll email you when we launch</p>
              </div>
              <div className="detail-card">
                <span className="detail-number">2</span>
                <p className="body-regular">Use code <strong>{discountCode}</strong> for 25% off</p>
              </div>
              <div className="detail-card">
                <span className="detail-number">3</span>
                <p className="body-regular">Get your products delivered in 5-7 days</p>
              </div>
              <div className="detail-card">
                <span className="detail-number">4</span>
                <p className="body-regular">Start your journey to glowing skin!</p>
              </div>
            </div>
          </div>

          <div className="campaign-social">
            <p className="body-regular" style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
              Stay connected with us on Instagram
            </p>
            <div className="social-icons">
              <a 
                href="https://www.instagram.com/ve_proskin?igsh=MTVqNDcwd2syZzZycw%3D%3D&utm_source=qr" 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram-link"
              >
                📸 Follow @ve_proskin
              </a>
            </div>
          </div>

          <div className="campaign-actions">
            <Link to="/" className="btn-primary">
              Back to Home
              <ArrowRight size={16} />
            </Link>
            <Link to="/about" className="btn-secondary">
              Read Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignThankYouPage;
