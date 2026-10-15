import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import logo from "../assets/logo.png";
import "./Registration.css";

export default function Registration() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email.trim()) {
      setError("Email is required");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setError("");
    navigate("/email-verification", { state: { email } });
  };

  return (
    <div className="reg-page">
      <div className="reg-brand">
       <img src={logo} alt="mAIra logo" className="reg-logo-img" />
        <span className="reg-name">mAIra</span>
        <span className="reg-pill">AI Workspace</span>
      </div>

      <form className="reg-card" onSubmit={handleSubmit} noValidate>
        <div className="reg-step-row">
          <span className="reg-step">Step 1 of 3 • Registration</span>
          <div className="reg-dashes">
            <span className="reg-dash active" />
            <span className="reg-dash" />
            <span className="reg-dash" />
          </div>
        </div>

        <h2 className="reg-heading">Register Your Account</h2>
        <p className="reg-sub">
          Enter your email address to get started with mAIra.
        </p>

        <Input
          label="Email Address"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          error={error}
          autoComplete="email"
        />

        <p className="reg-hint">
          ⓘ We'll send a 6-digit verification code to verify your identity.
        </p>

        <Button type="submit">Verify Email →</Button>

        <p className="reg-login">
          Already have an account? <Link to="/login">Log In →</Link>
        </p>

        <p className="reg-footer">
          Privacy Policy • Terms of Service • © 2025 mAIra. All rights reserved.
        </p>
      </form>
    </div>
  );
}