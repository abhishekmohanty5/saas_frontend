import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
  {
    icon: '⚡',
    title: 'Fast Setup',
    description: 'Launch your subscription system in minutes, not days'
  },
  {
    icon: '🔒',
    title: 'Secure Payments',
    description: 'Industry-standard security for payments and user data'
  },
  {
    icon: '📊',
    title: 'Real-time Analytics',
    description: 'Track revenue, users, and growth with live insights'
  },
  {
    icon: '🎯',
    title: 'Scalable Architecture',
    description: 'Built to grow with startups and enterprises alike'
  }
];


  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">
               Elevate Your <span className="brand">Business</span><br />
               With Smart SaaS Solutions
           </h1>
        <p className="hero-subtitle">
           Streamline, optimize, and scale your subscriptions with a modern,
            secure, and powerful SaaS platform.
        </p>

          <div className="hero-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/pricing')}
            >
              Start Free Trial
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="dashboard-preview">
         <div className="dashboard-card">
           <p className="dashboard-title">Welcome back, Abhishek</p>
               <div className="dashboard-mock">
                 <div className="dashboard-row"></div>
                 <div className="dashboard-row"></div>
                 <div className="dashboard-row small"></div>
                 <div className="dashboard-row tiny"></div>
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
