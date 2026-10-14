import { useState } from "react";
import { Link } from "react-router-dom";

export default function PasswordReset() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!email.trim()) {
      setError("Please enter your registered email address.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      setError("Please fill in all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (!/[A-Z]/.test(newPassword)) {
      setError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!/[a-z]/.test(newPassword)) {
      setError("Password must contain at least one lowercase letter.");
      return;
    }

    if (!/[0-9]/.test(newPassword)) {
      setError("Password must contain at least one number.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setMessage(
      "Frontend validation successful! Password reset will be completed when the backend API is integrated."
    );

    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.icon}>🔐</div>

        <h1 style={styles.title}>Reset Password</h1>

        <p style={styles.subtitle}>
          Enter your registered email and choose a new password.
        </p>

        {error && (
          <div style={styles.error} role="alert">
            {error}
          </div>
        )}

        {message && (
          <div style={styles.success} role="status">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label style={styles.label} htmlFor="email">
            Registered Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            required
            style={styles.input}
          />

          <label style={styles.label} htmlFor="newPassword">
            New Password
          </label>

          <div style={styles.passwordWrapper}>
            <input
              id="newPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
              style={styles.passwordInput}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.toggleButton}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <p style={styles.hint}>
            Use at least 8 characters, including uppercase and lowercase
            letters and a number.
          </p>

          <label style={styles.label} htmlFor="confirmPassword">
            Confirm New Password
          </label>

          <div style={styles.passwordWrapper}>
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Re-enter your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
              minLength={8}
              required
              style={styles.passwordInput}
            />

            <button
              type="button"
              onClick={() =>
                setShowConfirmPassword(!showConfirmPassword)
              }
              style={styles.toggleButton}
              aria-label={
                showConfirmPassword
                  ? "Hide confirmation password"
                  : "Show confirmation password"
              }
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button type="submit" style={styles.button}>
            Reset Password
          </button>
        </form>

        <p style={styles.footer}>
          Remember your password?{" "}
          <Link to="/login" style={styles.link}>
            Back to Login
          </Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "24px",
    background: "#f3f6fb",
    fontFamily: "Arial, sans-serif",
    boxSizing: "border-box",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    padding: "32px",
    background: "#ffffff",
    borderRadius: "16px",
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.08)",
    boxSizing: "border-box",
  },

  icon: {
    fontSize: "36px",
    textAlign: "center",
    marginBottom: "12px",
  },

  title: {
    textAlign: "center",
    fontSize: "26px",
    color: "#1e293b",
    marginBottom: "10px",
  },

  subtitle: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "14px",
    lineHeight: 1.6,
    marginBottom: "24px",
  },

  label: {
    display: "block",
    marginBottom: "8px",
    marginTop: "16px",
    fontSize: "14px",
    fontWeight: "600",
    color: "#334155",
  },

  input: {
    width: "100%",
    padding: "12px",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    fontSize: "14px",
    boxSizing: "border-box",
    outlineColor: "#2563eb",
  },

  passwordWrapper: {
    display: "flex",
    alignItems: "center",
    border: "1px solid #cbd5e1",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#ffffff",
  },

  passwordInput: {
    flex: 1,
    minWidth: 0,
    padding: "12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  toggleButton: {
    padding: "12px 10px",
    border: "none",
    background: "#ffffff",
    color: "#2563eb",
    fontSize: "12px",
    fontWeight: "600",
    cursor: "pointer",
  },

  hint: {
    margin: "8px 0 0",
    color: "#64748b",
    fontSize: "12px",
    lineHeight: 1.5,
  },

  button: {
    width: "100%",
    padding: "13px",
    marginTop: "24px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
  },

  error: {
    padding: "12px",
    background: "#fee2e2",
    color: "#b91c1c",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
    lineHeight: 1.5,
  },

  success: {
    padding: "12px",
    background: "#dcfce7",
    color: "#166534",
    borderRadius: "8px",
    fontSize: "13px",
    marginBottom: "16px",
    lineHeight: 1.5,
  },

  footer: {
    marginTop: "24px",
    textAlign: "center",
    fontSize: "13px",
    color: "#64748b",
  },

  link: {
    color: "#2563eb",
    fontWeight: "600",
  },
};