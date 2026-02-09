import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';
import { publicAPI, subscriptionAPI } from '../services/api';
import './PricingPage.css';

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [subscribingPlanId, setSubscribingPlanId] = useState(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await publicAPI.getAllPlans();
      
      if (response.data && response.data.data) {
        // Map backend data to match frontend structure
        const backendPlans = response.data.data.map(plan => ({
          id: plan.id,
          name: plan.name,
          price: parseFloat(plan.price),
          durationInDays: plan.durationInDays,
          active: plan.active,
          features: plan.features || [] // Will be empty for now
        }));
        setPlans(backendPlans);
      } else {
        setPlans([]);
      }
    } catch (err) {
      console.error('Error fetching plans:', err);
      setError(err.response?.data?.message || 'Failed to load plans. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId, planName) => {
    if (!user) {
      alert('Please login first to subscribe to a plan');
      navigate('/auth');
      return;
    }

    try {
      setSubscribingPlanId(planId);
      setError('');
      
      const response = await subscriptionAPI.subscribe(planId);
      alert(response.data?.message || `Successfully subscribed to ${planName} plan!`);
      navigate('/dashboard');
    } catch (err) {
      console.error('Subscription error:', err);
      const errorMessage = err.response?.data?.message || 'Failed to subscribe. Please try again.';
      alert(errorMessage);
      setError(errorMessage);
    } finally {
      setSubscribingPlanId(null);
    }
  };

  const getYearlyPrice = (monthlyPrice) => {
    // 17% discount for yearly
    return Math.round(monthlyPrice * 12 * 0.83);
  };

  if (loading) {
    return (
      <div className="pricing-page">
        <div className="pricing-wrapper">
          <div style={{ textAlign: 'center', padding: '100px 20px', fontSize: '20px' }}>
            Loading plans...
          </div>
        </div>
      </div>
    );
  }

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

        {/* Error Message */}
        {error && (
          <div style={{ 
            backgroundColor: '#fee', 
            border: '1px solid #fcc', 
            color: '#c33', 
            padding: '15px', 
            borderRadius: '8px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.length === 0 ? (
            <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '50px', color: '#666' }}>
              No plans available at the moment.
            </div>
          ) : (
            plans.map((plan) => {
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
                    className={`subscribe-btn ${isPopular ? 'primary' : 'secondary'} ${!plan.active ? 'disabled' : ''} ${subscribingPlanId === plan.id ? 'loading' : ''}`}
                    onClick={() => handleSubscribe(plan.id, plan.name)}
                    disabled={!plan.active || subscribingPlanId === plan.id}
                  >
                    {subscribingPlanId === plan.id 
                      ? 'Processing...' 
                      : plan.price === 0 
                        ? 'Get Started Free' 
                        : `Get ${plan.name} Plan`
                    }
                  </button>

                  <div className="features-section">
                    <p className="features-heading">What's included:</p>
                    <ul className="features-list">
                      {plan.features && plan.features.length > 0 ? (
                        plan.features.map((feature, index) => (
                          <li key={index} className="feature-item">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                              <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
                              <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))
                      ) : (
                        <li className="feature-item">
                          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.2"/>
                            <path d="M6 10l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          <span>Duration: {plan.durationInDays} days</span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })
          )}
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