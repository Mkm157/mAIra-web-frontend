import { useState } from "react";
import logo from "../assets/logo.png";
import "./Login.css";

function Login() {
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();

    // Connect authentication to the backend in a later step.
    console.log("Login submitted for role:", role);
  };

  const handleForgotPassword = () => {
    // Password recovery will be connected later.
    console.log("Password recovery requested for role:", role);
  };

  return (
    <div className="login-page">
      {/* Header */}
      <header className="login-header">
        <div className="brand">
          <img src={logo} alt="mAIra logo" className="brand-logo" />

          <span className="brand-name">mAIra</span>
          <span className="brand-badge">ENTERPRISE</span>
        </div>

        
      </header>

      {/* Main Content */}
      <main className="login-main">
        {/* Left Introduction Section */}
        <section className="login-intro">
          <div className="intro-badge">
            <img src={logo} alt="" className="mini-logo" />
            <span>ENTERPRISE INTELLIGENCE ASSISTANT</span>
          </div>

          <h1>
            Your organization&apos;s <span>AI assistant</span>
          </h1>

          <p className="intro-description">
            Trusted, knowledge-based AI assistance for employees.
            Query verified organizational repositories, documents,
            and workflows in real time.
          </p>

          {/* Example AI Response */}
          <div className="example-card">
            <div className="example-heading">
              <div className="engine-icon">
                <img src={logo} alt="" />
              </div>

              <strong>mAIra Synthesis Engine</strong>

              <span className="grounded-badge">
                ◈ Grounded
              </span>
            </div>

            <div className="example-answer">
              <span className="answer-icon" aria-hidden="true">
                ♙
              </span>

              <p>
                &quot;According to policy guidelines, parental leave
                requests must be submitted 30 days prior through
                Workday HR.&quot;
              </p>
            </div>

            <div className="example-footer">
              <span className="policy-tag">
                ▤ [Policy] HR-Handbook-2025
              </span>

              <span className="policy-meta">
                Section 4.2 · Updated Oct 2025
              </span>
            </div>
          </div>

          {/* Security Information */}
          <div className="security-features">
            <span>♙ Secure organizational access</span>
            <span className="feature-divider" aria-hidden="true">
              •
            </span>
            <span>♢ 256-bit TLS</span>
          </div>
        </section>

        {/* Right Login Section */}
        <section className="login-card">
          <div className="login-card-heading">
            <h2>Welcome Back</h2>
            <p>Sign in using your credentials.</p>
          </div>

          {/* Role Selection */}
          <div className="role-heading">
            <span>SELECT ROLE</span>

            <span className="role-description">
              Routes to {role === "student" ? "Student" : "Admin"} Dashboard
            </span>
          </div>

          <div className="role-selector">
            <button
              type="button"
              className={`role-button ${
                role === "student" ? "active" : ""
              }`}
              aria-pressed={role === "student"}
              onClick={() => setRole("student")}
            >
              <span aria-hidden="true">♧</span>
              Student
            </button>

            <button
              type="button"
              className={`role-button ${
                role === "admin" ? "active" : ""
              }`}
              aria-pressed={role === "admin"}
              onClick={() => setRole("admin")}
            >
              <span aria-hidden="true">♙</span>
              Admin
            </button>
          </div>

          {/* Login Form */}
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-field">
              <label htmlFor="login-email">
                {role === "student" ? "Student Email" : "Admin Email"}
              </label>

              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  ✉
                </span>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder={
                    role === "student"
                      ? "Enter your student email"
                      : "Enter your admin email"
                  }
                  autoComplete="username"
                  required
                />

               
              </div>
            </div>

            <div className="form-field">
              <div className="password-label">
                <label htmlFor="login-password">Password</label>

                <button
                  type="button"
                  className="forgot-password"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </button>
              </div>

              <div className="input-wrapper">
                <span className="input-icon" aria-hidden="true">
                  ♙
                </span>

                <input
                  id="login-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                  onClick={() => setShowPassword((previous) => !previous)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button type="submit" className="login-submit">
              <span>Log In</span>
              <span aria-hidden="true">→</span>
            </button>
          </form>

          {/* Access Notice */}
          <div className="login-notice">
            <span className="notice-icon" aria-hidden="true">
              ♙
            </span>

            <p>
              Accounts are created and provisioned by your
              organization&apos;s administrator. Contact{" "}
              <a href="mailto:helpdesk@example.com">IT Helpdesk</a>{" "}
              if you require access assistance.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Login;
