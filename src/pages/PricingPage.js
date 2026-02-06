import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptionAPI } from '../services/api';
import { useAuth } from '../utils/AuthContext';
import './PricingPage.css';

const PricingPage = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subscribing, setSubscribing] = useState(null);
  const [error, setError] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly or yearly
  const [planTier, setPlanTier] = useState('individual'); // individual or team
  
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await subscriptionAPI.getAllPlans();
      setPlans(response.data);
    } catch (err) {
      setError('Failed to load pricing plans');
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId, planName) => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    setSubscribing(planId);
    try {
      await subscriptionAPI.subscribe(planId);
      // Show success message
      alert(`Successfully subscribed to ${planName} plan!`);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Subscription failed. Please try again.');
    } finally {
      setSubscribing(null);
    }
  };

  const getPlanFeatures = (planName) => {
    const features = {
      FREE: {
        title: 'Everything in Free:',
        items: [
          'Basic subscription tracking',
          'Up to 5 subscriptions',
          'Email notifications',
          'Mobile app access',
          'Community support',
          'Basic analytics dashboard'
        ]
      },
      BASIC: {
        title: 'Everything in Free and:',
        items: [
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
      PREMIUM: {
        title: 'Everything in Basic, plus:',
        items: [
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
    };
    return features[planName] || { title: '', items: [] };
  };

  const getPlanDescription = (planName) => {
    const descriptions = {
      FREE: 'Get started with basics',
      BASIC: 'Track and manage subscriptions',
      PREMIUM: 'Higher limits, priority access'
    };
    return descriptions[planName] || '';
  };

  const getPlanIcon = (planName) => {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <circle cx="32" cy="16" r="4" stroke="currentColor" strokeWidth="2"/>
        <line x1="32" y1="20" x2="32" y2="48" stroke="currentColor" strokeWidth="2"/>
        <circle cx="24" cy="28" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="40" cy="28" r="3" stroke="currentColor" strokeWidth="2"/>
        <line x1="32" y1="28" x2="27" y2="28" stroke="currentColor" strokeWidth="2"/>
        <line x1="32" y1="28" x2="37" y2="28" stroke="currentColor" strokeWidth="2"/>
        {planName === 'PREMIUM' && (
          <>
            <circle cx="20" cy="40" r="3" stroke="currentColor" strokeWidth="2"/>
            <circle cx="44" cy="40" r="3" stroke="currentColor" strokeWidth="2"/>
            <line x1="32" y1="40" x2="23" y2="40" stroke="currentColor" strokeWidth="2"/>
            <line x1="32" y1="40" x2="41" y2="40" stroke="currentColor" strokeWidth="2"/>
          </>
        )}
      </svg>
    );
  };

  // Convert price to rupees (assuming 1 USD = 83 INR approximately)
  const convertToRupees = (price) => {
    return Math.round(price * 83);
  };

  if (loading) {
    return (
      <div className="pricing-page">
        <div className="pricing-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading pricing plans...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pricing-page">
      {/* Animated Background */}
      <div className="pricing-background">
        <div className="floating-shape shape-1"></div>
        <div className="floating-shape shape-2"></div>
        <div className="floating-shape shape-3"></div>
      </div>

      <div className="pricing-content">
        {/* Header */}
        <div className="pricing-header">
          <div className="logo-section">
            <div className="logo-box">
              <div className="logo-icon">S</div>
              <div className="logo-text">SubHub</div>
            </div>
          </div>
          
          <h1 className="pricing-title">See what's included</h1>

          {/* Plan Tier Toggle */}
          <div className="plan-tier-toggle">
            <button 
              className={planTier === 'individual' ? 'active' : ''}
              onClick={() => setPlanTier('individual')}
            >
              Individual
            </button>
            <button 
              className={planTier === 'team' ? 'active' : ''}
              onClick={() => setPlanTier('team')}
            >
              Team and Enterprise
            </button>
          </div>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="error-banner">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            {error}
          </div>
        )}

        {/* Pricing Cards */}
        <div className="pricing-container">
          {plans.filter(plan => plan.name !== 'FREE').map((plan) => {
            const isPopular = plan.name === 'PREMIUM';
            const features = getPlanFeatures(plan.name);
            const priceInRupees = convertToRupees(plan.price);
            const monthlyPrice = billingCycle === 'yearly' ? Math.round(priceInRupees / 12) : priceInRupees;
            
            return (
              <div 
                key={plan.id} 
                className={`pricing-card-new ${isPopular ? 'featured' : ''}`}
              >
                {/* Billing Cycle Toggle - Inside Card */}
                <div className="card-billing-toggle">
                  <button 
                    className={billingCycle === 'monthly' ? 'active' : ''}
                    onClick={() => setBillingCycle('monthly')}
                  >
                    Monthly
                  </button>
                  <button 
                    className={billingCycle === 'yearly' ? 'active' : ''}
                    onClick={() => setBillingCycle('yearly')}
                  >
                    Yearly
                    <span className="save-badge-inline">· Save 17%</span>
                  </button>
                </div>

                {/* Plan Icon */}
                <div className="plan-icon-new">
                  {getPlanIcon(plan.name)}
                </div>

                {/* Plan Name and Description */}
                <div className="plan-info">
                  <h2 className="plan-name">{plan.name === 'BASIC' ? 'Pro' : 'Max'}</h2>
                  <p className="plan-desc">{getPlanDescription(plan.name)}</p>
                </div>

                {/* Price */}
                <div className="price-display">
                  {plan.name === 'PREMIUM' && <span className="from-text">From </span>}
                  <span className="rupee-symbol">₹</span>
                  <span className="price-amount">{monthlyPrice}</span>
                  <span className="price-period">
                    / month {billingCycle === 'yearly' ? 'billed annually' : 'billed monthly'}
                  </span>
                </div>

                {/* CTA Button */}
                <button
                  className="get-plan-btn"
                  onClick={() => handleSubscribe(plan.id, plan.name)}
                  disabled={subscribing === plan.id}
                >
                  {subscribing === plan.id ? (
                    <>
                      <span className="btn-spinner"></span>
                      Processing...
                    </>
                  ) : (
                    `Get ${plan.name === 'BASIC' ? 'Pro' : 'Max'} plan`
                  )}
                </button>

                {/* Features List */}
                <div className="features-section">
                  <h3 className="features-title">{features.title}</h3>
                  <ul className="features-list-new">
                    {features.items.map((feature, index) => (
                      <li key={index}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.3333 4L6 11.3333L2.66667 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-grid">
            <div className="faq-item">
              <h4>Can I change plans later?</h4>
              <p>Yes, you can upgrade or downgrade your plan at any time.</p>
            </div>
            <div className="faq-item">
              <h4>Is there a free trial?</h4>
              <p>Yes, all paid plans come with a 14-day free trial.</p>
            </div>
            <div className="faq-item">
              <h4>What payment methods do you accept?</h4>
              <p>We accept all major credit cards and PayPal.</p>
            </div>
            <div className="faq-item">
              <h4>Can I cancel anytime?</h4>
              <p>Yes, you can cancel your subscription at any time with no penalties.</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pricing-footer">
          <button className="back-home-btn" onClick={() => navigate('/')}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
            </svg>
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PricingPage;
