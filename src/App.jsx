import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import RegisterVerifyPage from './pages/RegisterVerifyPage';
import RegisterPasswordPage from './pages/RegisterPasswordPage';
import StandaloneVerifyPage from './pages/StandaloneVerifyPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import RecoveryVerifyPage from './pages/RecoveryVerifyPage';
import RecoveryPasswordPage from './pages/RecoveryPasswordPage';
import RecoverySuccessPage from './pages/RecoverySuccessPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import UserDashboardPage from './pages/UserDashboardPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Screen 1: Landing Page / Login & Register */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Navigate to="/?tab=login" replace />} />
        <Route path="/register" element={<Navigate to="/?tab=register" replace />} />

        {/* Screen 2: Email Verification / OTP */}
        <Route path="/register/verify" element={<RegisterVerifyPage />} />

        {/* Screen 3: Create Account Password */}
        <Route path="/register/create-password" element={<RegisterPasswordPage />} />

        {/* Screen 4 Top: Standalone / Modal Email Verification */}
        <Route path="/verify-modal" element={<StandaloneVerifyPage />} />

        {/* Screen 4 Bottom: Forgot Password Recovery Method */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Screen 5: Recovery Code Verification */}
        <Route path="/recovery/verify-code" element={<RecoveryVerifyPage />} />

        {/* Screen 6: Recovery Create New Password */}
        <Route path="/recovery/new-password" element={<RecoveryPasswordPage />} />

        {/* Screen 7: Password Updated Successfully */}
        <Route path="/recovery/success" element={<RecoverySuccessPage />} />
        <Route path="/register/success" element={<RecoverySuccessPage />} />

        {/* Enterprise Admin Dashboard (Bypassed as requested - redirects to dashboard) */}
        <Route path="/admin" element={<Navigate to="/dashboard" replace />} />

        {/* Screen 9: Authenticated User Workspace Dashboard */}
        <Route path="/dashboard" element={<UserDashboardPage />} />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
