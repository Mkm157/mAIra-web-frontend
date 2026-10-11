
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";

const pages = [
  ["Registration", "/registration"],
  ["Email Verification", "/email-verification"],
  ["Login", "/login"],
  ["Forgot Password", "/password-recovery"],
  ["Reset Password", "/password-reset"],
  ["Student Dashboard", "/student"],
  ["Admin Dashboard", "/admin"],
];

function Home() {
  return (
    <main style={{ padding: 32, fontFamily: "Arial" }}>
      <h1>mAIra</h1>
      <p>Choose a screen to begin.</p>
      {pages.map(([name, path]) => (
        <p key={path}>
          <Link to={path}>{name}</Link>
        </p>
      ))}
    </main>
  );
}

function Placeholder({ title }) {
  return (
    <main style={{ padding: 32, fontFamily: "Arial" }}>
      <Link to="/">← Home</Link>
      <h1>{title}</h1>
      <p>This screen is ready for its assigned team member to implement.</p>
    </main>
  );
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {pages.map(([title, path]) => (
          <Route
            key={path}
            path={path}
            element={<Placeholder title={title} />}
          />
        ))}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
