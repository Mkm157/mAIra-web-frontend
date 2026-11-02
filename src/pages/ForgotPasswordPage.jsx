import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthCard from '../components/auth/AuthCard';
import { Mail, Smartphone, ArrowRight, ArrowLeft } from 'lucide-react';
import '../styles/auth.css';

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('email');

  const handleSendCode = (e) => {
    e.preventDefault();
    navigate('/recovery/verify-code');
  };

  return (
    <AuthCard
      showLogo={true}
      maxWidth="440px"
      footer={
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
          <a href="#privacy" style={{ color: '#94A3B8' }}>Privacy</a>
          <span>•</span>
          <a href="#terms" style={{ color: '#94A3B8' }}>Terms</a>
          <span>•</span>
          <span>© 2025 mAIra. All rights reserved.</span>
        </div>
      }
    >
      <div style={{ textAlign: 'center', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '8px' }}>
          Forgot your password?
        </h2>
        <p style={{ fontSize: '0.84rem', color: '#94A3B8', lineHeight: 1.5 }}>
          Choose how you want to receive your password<br />
          recovery code.
        </p>
      </div>

      <form onSubmit={handleSendCode}>
        <div
          className={`recovery-method-card ${selectedMethod === 'email' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('email')}
        >
          <div className="method-card-left">
            <div className="method-icon-box">
              <Mail size={18} />
            </div>
            <div>
              <div className="method-info-title">Email</div>
              <div className="method-info-val">k*****@gmail.com</div>
            </div>
          </div>
          <div className="method-radio-dot">
            {selectedMethod === 'email' && <div className="method-radio-inner" />}
          </div>
        </div>

        <div
          className={`recovery-method-card ${selectedMethod === 'sms' ? 'selected' : ''}`}
          onClick={() => setSelectedMethod('sms')}
        >
          <div className="method-card-left">
            <div className="method-icon-box">
              <Smartphone size={18} />
            </div>
            <div>
              <div className="method-info-title">SMS</div>
              <div className="method-info-val">+91 ********1234</div>
            </div>
          </div>
          <div className="method-radio-dot">
            {selectedMethod === 'sms' && <div className="method-radio-inner" />}
          </div>
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            height: '46px',
            marginTop: '18px',
            borderRadius: '10px',
            background: '#3B82F6',
            color: '#FFFFFF',
            fontWeight: 600,
            fontSize: '0.92rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(59, 130, 246, 0.4)',
            transition: 'all 0.15s ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.background = '#2563EB')}
          onMouseOut={(e) => (e.currentTarget.style.background = '#3B82F6')}
        >
          <span>Send Code</span>
          <ArrowRight size={16} />
        </button>

        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <Link to="/?tab=login" className="auth-back-link">
            <ArrowLeft size={14} />
            <span>Back to Login</span>
          </Link>
        </div>
      </form>
    </AuthCard>
  );
}
