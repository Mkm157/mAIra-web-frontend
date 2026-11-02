import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  MessageSquare,
  ShieldCheck,
  Clock,
  Headphones,
  Database,
  Sparkles,
  KeyRound,
  ShieldAlert,
} from 'lucide-react';
import '../styles/landing.css';

export default function LandingPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('login');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('alex.mercer@maira.io');
  const [password, setPassword] = useState('••••••••••••');

  useEffect(() => {
    if (searchParams.get('tab') === 'register') {
      setActiveTab('register');
    } else {
      setActiveTab('login');
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/register/verify', { state: { email, mode: activeTab } });
  };

  return (
    <div className="landing-page">
      {/* Background ambient lighting */}
      <div className="landing-glow-1" />
      <div className="landing-glow-2" />

      {/* Navigation */}
      <header className="landing-nav">
        <Logo size="default" />
        <nav className="landing-nav-links">
          <a href="#home" className="landing-nav-link">Home</a>
          <a href="#features" className="landing-nav-link">Features</a>
          <a href="#how-it-works" className="landing-nav-link">How It Works</a>
          <a href="#security" className="landing-nav-link">Security</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="landing-hero" id="home">
        <div className="hero-left">
          <div className="hero-badge">
            <span className="status-dot blue" />
            Enterprise Intelligence Platform
          </div>

          <h1 className="hero-title">
            Your Organization's<br />
            <span className="gradient-text">AI Assistant</span>
          </h1>

          <h3 className="hero-subtitle">Ask. Explore. Get answers.</h3>

          <p className="hero-description">
            Empower teams to ask questions and receive reliable, verified answers synthesized directly from your organizational knowledge.
          </p>
        </div>

        {/* Right Auth Card */}
        <div className="hero-right">
          <div className="auth-hero-card">
            <h2 className="auth-card-title">
              {activeTab === 'login' ? 'Welcome Back' : 'Welcome'}
            </h2>
            <p className="auth-card-sub">
              {activeTab === 'login'
                ? 'Sign in using your credentials.'
                : 'Register to focus on actual productivity.'}
            </p>

            <div className="auth-select-label">SELECT</div>
            <div className="auth-tab-group">
              <button
                type="button"
                className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                onClick={() => setActiveTab('login')}
              >
                <KeyRound size={14} />
                Login
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
                onClick={() => setActiveTab('register')}
              >
                Register
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="auth-input-group">
                <div className="auth-input-header">
                  <label className="auth-label">Email</label>
                </div>
                <div className="auth-input-wrapper">
                  <Mail size={16} className="auth-input-icon" />
                  <input
                    type="email"
                    className="auth-input"
                    placeholder="Enter your corporate email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {activeTab === 'login' && (
                <div className="auth-input-group">
                  <div className="auth-input-header">
                    <label className="auth-label">Password</label>
                    <Link to="/forgot-password" className="auth-forgot-link">
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-input-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className="auth-input"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="auth-toggle-pwd"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              )}

              <button type="submit" className="btn-primary-gradient auth-submit-btn">
                <span>{activeTab === 'login' ? 'Log In' : 'Verify'}</span>
                <ArrowRight size={16} />
              </button>
            </form>

            <div className="auth-disclaimer">
              By continuing, I acknowledge that this tool provides verified responses based on organizational data. Refer to internal guidelines for data usage and responsible use.
            </div>
          </div>
        </div>
      </section>

      {/* WHAT IT CAN DO */}
      <section className="landing-section" id="features">
        <div className="section-header-centered">
          <span className="section-badge">CAPABILITIES</span>
          <h2 className="section-title">WHAT IT CAN DO</h2>
          <p className="section-subtitle">
            Purpose-built capabilities engineered for workplace intelligence, compliant instant retrieval, and enterprise collaboration.
          </p>
        </div>

        <div className="capabilities-grid">
          <div className="capability-card">
            <div className="card-icon-box" style={{ background: 'rgba(37, 99, 235, 0.15)', color: '#60A5FA' }}>
              <MessageSquare size={20} />
            </div>
            <h3 className="card-title">Conversational AI</h3>
            <p className="card-description">
              Natural language resolution interaction designed to conquer multi-turn dialog, follow-ups, and policy synthesis.
            </p>
          </div>

          <div className="capability-card">
            <div className="card-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}>
              <ShieldCheck size={20} />
            </div>
            <h3 className="card-title">Trusted Knowledge</h3>
            <p className="card-description">
              Answers verified and grounded strictly in authorized organizational knowledge bases, intranet data, and files.
            </p>
          </div>

          <div className="capability-card">
            <div className="card-icon-box" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#C084FC' }}>
              <Clock size={20} />
            </div>
            <h3 className="card-title">Context &amp; History</h3>
            <p className="card-description">
              Multi-session conversation context and thread continuity across project streams with zero knowledge leakage.
            </p>
          </div>

          <div className="capability-card">
            <div className="card-icon-box" style={{ background: 'rgba(37, 99, 235, 0.15)', color: '#60A5FA' }}>
              <Lock size={20} />
            </div>
            <h3 className="card-title">Security</h3>
            <p className="card-description">
              Enterprise-grade role-based access control protecting proprietary company data across all organizational tiers.
            </p>
          </div>

          <div className="capability-card">
            <div className="card-icon-box" style={{ background: 'rgba(6, 182, 212, 0.15)', color: '#38BDF8' }}>
              <Headphones size={20} />
            </div>
            <h3 className="card-title">Human Support</h3>
            <p className="card-description">
              Seamless workflows escalate to provide human-expert triage or subject-matter experts when queries require explicit manual attention.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="landing-section" id="how-it-works">
        <div className="section-header-centered">
          <span className="section-badge" style={{ color: '#34D399' }}>METHODOLOGY</span>
          <h2 className="section-title">HOW IT WORKS</h2>
          <p className="section-subtitle">
            A committed, transparent three-step intelligence loop designed for real-time clarity.
          </p>
        </div>

        <div className="how-it-works-grid">
          <div className="how-card">
            <div className="how-card-header">
              <span className="how-step-num">01</span>
              <MessageSquare size={22} color="#60A5FA" />
            </div>
            <h4 className="how-step-title">ASK</h4>
            <p className="card-description">
              The employee asks a question in natural language using standard workplace terminology.
            </p>
          </div>

          <div className="how-card">
            <div className="how-card-header">
              <span className="how-step-num">02</span>
              <Database size={22} color="#34D399" />
            </div>
            <h4 className="how-step-title" style={{ color: '#34D399' }}>RETRIEVE</h4>
            <p className="card-description">
              The system queries the indexed database and finds permissions-matched documents from unified sources.
            </p>
          </div>

          <div className="how-card">
            <div className="how-card-header">
              <span className="how-step-num">03</span>
              <Sparkles size={22} color="#C084FC" />
            </div>
            <h4 className="how-step-title" style={{ color: '#C084FC' }}>ANSWER</h4>
            <p className="card-description">
              The AI delivers a precise, citation-backed answer with direct links to the source documentation.
            </p>
          </div>
        </div>
      </section>

      {/* TRUST & SECURITY */}
      <section className="landing-section" id="security">
        <div className="section-header-centered">
          <span className="section-badge" style={{ color: '#A855F7' }}>COMPLIANCE &amp; CONTROL</span>
          <h2 className="section-title">TRUST &amp; SECURITY</h2>
          <p className="section-subtitle">
            Engineered specifically for controlled organizational use and audited data boundaries.
          </p>
        </div>

        <div className="trust-grid">
          <div className="trust-card">
            <div className="card-icon-box" style={{ background: 'rgba(37, 99, 235, 0.15)', color: '#60A5FA' }}>
              <ShieldCheck size={20} />
            </div>
            <h3 className="card-title">Approved Knowledge</h3>
            <p className="card-description">
              Strictly restricted retrieval access to authorized company documentation. No unauthorized public data or unapproved web scraping.
            </p>
          </div>

          <div className="trust-card">
            <div className="card-icon-box" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34D399' }}>
              <KeyRound size={20} />
            </div>
            <h3 className="card-title">Role-Based Access</h3>
            <p className="card-description">
              Tight integration with Active Directory and corporate permissions. Employees only access information authorized for their role.
            </p>
          </div>

          <div className="trust-card">
            <div className="card-icon-box" style={{ background: 'rgba(124, 58, 237, 0.15)', color: '#C084FC' }}>
              <Lock size={20} />
            </div>
            <h3 className="card-title">Privacy &amp; Security</h3>
            <p className="card-description">
              Enterprise data confidentiality with zero model training on proprietary queries. SOC 2 compliance standards and at-rest encryption.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
