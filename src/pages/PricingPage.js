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
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setSubscribing(planId);
    try {
      await subscriptionAPI.subscribe(planId);
      alert('Subscription successful!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Subscription failed');
    } finally {
      setSubscribing(null);
    }
  };

  const getPlanFeatures = (planName) => {
    const features = {
      FREE: [
        'Basic features access',
        '5 projects limit',
        'Community support',
        '1 GB storage'
      ],
      BASIC: [
        'All FREE features',
        '25 projects limit',
        'Email support',
        '10 GB storage',
        'Basic analytics'
      ],
      PREMIUM: [
        'All BASIC features',
        'Unlimited projects',
        'Priority 24/7 support',
        '100 GB storage',
        'Advanced analytics',
        'Custom integrations',
        'API access'
      ]
    };
    return features[planName] || [];
  };

  if (loading) {
    return (
      <div className="pricing-page">
        <div className="loading">Loading plans...</div>
      </div>
    );
  }

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Select the perfect plan for your needs</p>
      </div>

      {error && <div className="error-banner">{error}</div>}

      <div className="pricing-container">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`pricing-card ${plan.name === 'PREMIUM' ? 'featured' : ''}`}
          >
            {plan.name === 'PREMIUM' && (
              <div className="popular-badge">Most Popular</div>
            )}
            
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="currency">$</span>
                <span className="amount">{plan.price}</span>
                <span className="period">/{plan.duration} days</span>
              </div>
            </div>

            <ul className="features-list">
              {getPlanFeatures(plan.name).map((feature, index) => (
                <li key={index}>
                  <span className="check">✓</span>
                  {feature}
                </li>
              ))}
            </ul>

            <button
              className={`subscribe-btn ${plan.name === 'PREMIUM' ? 'premium' : ''}`}
              onClick={() => handleSubscribe(plan.id)}
              disabled={subscribing === plan.id}
            >
              {subscribing === plan.id ? 'Processing...' : 
               plan.name === 'FREE' ? 'Get Started' : 'Subscribe Now'}
            </button>
          </div>
        ))}
      </div>

      <div className="pricing-footer">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default PricingPage;
