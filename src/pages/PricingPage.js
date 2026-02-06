import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PricingPage.css';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const navigate = useNavigate();

  // Hardcoded pricing plans
  const plans = [
    {
      id: 1,
      name: 'FREE',
      price: 0,
      features: [
        'Basic subscription tracking',
        'Up to 5 subscriptions',
        'Email notifications',
        'Mobile app access',
        'Community support'
      ]
    },
    {
      id: 2,
      name: 'BASIC',
      price: 499, // ₹499 per month
      features: [
        'Up to 25 subscriptions',
        'Advanced analytics & insights',
        'Payment history tracking',
        'Priority email support',
        'Export data (CSV, PDF)',
        'Custom categories & tags',
        'Bill reminders',
        'Multi-currency support'
      ]
    },
    {
      id: 3,
      name: 'PREMIUM',
      price: 999, // ₹999 per month
      features: [
        'Unlimited subscriptions',
        'AI-powered spending insights',
        'Priority 24/7 support',
        'Advanced reporting & forecasting',
        'API access',
        'Custom integrations',
        'Team collaboration (up to 5 users)',
        'White-label options',
        'Dedicated account manager'
      ]
    }
  ];

  const handleSubscribe = (planName) => {
    alert(`You selected ${planName} plan! (Payment integration coming soon)`);
    // navigate('/dashboard');
  };

  const getYearlyPrice = (monthlyPrice) => {
    // 17% discount for yearly
    return Math.round(monthlyPrice * 12 * 0.83);
  };

  return (
    <div className="pricing-page">
      {/* Animated Background */}
      <div className="pricing-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>

      <div className="pricing-wrapper">
        {/* Header Section */}
        <header className="pricing-header">
          <div className="logo-container">
            <div className="logo">
              <span className="logo-icon">S</span>
              <span className="logo-text">SubHub</span>
            </div>
          </div>
          
          <h1 className="main-title">Choose Your Plan</h1>
          <p className="subtitle">Simple, transparent pricing for everyone</p>

          {/* Billing Toggle */}
          <div className="billing-toggle">
            <button 
              className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('monthly')}
            >
              Monthly
            </button>
            <button 
              className={`toggle-btn ${billingCycle === 'yearly' ? 'active' : ''}`}
              onClick={() => setBillingCycle('yearly')}
            >
              Yearly
              <span className="save-badge">Save 17%</span>
            </button>
          </div>
        </header>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan) => {
            const monthlyPrice = plan.price;
            const yearlyPrice = getYearlyPrice(monthlyPrice);
            const displayPrice = billingCycle === 'monthly' ? monthlyPrice : Math.round(yearlyPrice / 12);
            const totalYearlyPrice = yearlyPrice;
            const isPopular = plan.name === 'PREMIUM';
            
            return (
              <div 
                key={plan.id} 
                className={`pricing-card ${isPopular ? 'popular' : ''}`}
              >
                {isPopular && (
                  <div className="popular-badge">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 1l2.163 4.382L15 6.09l-3.5 3.409.826 4.818L8 12.236l-4.326 2.081.826-4.818L1 6.09l4.837-.708L8 1z"/>
                    </svg>
                    Most Popular
                  </div>
                )}

                <div className="card-header">
                  <h3 className="plan-title">{plan.name}</h3>
                  <div className="price-section">
                    {plan.price === 0 ? (
                      <div className="price">
                        <span className="amount">Free</span>
                      </div>
                    ) : (
                      <>
                        <div className="price">
                          <span className="currency">₹</span>
                          <span className="amount">{displayPrice.toLocaleString('en-IN')}</span>
                          <span className="period">/month</span>
                        </div>
                        {billingCycle === 'yearly' && (
                          <p className="billing-note">
                            ₹{totalYearlyPrice.toLocaleString('en-IN')} billed annually
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <button
                  className={`subscribe-btn ${isPopular ? 'primary' : 'secondary'}`}
                  onClick={() => handleSubscribe(plan.name)}
                >
                  {plan.price === 0 ? 'Get Started Free' : `Get ${plan.name} Plan`}
                </button>

                <div className="features-section">
                  <p className="features-heading">What's included:</p>
                  <ul className="features-list">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="feature-item">
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                          <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
                          <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <section className="faq-section">
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Can I change plans later?</h3>
              <p>Yes, you can upgrade or downgrade your plan at any time from your account settings.</p>
            </div>
            <div className="faq-item">
              <h3>Is there a free trial?</h3>
              <p>Yes, all paid plans come with a 14-day free trial. No credit card required.</p>
            </div>
            <div className="faq-item">
              <h3>What payment methods do you accept?</h3>
              <p>We accept all major credit cards, debit cards, UPI, and net banking.</p>
            </div>
            <div className="faq-item">
              <h3>Can I cancel anytime?</h3>
              <p>Yes, you can cancel your subscription at any time with no penalties or hidden fees.</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="pricing-footer">
          <button className="back-btn" onClick={() => navigate('/')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
            Back to Home
          </button>
        </footer>
      </div>
    </div>
  );
};

export default PricingPage;