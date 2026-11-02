import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../components/common/Logo';
import logoImg from '../assets/logo.png';
import {
  LayoutDashboard,
  MessageSquare,
  History,
  FolderClosed,
  Settings,
  Bell,
  User,
  Paperclip,
  ArrowUp,
  LogOut,
  X,
  Check,
} from 'lucide-react';
import '../styles/dashboard.css';

export default function UserDashboardPage() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Dashboard');
  const [promptText, setPromptText] = useState('');
  const [attachedFile, setAttachedFile] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Popovers & Modals
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const fileInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Real native file attachment - no default fetching
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr =
        file.size > 1024 * 1024
          ? (file.size / (1024 * 1024)).toFixed(1) + ' MB'
          : (file.size / 1024).toFixed(0) + ' KB';
      setAttachedFile({ name: file.name, size: sizeStr });
      showToast(`Attached: ${file.name}`);
    }
    e.target.value = '';
  };

  const handleSendClick = (e) => {
    e?.preventDefault();
    if (!promptText.trim() && !attachedFile) {
      document.getElementById('user-chat-input')?.focus();
      return;
    }
    // Clean confirmation without fake backend message generation
    showToast('Input captured. Ready for backend integration.');
    setPromptText('');
    setAttachedFile(null);
  };

  const handleNewChat = () => {
    setPromptText('');
    setAttachedFile(null);
    setActiveNav('New Chat');
    showToast('New chat session started.');
    setTimeout(() => {
      document.getElementById('user-chat-input')?.focus();
      setActiveNav('Dashboard');
    }, 400);
  };

  return (
    <div
      className="user-dashboard-layout"
      onClick={() => {
        // Close open dropdowns when clicking outside
        if (showNotifications) setShowNotifications(false);
        if (showUserMenu) setShowUserMenu(false);
      }}
    >
      {/* Hidden real file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileSelect}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(59, 130, 246, 0.4)',
            color: '#FFFFFF',
            padding: '10px 18px',
            borderRadius: '8px',
            fontSize: '0.82rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            zIndex: 10000,
            animation: 'fadeInMsg 0.2s ease',
          }}
        >
          <Check size={14} color="#34D399" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar */}
      <aside className="user-sidebar">
        <div>
          <Logo size="default" />

          <nav className="user-nav-list">
            <div
              className={`user-nav-item ${activeNav === 'Dashboard' ? 'active' : ''}`}
              onClick={() => setActiveNav('Dashboard')}
            >
              <LayoutDashboard size={17} />
              <span>Dashboard</span>
            </div>

            <div
              className={`user-nav-item ${activeNav === 'New Chat' ? 'active' : ''}`}
              onClick={handleNewChat}
            >
              <MessageSquare size={17} />
              <span>New Chat</span>
            </div>

            <div
              className={`user-nav-item ${activeNav === 'Conversation History' ? 'active' : ''}`}
              onClick={() => setShowHistoryModal(true)}
            >
              <History size={17} />
              <span>Conversation History</span>
            </div>

            <div
              className={`user-nav-item ${activeNav === 'Files' ? 'active' : ''}`}
              onClick={() => fileInputRef.current?.click()}
            >
              <FolderClosed size={17} />
              <span>Files</span>
            </div>

            <div
              className={`user-nav-item ${activeNav === 'Settings' ? 'active' : ''}`}
              onClick={() => setShowSettingsModal(true)}
            >
              <Settings size={17} />
              <span>Settings</span>
            </div>
          </nav>
        </div>

        {/* User Profile Card */}
        <div className="user-profile-bottom">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="user-avatar-circle">K</div>
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#FFFFFF' }}>Kavya S</div>
              <div style={{ fontSize: '0.7rem', color: '#64748B' }}>k*****@gmail.com</div>
            </div>
          </div>
          <button
            onClick={() => navigate('/?tab=login')}
            title="Log out"
            style={{ color: '#64748B', background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="user-main-area">
        {/* Topbar */}
        <header className="user-topbar">
          <div className="user-greeting-left">
            <div
              style={{
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <img
                src={logoImg}
                alt="mAIra"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.4))',
                }}
              />
            </div>
            <div>
              <h2 className="user-greeting-title">Good to see you, Kavya</h2>
              <div className="user-greeting-sub">How can mAIra help you today?</div>
            </div>
          </div>

          <div className="user-topbar-right" style={{ position: 'relative' }}>
            {/* Bell Button */}
            <div style={{ position: 'relative' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  border: '1px solid #1E293B',
                  background: 'rgba(17, 24, 39, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: showNotifications ? '#FFFFFF' : '#94A3B8',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                }}
                title="Notifications"
              >
                <Bell size={16} />
              </button>

              {/* Notifications Popover */}
              {showNotifications && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '44px',
                    right: 0,
                    width: '280px',
                    background: '#0F1626',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '12px',
                    padding: '14px',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
                    zIndex: 100,
                  }}
                >
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF', marginBottom: '8px' }}>
                    Notifications
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#94A3B8', padding: '8px', background: 'rgba(17, 24, 39, 0.5)', borderRadius: '6px' }}>
                    No new notifications • All systems operational.
                  </div>
                </div>
              )}
            </div>

            {/* User Avatar Button */}
            <div style={{ position: 'relative' }}>
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  background: '#2563EB',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  fontSize: '0.82rem',
                  cursor: 'pointer',
                }}
                title="Profile Menu"
              >
                <User size={16} />
              </div>

              {/* User Dropdown */}
              {showUserMenu && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    position: 'absolute',
                    top: '44px',
                    right: 0,
                    width: '220px',
                    background: '#0F1626',
                    border: '1px solid rgba(59, 130, 246, 0.3)',
                    borderRadius: '12px',
                    padding: '12px',
                    boxShadow: '0 12px 36px rgba(0, 0, 0, 0.6)',
                    zIndex: 100,
                  }}
                >
                  <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#FFFFFF' }}>Kavya S</div>
                  <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '10px' }}>k*****@gmail.com</div>
                  <div style={{ borderTop: '1px solid #1E293B', paddingTop: '8px' }}>
                    <button
                      onClick={() => navigate('/?tab=login')}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        background: 'none',
                        border: 'none',
                        color: '#EF4444',
                        fontSize: '0.78rem',
                        cursor: 'pointer',
                        padding: '6px 0',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                      }}
                    >
                      <LogOut size={13} />
                      <span>Log Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Clean Hero Query Section */}
        <section className="user-hero-container">
          <h1 className="user-hero-title">How can I help you today?</h1>
          <p className="user-hero-sub">
            Ask a question, upload a file, or synthesize complex research across your organization.
          </p>

          {/* Chat Box */}
          <form className="user-chat-box" onSubmit={handleSendClick}>
            {attachedFile && (
              <div className="chat-attached-pill">
                <Paperclip size={12} />
                <span>{attachedFile.name} ({attachedFile.size})</span>
                <button
                  type="button"
                  onClick={() => setAttachedFile(null)}
                  title="Remove attachment"
                >
                  <X size={12} />
                </button>
              </div>
            )}

            <textarea
              id="user-chat-input"
              className="user-chat-textarea"
              placeholder="Ask mAIra anything..."
              rows={2}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendClick();
                }
              }}
            />

            <div className="user-chat-controls">
              <div className="chat-controls-left">
                <button
                  type="button"
                  className="chat-control-btn"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file from device"
                >
                  <Paperclip size={14} />
                  <span>Attach file</span>
                </button>
              </div>

              <div className="chat-controls-right">
                <button type="submit" className="chat-send-btn" title="Send Query">
                  <ArrowUp size={16} strokeWidth={2.5} />
                </button>
              </div>
            </div>
          </form>
        </section>
      </main>

      {/* Conversation History Modal */}
      {showHistoryModal && (
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
          onClick={() => setShowHistoryModal(false)}
        >
          <div
            style={{
              width: '500px',
              background: '#0F1626',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '16px',
              padding: '28px',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <History size={20} color="#60A5FA" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>Conversation History</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                style={{ color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ textAlign: 'center', padding: '32px 16px', color: '#94A3B8' }}>
              <div style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '4px' }}>No Saved Conversations Yet</div>
              <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
                Start typing inquiries to build your workspace history.
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
              <button
                className="btn-secondary-outline"
                onClick={() => setShowHistoryModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettingsModal && (
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
          onClick={() => setShowSettingsModal(false)}
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
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Settings size={20} color="#60A5FA" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#FFFFFF' }}>Workspace Settings</h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                style={{ color: '#64748B', cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '0.84rem' }}>
              <div>
                <label style={{ display: 'block', color: '#94A3B8', marginBottom: '6px' }}>Default Model</label>
                <select
                  style={{
                    width: '100%',
                    height: '38px',
                    background: '#111827',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    padding: '0 12px',
                  }}
                  defaultValue="mAIra Ultra 2.5"
                >
                  <option>mAIra Ultra 2.5</option>
                  <option>mAIra 2.5 Pro</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', color: '#94A3B8', marginBottom: '6px' }}>Interface Theme</label>
                <select
                  style={{
                    width: '100%',
                    height: '38px',
                    background: '#111827',
                    border: '1px solid #1E293B',
                    borderRadius: '8px',
                    color: '#FFFFFF',
                    padding: '0 12px',
                  }}
                  defaultValue="Midnight Dark (Default)"
                >
                  <option>Midnight Dark (Default)</option>
                  <option>Cyber Blue Contrast</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '24px' }}>
              <button
                className="btn-primary-gradient"
                onClick={() => {
                  showToast('Settings saved.');
                  setShowSettingsModal(false);
                }}
                style={{ padding: '8px 20px', borderRadius: '8px' }}
              >
                Save Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
