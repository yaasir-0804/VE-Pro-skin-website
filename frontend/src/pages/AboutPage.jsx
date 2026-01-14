import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <h1 className="hero-medium">Our Story</h1>
            <p className="body-large" style={{ marginTop: '16px', maxWidth: '700px' }}>
              This brand was not created in a boardroom.<br />
              It was born in front of a mirror.
            </p>
          </div>
        </div>
      </section>

      {/* Story Content */}
      <section className="section-padding-small">
        <div className="container">
          <div className="story-content">
            <div className="story-section">
              <p className="body-large">
                Like millions of young Indians, our founder struggled with <strong>acne, uneven skin tone, oiliness, dryness, and damaged skin barrier</strong> — all at the same time. One product would dry the skin. Another would break it out. Every label promised results, but very few delivered.
              </p>
              <p className="body-large">
                Dermatologist visits became routine. So did expensive creams, chemical peels, and frustration.
              </p>
              <p className="body-large">
                What hurt most wasn't just the skin — it was the <strong>confidence</strong>.
              </p>
              <p className="body-large">
                Photos were avoided. Social events were skipped. Makeup was used not to look better, but to hide.
              </p>
              <p className="body-large">
                And one question kept coming back:
              </p>
              <blockquote className="story-quote">
                "Why is it so hard to find skincare that actually works for Indian skin?"
              </blockquote>
            </div>

            <div className="story-divider"></div>

            <div className="story-section">
              <h2 className="heading-1">The Problem We Saw</h2>
              <p className="body-large">
                Most skincare in India falls into two extremes:
              </p>
              <ul className="story-list">
                <li className="body-regular"><strong>Cheap products</strong> full of irritants and fillers</li>
                <li className="body-regular"><strong>Expensive imported brands</strong> not designed for Indian climate, oil levels, or acne-prone skin</li>
              </ul>
              <p className="body-large">
                There was <strong>no honest middle</strong> — no brand that combined:
              </p>
              <ul className="story-list">
                <li className="body-regular">Clinical-grade ingredients</li>
                <li className="body-regular">Gentle, barrier-safe formulas</li>
                <li className="body-regular">And prices that young people could afford</li>
              </ul>
              <p className="body-large">
                So we decided to build it.
              </p>
            </div>

            <div className="story-divider"></div>

            <div className="story-section">
              <h2 className="heading-1">The Birth of the Brand</h2>
              <p className="body-large">
                Our founder went back to science.
              </p>
              <p className="body-large">
                They studied <strong>dermatology, cosmetic chemistry, ingredient research, and formulation data</strong>. Every active ingredient was evaluated not by hype, but by <strong>clinical performance</strong>. Every formula was built around one idea:
              </p>
              <blockquote className="story-quote">
                Healthy skin starts with a strong barrier and balanced microbiome.
              </blockquote>
              <p className="body-large">
                Not harsh stripping.<br />
                Not temporary glow.<br />
                But real, long-term skin health.
              </p>
              <p className="body-large">
                Dozens of formulations were tested.<br />
                Every ingredient was chosen for:
              </p>
              <ul className="story-list checkmark">
                <li className="body-regular">Effectiveness</li>
                <li className="body-regular">Safety</li>
                <li className="body-regular">Suitability for Indian skin</li>
                <li className="body-regular">Real visible results</li>
              </ul>
            </div>

            <div className="story-divider"></div>

            <div className="story-section">
              <h2 className="heading-1">What We Stand For</h2>
              <p className="body-large">
                This brand is built on three pillars:
              </p>

              <div className="pillars-grid">
                <div className="pillar-card">
                  <h3 className="heading-3">1️⃣ Clinical Honesty</h3>
                  <p className="body-regular" style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
                    We don't believe in miracle creams. We believe in <strong>science, data, and dermatology-backed ingredients</strong> that actually work.
                  </p>
                </div>

                <div className="pillar-card">
                  <h3 className="heading-3">2️⃣ Skin Barrier First</h3>
                  <p className="body-regular" style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
                    Acne, pigmentation, sensitivity, dryness — all of it starts with a damaged skin barrier. Every formula we make <strong>repairs, protects, and strengthens your skin</strong>.
                  </p>
                </div>

                <div className="pillar-card">
                  <h3 className="heading-3">3️⃣ Luxury Without the Lie</h3>
                  <p className="body-regular" style={{ marginTop: '12px', color: 'var(--text-secondary)' }}>
                    You should not have to pay ₹3000 for good skincare. We use <strong>the same quality ingredients as luxury brands</strong> — without the inflated price.
                  </p>
                </div>
              </div>
            </div>

            <div className="story-divider"></div>

            <div className="story-section">
              <h2 className="heading-1">Why We Exist</h2>
              <p className="body-large">
                This brand exists for:
              </p>
              <ul className="story-list">
                <li className="body-regular">Teenagers fighting acne</li>
                <li className="body-regular">Students struggling with dull, stressed skin</li>
                <li className="body-regular">Young adults dealing with pigmentation, oil, and breakouts</li>
                <li className="body-regular">Anyone who wants skin they feel proud of</li>
              </ul>
              <p className="body-large">
                We are not here to sell hope.<br />
                We are here to deliver <strong>visible, science-backed results.</strong>
              </p>
            </div>

            <div className="story-divider"></div>

            <div className="story-section">
              <h2 className="heading-1">Our Promise</h2>
              <p className="body-large">
                We promise skincare that is:
              </p>
              <ul className="story-list checkmark">
                <li className="body-regular">Dermatologist tested</li>
                <li className="body-regular">Cruelty-free</li>
                <li className="body-regular">Clean & safe</li>
                <li className="body-regular">Designed for Indian skin</li>
                <li className="body-regular">And actually works</li>
              </ul>
              <p className="body-large final-message">
                This is not just skincare.<br />
                This is <strong>confidence in a bottle.</strong>
              </p>
            </div>

            {/* CTA Section */}
            <div className="about-cta">
              <h2 className="heading-2">Ready to Transform Your Skin?</h2>
              <p className="body-regular" style={{ marginTop: '16px', color: 'var(--text-secondary)' }}>
                Discover products that actually work for your skin type
              </p>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/quiz" className="btn-primary">
                  Take Skin Quiz
                  <ArrowRight size={16} />
                </Link>
                <Link to="/products" className="btn-primary">
                  Shop Now
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
