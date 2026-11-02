import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import AuthLeftBanner from '../components/auth/AuthLeftBanner';
import OtpInput from '../components/common/OtpInput';
import { Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import '../styles/auth.css';

export default function RegisterVerifyPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [secondsLeft, setSecondsLeft] = useState(43);

  const rawEmail = location.state?.email || 'kavya.s@gmail.com';
  const maskEmail = (mail) => {
    if (!mail || !mail.includes('@')) return 'k******@gmail.com';
    const [name, domain] = mail.split('@');
    if (name.length <= 2) return `${name[0]}*@${domain}`;
    return `${name[0]}${'*'.repeat(Math.max(4, name.length - 2))}${name.slice(-1)}@${domain}`;
  };

  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft]);

  const mode = location.state?.mode || 'register';

  const handleVerify = (e) => {
    e.preventDefault();
    if (mode === 'login') {
      navigate('/dashboard');
    } else {
      navigate('/register/create-password', { state: { email: rawEmail } });
    }
  };

  const formattedTimer = `00:${secondsLeft < 10 ? '0' : ''}${secondsLeft}`;

  return (
    <div className="auth-split-container">
      <div className="auth-split-wrapper">
        <AuthLeftBanner variant="screen2" />

        <div className="auth-form-card">
          {/* Step 2 of 3 */}
          <div className="auth-step-row">
            <span className="auth-step-text">Step 2 of 3 • Email Verification</span>
            <div className="auth-step-bars">
              <div className="auth-step-bar active" />
              <div className="auth-step-bar active" />
              <div className="auth-step-bar" />
            </div>
          </div>

          <h2 className="auth-form-title">Verify Your Email</h2>
          <p className="auth-form-subtitle">
            We sent a 6-digit code to your email address.
          </p>

          <div className="auth-email-box">
            <div className="auth-email-left">
              <Mail size={16} color="#60A5FA" />
              <span>{maskEmail(rawEmail)}</span>
            </div>
            <button
              type="button"
              className="auth-change-link"
              onClick={() => navigate('/?tab=register')}
            >
              Change Email
            </button>
          </div>

          <form onSubmit={handleVerify}>
            <div className="otp-header-row">
              <span>Enter 6-digit code</span>
              <span style={{ color: '#64748B' }}>Numeric code</span>
            </div>

            <OtpInput value={otp} onChange={setOtp} />

            <button
              type="submit"
              className="btn-primary-gradient"
              style={{ width: '100%', height: '46px', marginTop: '12px' }}
            >
              <span>Verify Email</span>
              <ArrowRight size={16} />
            </button>
          </form>

          <div className="auth-card-footer-actions">
            <div>
              <div>Didn't receive the code?</div>
              <div style={{ marginTop: '2px' }}>
                Resend code in <span className="auth-resend-time">{formattedTimer}</span>
              </div>
            </div>

            <Link to="/?tab=register" className="auth-back-link">
              <ArrowLeft size={14} />
              <span>Back to Registration</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
