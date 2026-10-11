import { useEffect, useState } from "react";
import logo from "../assets/logo.jpg";
import { sendRequest } from "../services/api";
import {
  dashboardOverviewRequest,
  dashboardOverviewResponse,
} from "../services/mockData";
import Icon from "./icons";
import MetricCards from "./MetricCards";
import "./AdminDashboard.css";

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: "dashboard" },
  { id: "user_management", label: "User Management", icon: "users" },
  { id: "knowledge_base", label: "Knowledge Base", icon: "knowledge" },
  { id: "analytics", label: "Analytics", icon: "analytics" },
  { id: "reports", label: "Reports", icon: "reports" },
  { id: "support_requests", label: "Support Requests", icon: "support" },
  { id: "recent_activity", label: "Recent Activity", icon: "activity" },
  { id: "settings", label: "Settings", icon: "settings" },
];

function useFullBleedRoot() {
  useEffect(() => {
    const root = document.getElementById("root");
    const previous = {
      width: root.style.width,
      maxWidth: root.style.maxWidth,
      margin: root.style.margin,
      textAlign: root.style.textAlign,
      borderInline: root.style.borderInline,
      minHeight: root.style.minHeight,
      display: root.style.display,
    };
    const previousBodyOverflow = document.body.style.overflow;

    root.style.width = "100%";
    root.style.maxWidth = "none";
    root.style.margin = "0";
    root.style.textAlign = "left";
    root.style.borderInline = "none";
    root.style.minHeight = "100vh";
    root.style.display = "block";
    document.body.style.overflow = "hidden";

    return () => {
      root.style.width = previous.width;
      root.style.maxWidth = previous.maxWidth;
      root.style.margin = previous.margin;
      root.style.textAlign = previous.textAlign;
      root.style.borderInline = previous.borderInline;
      root.style.minHeight = previous.minHeight;
      root.style.display = previous.display;
      document.body.style.overflow = previousBodyOverflow;
    };
  }, []);
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [error, setError] = useState("");

  useFullBleedRoot();

  useEffect(() => {
    let active = true;
    const request = import.meta.env.VITE_API_BASE_URL
      ? sendRequest(dashboardOverviewRequest)
      : Promise.resolve(dashboardOverviewResponse);

    request
      .then((response) => {
        if (!active) {
          return;
        }
        if (response.statusCode !== "1" || !response.payload) {
          setError(response.statusMsg || "The dashboard could not be loaded.");
          return;
        }
        setOverview(response.payload);
      })
      .catch(() => {
        if (active) {
          setError("The dashboard could not be loaded.");
        }
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="sidebar-body">
          <div className="brand">
            <img src={logo} alt="" />
            <span className="brand-text">
              <strong>mAIra</strong>
              <span>Enterprise</span>
            </span>
          </div>
          <nav className="admin-nav" aria-label="Admin">
            {NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                className="nav-button"
                aria-current={item.id === "dashboard" ? "page" : undefined}
              >
                <Icon name={item.icon} />
                <span className="nav-label">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="admin-profile">
            <span className="avatar" aria-hidden="true">
              AM
            </span>
            <span className="profile-copy">
              <strong>Alex Mercer</strong>
              <span>alex@maira.io</span>
            </span>
          </div>
        </div>
      </aside>

      <div className="admin-column">
        <header className="admin-topbar">
          <p className="crumb">
            <span>Admin Suite</span>
            <span aria-hidden="true">/</span>
            <strong>Admin Dashboard</strong>
          </p>
        </header>
        <main className="admin-content">
          <div className="welcome">
            <div className="welcome-title">
              <h1>Welcome, Admin</h1>
              <span className="hub-label">Enterprise Hub</span>
            </div>
            <p>A summary of people and usage across the workspace.</p>
          </div>
          {error ? <p className="admin-status">{error}</p> : null}
          {!overview && !error ? <p className="admin-status">Loading dashboard…</p> : null}
          {overview ? <MetricCards overview={overview} /> : null}
        </main>
      </div>
    </div>
  );
}
