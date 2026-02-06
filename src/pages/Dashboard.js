import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { subscriptionAPI } from '../services/api';
import { useAuth } from '../utils/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  const navigate = useNavigate();
  const { user, logout } = useAuth();

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      const response = await subscriptionAPI.getUserSubscription();
      setSubscription(response.data);
    } catch (err) {
      setError('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubscription = async () => {
    if (!window.confirm('Are you sure you want to cancel your subscription?')) {
      return;
    }

    setActionLoading(true);
    try {
      await subscriptionAPI.cancelSubscription();
      alert('Subscription cancelled successfully');
      fetchSubscription();
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to cancel subscription');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpgrade = () => {
    navigate('/pricing');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    const colors = {
      ACTIVE: '#4caf50',
      EXPIRED: '#f44336',
      CANCELLED: '#ff9800'
    };
    return colors[status] || '#666';
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="loading">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <h1>Welcome back, {user?.name || 'User'}!</h1>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Subscription Card */}
        <div className="subscription-card">
          <h2>Your Subscription</h2>
          
          {error && <div className="error-message">{error}</div>}

          {subscription ? (
            <div className="subscription-details">
              <div className="detail-row">
                <span className="label">Plan:</span>
                <span className="value plan-name">{subscription.planName}</span>
              </div>

              <div className="detail-row">
                <span className="label">Status:</span>
                <span 
                  className="value status-badge"
                  style={{ backgroundColor: getStatusColor(subscription.status) }}
                >
                  {subscription.status}
                </span>
              </div>

              <div className="detail-row">
                <span className="label">Start Date:</span>
                <span className="value">{formatDate(subscription.startDate)}</span>
              </div>

              <div className="detail-row">
                <span className="label">Expiry Date:</span>
                <span className="value">{formatDate(subscription.expiryDate)}</span>
              </div>

              <div className="detail-row">
                <span className="label">Auto Renewal:</span>
                <span className="value">
                  {subscription.autoRenewal ? '✓ Enabled' : '✗ Disabled'}
                </span>
              </div>

              <div className="action-buttons">
                {subscription.status === 'ACTIVE' && (
                  <>
                    <button 
                      className="btn-upgrade"
                      onClick={handleUpgrade}
                    >
                      Upgrade Plan
                    </button>
                    <button 
                      className="btn-cancel"
                      onClick={handleCancelSubscription}
                      disabled={actionLoading}
                    >
                      {actionLoading ? 'Processing...' : 'Cancel Subscription'}
                    </button>
                  </>
                )}

                {subscription.status !== 'ACTIVE' && (
                  <button 
                    className="btn-renew"
                    onClick={handleUpgrade}
                  >
                    Renew Subscription
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="no-subscription">
              <p>You don't have an active subscription</p>
              <button 
                className="btn-subscribe"
                onClick={() => navigate('/pricing')}
              >
                View Plans
              </button>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-info">
              <h3>Projects</h3>
              <p className="stat-value">12</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📁</div>
            <div className="stat-info">
              <h3>Storage Used</h3>
              <p className="stat-value">3.2 GB</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-info">
              <h3>Team Members</h3>
              <p className="stat-value">5</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
