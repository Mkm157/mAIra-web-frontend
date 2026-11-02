import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import logoImg from '../assets/logo.png';
import {
  LayoutDashboard,
  Users,
  BookOpen,
  LineChart,
  FileText,
  HelpCircle,
  Settings,
  Search,
  Bell,
  LogOut,
  ArrowUpRight,
  TrendingUp,
  Download,
  Plus,
  Clock,
  ShieldCheck,
  Database,
  Activity,
  UserCheck,
  Zap,
  MoreVertical,
  UserPlus,
  Share2,
  X,
  CheckCircle,
} from 'lucide-react';
import '../styles/admin.css';

export default function AdminDashboardPage() {
  const navigate = useNavigate();

  // Scenario States
  const [activeScenario, setActiveScenario] = useState('1. Default Overview');
  const [chartTab, setChartTab] = useState('Queries');
  const [chartRange, setChartRange] = useState('7D');
  const [activityFilter, setActivityFilter] = useState('All');
  const [showAddKnowledgeModal, setShowAddKnowledgeModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);

  // Scenario Switcher handler
  const handleScenarioChange = (scenario) => {
    setActiveScenario(scenario);
    if (scenario === '1. Default Overview') {
      setChartRange('7D');
      setShowAddKnowledgeModal(false);
      setShowInviteModal(false);
    } else if (scenario === '2. Filter: 30-Day Range') {
      setChartRange('30D');
      setShowAddKnowledgeModal(false);
      setShowInviteModal(false);
    } else if (scenario === '3. Add Knowledge Modal') {
      setShowAddKnowledgeModal(true);
      setShowInviteModal(false);
    } else if (scenario === '4. User Invite Triggered') {
      setShowInviteModal(true);
      setShowAddKnowledgeModal(false);
    }
  };

  // Recent Activity data
  const activities = [
    {
      id: 1,
      type: 'Users',
      title: 'New user registered',
      badge: 'Student',
      badgeColor: 'blue',
      desc: 'Elena Rostova (elena.r@acme.edu) provisioned with workspace access.',
      time: '4 mins ago',
      avatar: 'ER',
    },
    {
      id: 2,
      type: 'Knowledge',
      title: 'Knowledge source updated',
      badge: 'v4.2',
      badgeColor: 'green',
      desc: 'Engineering Policy Handbook re-indexed and partitioned across vector nodes.',
      time: '28 mins ago',
      icon: Database,
    },
    {
      id: 3,
      type: 'Security',
      title: 'Report generated',
      badge: 'Compliance',
      badgeColor: 'blue',
      desc: 'Monthly AI Token & Compliance Audit Q1 export triggered by System Daemon.',
      time: '2 hours ago',
      icon: FileText,
    },
    {
      id: 4,
      type: 'Support',
      title: 'Support request received',
      badge: 'Ticket #SR-892',
      badgeColor: 'red',
      desc: '"Query grounding latency in Biology faculty" flagged for diagnostic review.',
      time: '3 hours ago',
      icon: HelpCircle,
    },
    {
      id: 5,
      type: 'Security',
      title: 'Security token rotation',
      badge: 'Verified',
      badgeColor: 'green',
      desc: 'Automated enterprise API key renewal completed without session interruption.',
      time: '5 hours ago',
      icon: ShieldCheck,
    },
  ];

  const filteredActivities = activities.filter((item) => {
    if (activityFilter === 'All') return true;
    return item.type === activityFilter;
  });

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div>
          <Logo badge="ENTERPRISE" size="default" />

          <div className="sidebar-nav-section-title">PLATFORM NAVIGATION</div>
          <nav className="sidebar-nav-list">
            <div className="sidebar-nav-item active">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </div>
            <div className="sidebar-nav-item" onClick={() => setShowInviteModal(true)}>
              <Users size={18} />
              <span>User Management</span>
            </div>
            <div className="sidebar-nav-item" onClick={() => setShowAddKnowledgeModal(true)}>
              <BookOpen size={18} />
              <span>Knowledge Base</span>
            </div>
            <div className="sidebar-nav-item">
              <LineChart size={18} />
              <span>Analytics</span>
            </div>
            <div className="sidebar-nav-item">
              <FileText size={18} />
              <span>Reports</span>
            </div>
            <div className="sidebar-nav-item">
              <HelpCircle size={18} />
              <span>Support Requests</span>
            </div>
            <div className="sidebar-nav-item">
              <Settings size={18} />
              <span>Settings</span>
            </div>
          </nav>
        </div>

        <div className="sidebar-user-card">
          <div className="sidebar-user-info">
            <div className="sidebar-user-avatar">
              <ShieldCheck size={18} />
            </div>
            <div>
              <div className="sidebar-user-name">Alex Mercer</div>
              <div className="sidebar-user-email">alex@maira.io</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/?tab=login')}
            title="Log Out"
            style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        {/* Top Navbar */}
        <header className="admin-topbar">
          <div className="admin-breadcrumb">
            <img src={logoImg} alt="mAIra" style={{ width: '20px', height: '20px', objectFit: 'contain' }} />
            <span>Admin Suite / Admin Dashboard</span>
          </div>

          <div className="admin-search-wrapper">
            <Search size={15} className="admin-search-icon" />
            <input
              type="text"
              className="admin-search-input"
              placeholder="Search entities, tokens, logs..."
            />
            <span className="admin-search-shortcut">⌘K</span>
          </div>

          <div className="admin-top-right">
            <button className="admin-icon-btn">
              <Bell size={16} />
              <span className="admin-notify-badge" />
            </button>
            <div className="admin-profile-chip">
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'rgba(37, 99, 235, 0.2)',
                  border: '1px solid rgba(59, 130, 246, 0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#60A5FA',
                }}
              >
                <Users size={16} />
              </div>
              <div>
                <div style={{ fontWeight: 600, color: '#FFFFFF', fontSize: '0.8rem' }}>Global Admin</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#10B981', fontSize: '0.7rem' }}>
                  <span className="status-dot green" />
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Welcome Admin Banner */}
        <section className="admin-header-banner">
          <div>
            <h1 className="admin-header-title">
              Welcome, Admin
              <span className="badge-pill badge-blue" style={{ fontSize: '0.65rem' }}>
                ENTERPRISE HUB
              </span>
            </h1>
            <p className="admin-header-sub">
              Manage your organization's AI workspace, neural groundings, and enterprise compute allocations.
            </p>
          </div>

          <div className="admin-header-actions">
            <div
              className="badge-pill badge-green"
              style={{ padding: '6px 12px', fontSize: '0.74rem' }}
            >
              <span className="status-dot green" />
              All Systems Operational • Sync Active
            </div>

            <button
              className="btn-secondary-outline"
              onClick={() => alert('Exporting audit log (CSV/JSON)...')}
            >
              <Download size={14} />
              <span>Export Audit Log</span>
            </button>

            <button
              className="btn-add-resource"
              onClick={() => setShowAddKnowledgeModal(true)}
            >
              <Plus size={16} />
              <span>Add Resource</span>
            </button>
          </div>
        </section>

        {/* 4 Stat Cards */}
        <section className="admin-stats-grid">
          {/* Card 1: TOTAL USERS */}
          <div className="admin-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">TOTAL USERS</span>
              <div style={{ color: '#60A5FA' }}>
                <Users size={16} />
              </div>
            </div>
            <div className="stat-card-val-row">
              <span className="stat-card-val">2,845</span>
              <span className="badge-pill badge-green" style={{ fontSize: '0.7rem' }}>
                ↑ 12.0%
              </span>
            </div>
            <div className="stat-card-subtext">
              <span>2,420 Students</span>
              <span>•</span>
              <span>425 Staff / Admin</span>
            </div>
          </div>

          {/* Card 2: ACTIVE USERS */}
          <div className="admin-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">ACTIVE USERS</span>
              <div style={{ color: '#34D399' }}>
                <UserCheck size={16} />
              </div>
            </div>
            <div className="stat-card-val-row">
              <span className="stat-card-val">1,932</span>
              <span className="badge-pill badge-green" style={{ fontSize: '0.7rem' }}>
                ~68% DAU
              </span>
            </div>
            <div className="stat-card-subtext">
              <span>Concurrency peak: 91%</span>
              <span className="badge-pill badge-green" style={{ padding: '2px 6px', fontSize: '0.66rem' }}>
                Online: 348
              </span>
            </div>
          </div>

          {/* Card 3: TOTAL QUERIES */}
          <div className="admin-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">TOTAL QUERIES</span>
              <div style={{ color: '#38BDF8' }}>
                <Zap size={16} />
              </div>
            </div>
            <div className="stat-card-val-row">
              <span className="stat-card-val">148,620</span>
              <span className="badge-pill badge-green" style={{ fontSize: '0.7rem' }}>
                ↑ 24.5%
              </span>
            </div>
            <div className="stat-card-subtext">
              <span>Latency avg:</span>
              <span style={{ color: '#CBD5E1' }}>420ms roundtrip</span>
            </div>
          </div>

          {/* Card 4: KNOWLEDGE SOURCES */}
          <div className="admin-stat-card">
            <div className="stat-card-header">
              <span className="stat-card-label">KNOWLEDGE SOURCES</span>
              <div style={{ color: '#C084FC' }}>
                <Database size={16} />
              </div>
            </div>
            <div className="stat-card-val-row">
              <span className="stat-card-val">64</span>
              <span style={{ fontSize: '0.88rem', color: '#94A3B8', fontWeight: 500 }}>
                Connected
              </span>
            </div>
            <div className="stat-card-subtext">
              <span>Indexing accuracy: 99.8%</span>
              <span>•</span>
              <span style={{ color: '#F59E0B' }}>3 syncs pending</span>
            </div>
          </div>
        </section>

        {/* Middle Grid: Usage Overview Chart & Knowledge Base */}
        <section className="admin-middle-grid">
          {/* Usage Overview */}
          <div className="admin-card">
            <div className="chart-header">
              <div className="chart-title-area">
                <h3>
                  Usage Overview
                  <span className="badge-pill badge-gray" style={{ fontSize: '0.68rem' }}>
                    Tokens &amp; Queries
                  </span>
                </h3>
                <p style={{ fontSize: '0.78rem', color: '#64748B' }}>
                  Compute consumption &amp; neural grounding velocity.
                </p>
              </div>

              <div className="chart-controls">
                <div className="chart-tab-group">
                  {['Queries', 'Tokens', 'Sessions'].map((tab) => (
                    <button
                      key={tab}
                      className={`chart-tab-btn ${chartTab === tab ? 'active' : ''}`}
                      onClick={() => setChartTab(tab)}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="chart-range-group">
                  {['7D', '30D', '90D', '1Y'].map((range) => (
                    <button
                      key={range}
                      className={`chart-range-btn ${chartRange === range ? 'active' : ''}`}
                      onClick={() => setChartRange(range)}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Glowing Interactive SVG Chart */}
            <div style={{ position: 'relative', width: '100%', height: '200px', marginTop: '14px' }}>
              <svg viewBox="0 0 600 200" fill="none" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
                <defs>
                  <linearGradient id="chart-area-grad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2563EB" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                  </linearGradient>
                  <filter id="line-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Subtle horizontal grid lines */}
                <line x1="0" y1="40" x2="600" y2="40" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#1E293B" strokeDasharray="3 3" />
                <line x1="0" y1="140" x2="600" y2="140" stroke="#1E293B" strokeDasharray="3 3" />

                {/* Area under curve */}
                <path
                  d={
                    chartRange === '30D'
                      ? 'M 20 150 Q 80 140 140 110 T 260 90 T 380 40 T 480 30 T 580 50 L 580 180 L 20 180 Z'
                      : 'M 20 155 C 100 150, 160 140, 240 120 C 320 100, 360 50, 420 55 C 470 60, 520 80, 580 75 L 580 180 L 20 180 Z'
                  }
                  fill="url(#chart-area-grad)"
                />

                {/* Glowing line */}
                <path
                  d={
                    chartRange === '30D'
                      ? 'M 20 150 Q 80 140 140 110 T 260 90 T 380 40 T 480 30 T 580 50'
                      : 'M 20 155 C 100 150, 160 140, 240 120 C 320 100, 360 50, 420 55 C 470 60, 520 80, 580 75'
                  }
                  stroke="#38BDF8"
                  strokeWidth="3"
                  filter="url(#line-glow)"
                />

                {/* Peak point indicator */}
                <circle cx="420" cy="55" r="5" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="2" />
              </svg>

              {/* Peak Load Tooltip matching Figma */}
              <div
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '135px',
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid #38BDF8',
                  borderRadius: '8px',
                  padding: '6px 12px',
                  fontSize: '0.72rem',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.6)',
                  pointerEvents: 'none',
                }}
              >
                <div style={{ color: '#94A3B8', fontSize: '0.68rem' }}>Peak Load: Yesterday 15:45</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#FFFFFF', fontWeight: 700 }}>
                  <span className="status-dot blue" />
                  <span>6,420 queries / hr</span>
                </div>
              </div>

              {/* X Axis Labels */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '0.72rem',
                  color: '#64748B',
                  marginTop: '10px',
                }}
              >
                <span>May 18</span>
                <span>May 19</span>
                <span>May 20</span>
                <span>May 21</span>
                <span>May 22</span>
                <span>May 23</span>
                <span style={{ color: '#38BDF8', fontWeight: 600 }}>Today (Live)</span>
              </div>
            </div>

            {/* 3 Mini Metrics */}
            <div className="chart-mini-metrics">
              <div className="mini-metric-item">
                <Clock size={16} color="#60A5FA" />
                <div>
                  <div className="mini-metric-title">Peak Query Hour</div>
                  <div className="mini-metric-val">2:00 PM – 4:00 PM</div>
                </div>
              </div>

              <div className="mini-metric-item">
                <ShieldCheck size={16} color="#34D399" />
                <div>
                  <div className="mini-metric-title">Query Resolution Rate</div>
                  <div className="mini-metric-val" style={{ color: '#34D399' }}>94.2% Success</div>
                </div>
              </div>

              <div className="mini-metric-item">
                <Database size={16} color="#C084FC" />
                <div>
                  <div className="mini-metric-title">Semantic Cache Hit</div>
                  <div className="mini-metric-val">88.6% Retained</div>
                </div>
              </div>
            </div>
          </div>

          {/* Knowledge Base */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}>
                  Knowledge Base
                </h3>
                <span style={{ fontSize: '0.76rem', color: '#64748B' }}>
                  64 Active RAG Connectors
                </span>
              </div>
              <button
                className="admin-icon-btn"
                style={{ width: '28px', height: '28px' }}
                onClick={() => setShowAddKnowledgeModal(true)}
              >
                <Plus size={14} />
              </button>
            </div>

            {/* Source 1 */}
            <div className="kb-source-item">
              <div className="kb-source-left">
                <Database size={18} color="#60A5FA" />
                <div>
                  <div className="kb-source-title">Academic Curriculum 202</div>
                  <div className="kb-source-sub">Vector Indexed • 4,210 chunks • 15m ago</div>
                </div>
              </div>
              <span className="badge-pill badge-green" style={{ fontSize: '0.66rem' }}>
                Indexed
              </span>
            </div>

            {/* Source 2 */}
            <div className="kb-source-item">
              <div className="kb-source-left">
                <Share2 size={18} color="#38BDF8" />
                <div>
                  <div className="kb-source-title">Internal HR &amp; Compliance</div>
                  <div className="kb-source-sub">Confluence Space • 1.2 GB • 2h ago</div>
                </div>
              </div>
              <span className="badge-pill badge-blue" style={{ fontSize: '0.66rem' }}>
                Auto-sync
              </span>
            </div>

            {/* Source 3 */}
            <div className="kb-source-item">
              <div className="kb-source-left">
                <Zap size={18} color="#C084FC" />
                <div>
                  <div className="kb-source-title">Student FAQs &amp; Admission</div>
                  <div className="kb-source-sub">Live Webhook • 820 docs • 1d ago</div>
                </div>
              </div>
              <span className="badge-pill badge-green" style={{ fontSize: '0.66rem' }}>
                Live
              </span>
            </div>

            {/* Storage Progress */}
            <div style={{ marginTop: '18px', paddingTop: '14px', borderTop: '1px solid #1E293B' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '8px' }}>
                <span style={{ color: '#94A3B8' }}>Storage Allocation (Vector DB)</span>
                <span style={{ color: '#38BDF8', fontWeight: 600 }}>74% Capacity</span>
              </div>
              <div
                style={{
                  width: '100%',
                  height: '6px',
                  borderRadius: '3px',
                  background: '#1E293B',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    width: '74%',
                    height: '100%',
                    background: 'linear-gradient(90deg, #38BDF8, #2563EB)',
                  }}
                />
              </div>
              <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '6px' }}>
                18.5 GB utilized of 25.0 GB dedicated quota
              </div>
            </div>

            <button
              style={{
                width: '100%',
                marginTop: '16px',
                padding: '9px',
                borderRadius: '8px',
                background: 'rgba(30, 41, 59, 0.5)',
                border: '1px solid #1E293B',
                color: '#CBD5E1',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
              }}
              onClick={() => setShowAddKnowledgeModal(true)}
            >
              Manage Knowledge Base →
            </button>
          </div>
        </section>

        {/* Bottom Grid: Recent Activity & User Management / Quick Actions */}
        <section className="admin-bottom-grid">
          {/* Recent Activity */}
          <div className="admin-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#FFFFFF' }}>
                  Recent Activity
                </h3>
                <span className="badge-pill badge-gray" style={{ fontSize: '0.68rem' }}>
                  5 New Events
                </span>
              </div>

              <div style={{ display: 'flex', gap: '4px' }}>
                {['All', 'Security', 'Knowledge', 'Users'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActivityFilter(tab)}
                    style={{
                      padding: '3px 8px',
                      borderRadius: '5px',
                      fontSize: '0.72rem',
                      background: activityFilter === tab ? '#2563EB' : 'transparent',
                      color: activityFilter === tab ? '#FFFFFF' : '#64748B',
                      cursor: 'pointer',
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {filteredActivities.map((item) => (
                <div key={item.id} className="activity-item">
                  <div className="activity-item-left">
                    {item.avatar ? (
                      <div
                        className="activity-icon-badge"
                        style={{ background: 'rgba(37, 99, 235, 0.2)', color: '#60A5FA' }}
                      >
                        {item.avatar}
                      </div>
                    ) : (
                      <div
                        className="activity-icon-badge"
                        style={{
                          background: item.badgeColor === 'green' ? 'rgba(16, 185, 129, 0.15)' : 'rgba(37, 99, 235, 0.15)',
                          color: item.badgeColor === 'green' ? '#34D399' : '#60A5FA',
                        }}
                      >
                        {item.icon && <item.icon size={16} />}
                      </div>
                    )}
                    <div>
                      <div className="activity-title-row">
                        <span className="activity-title">{item.title}</span>
                        <span className={`badge-pill badge-${item.badgeColor}`} style={{ fontSize: '0.65rem' }}>
                          {item.badge}
                        </span>
                      </div>
                      <div className="activity-desc">{item.desc}</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span className="activity-time">{item.time}</span>
                    <button style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer' }}>
                      <MoreVertical size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: '16px',
                paddingTop: '12px',
                borderTop: '1px solid #1E293B',
                fontSize: '0.74rem',
              }}
            >
              <span style={{ color: '#64748B' }}>Showing real-time enterprise event stream</span>
              <a href="#audit" style={{ color: '#60A5FA', fontWeight: 500 }}>
                View Full Audit Feed →
              </a>
            </div>
          </div>

          {/* Right Column: User Management + Quick Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* User Management Card */}
            <div className="admin-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF' }}>User Management</h3>
                <span
                  style={{ fontSize: '0.74rem', color: '#60A5FA', cursor: 'pointer' }}
                  onClick={() => setShowInviteModal(true)}
                >
                  Manage Users →
                </span>
              </div>
              <div style={{ fontSize: '0.74rem', color: '#64748B', marginBottom: '14px' }}>
                2,845 Registered Accounts
              </div>

              {/* 3 mini status boxes */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
                <div style={{ background: 'rgba(13, 19, 34, 0.8)', border: '1px solid #1E293B', borderRadius: '8px', padding: '8px 10px' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Active</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#34D399' }}>2,610</div>
                </div>
                <div style={{ background: 'rgba(13, 19, 34, 0.8)', border: '1px solid #1E293B', borderRadius: '8px', padding: '8px 10px' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Pending</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F59E0B' }}>185</div>
                </div>
                <div style={{ background: 'rgba(13, 19, 34, 0.8)', border: '1px solid #1E293B', borderRadius: '8px', padding: '8px 10px' }}>
                  <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Inactive</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#94A3B8' }}>50</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  style={{
                    flex: 1,
                    padding: '8px',
                    borderRadius: '8px',
                    background: '#93C5FD',
                    color: '#0F172A',
                    fontWeight: 600,
                    fontSize: '0.8rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowInviteModal(true)}
                >
                  <UserPlus size={14} />
                  <span>Invite Users</span>
                </button>
                <button
                  style={{
                    width: '36px',
                    borderRadius: '8px',
                    background: 'rgba(30, 41, 59, 0.6)',
                    border: '1px solid #1E293B',
                    color: '#94A3B8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                  onClick={() => alert('Exporting user roster...')}
                >
                  <Download size={14} />
                </button>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="admin-card">
              <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#FFFFFF' }}>Quick Actions</h3>
              <div className="quick-actions-grid">
                <div className="quick-action-tile" onClick={() => setShowInviteModal(true)}>
                  <Users size={16} color="#60A5FA" />
                  <div className="quick-action-title">Manage Users</div>
                  <div className="quick-action-sub">Roles &amp;...</div>
                </div>

                <div className="quick-action-tile" onClick={() => setShowAddKnowledgeModal(true)}>
                  <BookOpen size={16} color="#34D399" />
                  <div className="quick-action-title">Manage Knowledge</div>
                  <div className="quick-action-sub">Sync Sources</div>
                </div>

                <div className="quick-action-tile">
                  <LineChart size={16} color="#38BDF8" />
                  <div className="quick-action-title">View Analytics</div>
                  <div className="quick-action-sub">Token Metrics</div>
                </div>

                <div className="quick-action-tile">
                  <FileText size={16} color="#94A3B8" />
                  <div className="quick-action-title">Generate Reports</div>
                  <div className="quick-action-sub">Compliance...</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>



      {/* Add Knowledge Resource Modal (Scenario 3) */}
      {showAddKnowledgeModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '480px',
              background: '#0F1626',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <BookOpen size={20} color="#38BDF8" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>Add Knowledge Resource</h3>
              </div>
              <button
                onClick={() => setShowAddKnowledgeModal(false)}
                style={{ color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '18px' }}>
              Connect a vector-indexed knowledge repository, Confluence workspace, or live REST document webhook to mAIra.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>Source Type</label>
                <select
                  style={{
                    width: '100%',
                    height: '40px',
                    background: '#0B0F19',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    padding: '0 12px',
                    fontSize: '0.84rem',
                  }}
                >
                  <option>Confluence Enterprise Workspace</option>
                  <option>Notion Knowledge Base</option>
                  <option>Google Drive Shared Repository</option>
                  <option>PostgreSQL / Vector DB (pgvector)</option>
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>Source Label / Name</label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Engineering Architecture Guidelines"
                  style={{
                    width: '100%',
                    height: '40px',
                    background: '#0B0F19',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    padding: '0 12px',
                    fontSize: '0.84rem',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>Embedding Model</label>
                <select
                  style={{
                    width: '100%',
                    height: '40px',
                    background: '#0B0F19',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    padding: '0 12px',
                    fontSize: '0.84rem',
                  }}
                >
                  <option>mAIra Neural Embedder v3 (Cosine 1536-dim)</option>
                  <option>OpenAI text-embedding-3-large</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button
                className="btn-secondary-outline"
                onClick={() => setShowAddKnowledgeModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn-add-resource"
                onClick={() => {
                  alert('Knowledge connector connected successfully!');
                  setShowAddKnowledgeModal(false);
                }}
              >
                <Plus size={14} />
                <span>Connect &amp; Ingest</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* User Invite Modal (Scenario 4) */}
      {showInviteModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              width: '460px',
              background: '#0F1626',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <UserPlus size={20} color="#60A5FA" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>Invite Users</h3>
              </div>
              <button
                onClick={() => setShowInviteModal(false)}
                style={{ color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <X size={18} />
              </button>
            </div>
            <p style={{ fontSize: '0.82rem', color: '#94A3B8', marginBottom: '18px' }}>
              Send an enterprise invitation email with role pre-assignments and SSO authorization.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.78rem', color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>Email Addresses (comma separated)</label>
                <input
                  type="text"
                  placeholder="name@domain.com, colleague@domain.com"
                  defaultValue="kavya.s@domain.com"
                  style={{
                    width: '100%',
                    height: '40px',
                    background: '#0B0F19',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    padding: '0 12px',
                    fontSize: '0.84rem',
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.78rem', color: '#CBD5E1', display: 'block', marginBottom: '6px' }}>Role Assignment</label>
                <select
                  style={{
                    width: '100%',
                    height: '40px',
                    background: '#0B0F19',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    padding: '0 12px',
                    fontSize: '0.84rem',
                  }}
                >
                  <option>Workspace Member (Default)</option>
                  <option>Faculty / Researcher</option>
                  <option>Department Administrator</option>
                  <option>Read-Only Auditor</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button
                className="btn-secondary-outline"
                onClick={() => setShowInviteModal(false)}
              >
                Cancel
              </button>
              <button
                style={{
                  padding: '8px 16px',
                  borderRadius: '8px',
                  background: '#93C5FD',
                  color: '#0F172A',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
                onClick={() => {
                  alert('Invitations dispatched successfully!');
                  setShowInviteModal(false);
                }}
              >
                <UserPlus size={14} />
                <span>Send Invitations</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
