import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Experience blazing fast performance with our optimized infrastructure'
    },
    {
      icon: '🔒',
      title: 'Secure & Reliable',
      description: 'Enterprise-grade security to keep your data safe'
    },
    {
      icon: '📊',
      title: 'Advanced Analytics',
      description: 'Get insights with powerful analytics and reporting tools'
    },
    {
      icon: '🎯',
      title: 'Easy to Use',
      description: 'Intuitive interface designed for seamless user experience'
    }
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to <span className="brand">SaaS Platform</span>
          </h1>
          <p className="hero-subtitle">
            Streamline your workflow with our powerful subscription management platform
          </p>
          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/pricing')}
            >
              Get Started
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2 className="section-title">Why Choose Us?</h2>
        <div className="features-grid">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers today</p>
        <button 
          className="btn btn-large"
          onClick={() => navigate('/pricing')}
        >
          View Pricing Plans
        </button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 SaaS Platform. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
