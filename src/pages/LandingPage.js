import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: '⚡',
      title: 'Lightning Fast',
      description: 'Experience blazing fast subscription management with optimized performance',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      icon: '🔒',
      title: 'Bank-Level Security',
      description: 'Enterprise-grade encryption to keep your subscription data safe and private',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      icon: '📊',
      title: 'Smart Analytics',
      description: 'Get AI-powered insights and recommendations to optimize your spending',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      icon: '💳',
      title: 'Unified Billing',
      description: 'Automated payment tracking and reconciliation made effortless',
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      icon: '🎯',
      title: 'Smart Reminders',
      description: 'Never miss a renewal with intelligent notifications and alerts',
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      icon: '🚀',
      title: 'Infinite Scale',
      description: 'Grow your business without limits - from startup to enterprise',
      gradient: 'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Active Users' },
    { number: '₹50Cr+', label: 'Tracked Monthly' },
    { number: '99.9%', label: 'Uptime' },
    { number: '24/7', label: 'Support' }
  ];

  const testimonials = [
    {
      quote: "SubHub saved us over ₹2L annually by identifying unused subscriptions. It's a game-changer!",
      author: "Rahul Sharma",
      role: "CEO, TechStart India",
      avatar: "👨‍💼"
    },
    {
      quote: "The analytics and insights are incredible. We finally have visibility into our SaaS spending.",
      author: "Priya Desai",
      role: "CFO, Digital Wave",
      avatar: "👩‍💼"
    },
    {
      quote: "Best investment we made. The ROI was visible within the first month itself.",
      author: "Amit Patel",
      role: "Founder, CloudNine",
      avatar: "👨‍💻"
    }
  ];

  return (
    <div className="landing-page-premium">
      {/* Navigation */}
      <nav className={`navbar-premium ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container-premium">
          <div className="logo-section-premium">
            <div className="logo-icon-premium">S</div>
            <span className="logo-text-premium">SubHub</span>
          </div>
          <div className="nav-links-premium">
            <a href="#home">Home</a>
            <a href="#features">Features</a>
            <a href="#pricing" onClick={(e) => { e.preventDefault(); navigate('/pricing'); }}>Pricing</a>
            <a href="#testimonials">Testimonials</a>
          </div>
          <div className="nav-actions-premium">
            <button className="nav-login-btn-premium" onClick={() => navigate('/login')}>
              Sign In
            </button>
            <button className="nav-cta-btn-premium" onClick={() => navigate('/login')}>
              Start Free Trial
              <span className="arrow">→</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-premium">
        <div className="hero-glow"></div>
        <div className="hero-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
        
        <div className="hero-content-premium">
          <div className="hero-text-premium">
            <div className="hero-badge">
              <span className="badge-icon">✨</span>
              #1 Subscription Management Platform in India
            </div>
            
            <h1 className="hero-title-premium">
              Elevate Your <br/>
              <span className="gradient-text-premium">Subscription</span><br />
              Management <br/>
              with SubHub
            </h1>
            
            <p className="hero-subtitle-premium">
              Streamline, optimize, and scale your subscription management with our 
              powerful AI-driven SaaS platform. Join 10,000+ companies managing their 
              subscriptions effortlessly and saving millions.
            </p>
            
            <div className="hero-buttons-premium">
              <button className="btn-primary-premium" onClick={() => navigate('/login')}>
                <span>Start 14-Day Free Trial</span>
                <span className="btn-arrow">→</span>
              </button>
              <button className="btn-secondary-premium" onClick={() => navigate('/pricing')}>
                <span className="btn-icon">💰</span>
                View Pricing
              </button>
            </div>

            <div className="hero-trust-premium">
              <p className="trust-text">Trusted by leading companies</p>
              <div className="trust-badges">
                <span className="badge">🏆 SOC 2 Certified</span>
                <span className="badge">🔒 ISO 27001</span>
                <span className="badge">✓ GDPR Compliant</span>
              </div>
            </div>
          </div>

          {/* Premium Dashboard Mockup */}
          <div className="dashboard-mockup-premium">
            <div className="mockup-glow"></div>
            <div className="dashboard-window-premium">
              <div className="window-titlebar">
                <div className="titlebar-buttons">
                  <span className="btn-close"></span>
                  <span className="btn-minimize"></span>
                  <span className="btn-maximize"></span>
                </div>
                <span className="window-title-text">SubHub Dashboard</span>
              </div>
              
              <div className="dashboard-layout">
                <div className="dashboard-sidebar-premium">
                  <div className="sidebar-section">
                    <div className="sidebar-item-premium active">
                      <span className="item-icon">📊</span>
                      <span className="item-text">Overview</span>
                    </div>
                    <div className="sidebar-item-premium">
                      <span className="item-icon">📦</span>
                      <span className="item-text">Subscriptions</span>
                    </div>
                    <div className="sidebar-item-premium">
                      <span className="item-icon">💳</span>
                      <span className="item-text">Billing</span>
                    </div>
                    <div className="sidebar-item-premium">
                      <span className="item-icon">📈</span>
                      <span className="item-text">Analytics</span>
                    </div>
                    <div className="sidebar-item-premium">
                      <span className="item-icon">⚙️</span>
                      <span className="item-text">Settings</span>
                    </div>
                  </div>
                </div>

                <div className="dashboard-main-premium">
                  <div className="dashboard-header-premium">
                    <div>
                      <h2 className="dashboard-welcome">Welcome back, Abhishek</h2>
                      <p className="dashboard-subtitle">Here's what's happening with your subscriptions today.</p>
                    </div>
                  </div>

                  <div className="metrics-grid-premium">
                    <div className="metric-card-premium">
                      <div className="metric-header">
                        <span className="metric-icon">📦</span>
                        <span className="metric-trend positive">+12%</span>
                      </div>
                      <div className="metric-value-premium">₹12,426</div>
                      <div className="metric-label-premium">Monthly Revenue</div>
                    </div>
                    <div className="metric-card-premium">
                      <div className="metric-header">
                        <span className="metric-icon">👥</span>
                        <span className="metric-trend positive">+8%</span>
                      </div>
                      <div className="metric-value-premium">1,247</div>
                      <div className="metric-label-premium">Active Users</div>
                    </div>
                    <div className="metric-card-premium">
                      <div className="metric-header">
                        <span className="metric-icon">⚡</span>
                        <span className="metric-trend negative">-3%</span>
                      </div>
                      <div className="metric-value-premium">89</div>
                      <div className="metric-label-premium">Churn Rate</div>
                    </div>
                  </div>

                  <div className="chart-section-premium">
                    <div className="chart-header">
                      <h3>Revenue Overview</h3>
                      <div className="chart-tabs">
                        <span className="tab active">Week</span>
                        <span className="tab">Month</span>
                        <span className="tab">Year</span>
                      </div>
                    </div>
                    <div className="chart-container-premium">
                      <div className="chart-bars-premium">
                        <div className="bar-premium" style={{height: '45%'}}></div>
                        <div className="bar-premium" style={{height: '65%'}}></div>
                        <div className="bar-premium" style={{height: '55%'}}></div>
                        <div className="bar-premium" style={{height: '80%'}}></div>
                        <div className="bar-premium" style={{height: '70%'}}></div>
                        <div className="bar-premium" style={{height: '90%'}}></div>
                        <div className="bar-premium" style={{height: '75%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section-premium">
        <div className="stats-container-premium">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item-premium">
              <div className="stat-number-premium">{stat.number}</div>
              <div className="stat-label-premium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features-premium" id="features">
        <div className="features-container-premium">
          <div className="section-header-premium">
            <span className="section-badge">FEATURES</span>
            <h2 className="section-title-premium">Everything you need.<br/>Nothing you don't.</h2>
            <p className="section-description">
              Powerful features designed to make subscription management effortless
            </p>
          </div>
          
          <div className="features-grid-premium">
            {features.map((feature, index) => (
              <div key={index} className="feature-card-premium" style={{'--card-gradient': feature.gradient}}>
                <div className="feature-icon-premium">{feature.icon}</div>
                <h3 className="feature-title-premium">{feature.title}</h3>
                <p className="feature-desc-premium">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section-premium" id="testimonials">
        <div className="testimonials-container-premium">
          <div className="section-header-premium">
            <span className="section-badge">TESTIMONIALS</span>
            <h2 className="section-title-premium">Loved by thousands<br/>of companies</h2>
          </div>
          
          <div className="testimonials-grid-premium">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card-premium">
                <div className="quote-icon">"</div>
                <p className="testimonial-quote">{testimonial.quote}</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{testimonial.avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonial.author}</div>
                    <div className="author-role">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-premium">
        <div className="cta-glow"></div>
        <div className="cta-content-premium">
          <h2 className="cta-title">Ready to Transform Your<br/>Subscription Management?</h2>
          <p className="cta-subtitle">Join 10,000+ companies saving time and money with SubHub</p>
          <div className="cta-buttons">
            <button className="cta-button-premium" onClick={() => navigate('/login')}>
              Start Your 14-Day Free Trial
              <span className="btn-arrow">→</span>
            </button>
            <p className="cta-note">No credit card required • Cancel anytime • 24/7 support</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-premium">
        <div className="footer-container-premium">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <div className="logo-icon-premium">S</div>
                <span className="logo-text-premium">SubHub</span>
              </div>
              <p className="footer-description">
                The all-in-one platform trusted by thousands of companies to streamline 
                subscription management and reduce costs.
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Twitter">𝕏</a>
                <a href="#" className="social-link" aria-label="LinkedIn">in</a>
                <a href="#" className="social-link" aria-label="Facebook">f</a>
                <a href="#" className="social-link" aria-label="Instagram">ig</a>
              </div>
            </div>

            <div className="footer-links-group">
              <h4 className="footer-heading">Product</h4>
              <a href="#features" className="footer-link">Features</a>
              <a href="#pricing" onClick={(e) => { e.preventDefault(); navigate('/pricing'); }} className="footer-link">Pricing</a>
              <a href="#" className="footer-link">Integrations</a>
              <a href="#" className="footer-link">API</a>
            </div>

            <div className="footer-links-group">
              <h4 className="footer-heading">Company</h4>
              <a href="#" className="footer-link">About</a>
              <a href="#" className="footer-link">Blog</a>
              <a href="#" className="footer-link">Careers</a>
              <a href="#" className="footer-link">Contact</a>
            </div>

            <div className="footer-links-group">
              <h4 className="footer-heading">Resources</h4>
              <a href="#" className="footer-link">Help Center</a>
              <a href="#" className="footer-link">Community</a>
              <a href="#" className="footer-link">Status</a>
              <a href="#" className="footer-link">Changelog</a>
            </div>

            <div className="footer-links-group">
              <h4 className="footer-heading">Legal</h4>
              <a href="#" className="footer-link">Privacy</a>
              <a href="#" className="footer-link">Terms</a>
              <a href="#" className="footer-link">Security</a>
              <a href="#" className="footer-link">Compliance</a>
            </div>
          </div>

          <div className="footer-bottom-premium">
            <p className="footer-copyright">© 2024 SubHub. All rights reserved.</p>
            <div className="footer-badges">
              <span className="footer-badge-premium">🔒 Enterprise Security</span>
              <span className="footer-badge-premium">✓ SOC 2 Type II</span>
              <span className="footer-badge-premium">🇮🇳 Made in India</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;