import React, { useState, useEffect } from 'react';
import techboardLogo from '../../assets/techboard-logo.jpg';

export default function Header({
  activeTab,
  setActiveTab,
  user,
  onOpenLogin,
  onOpenChangePassword,
  onLogout,
}) {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('tbspr-theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('tbspr-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <header className="top" id="top">
      <div className="top-in">
        {/* Brand */}
        <div className="brand">
          <img
            src={techboardLogo}
            alt="Technical Board IIT Guwahati"
            className="brand-logo"
            width="34"
            height="34"
          />
          <div className="brand-text">
            <div className="b1">Standard Progress Report</div>
            <div className="b2">Technical Board · IIT Guwahati</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <nav className="tabs" role="tablist" aria-label="Main Navigation">
          <button
            role="tab"
            aria-selected={activeTab === 'form'}
            onClick={() => setActiveTab('form')}
          >
            Report form
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'subs'}
            onClick={() => setActiveTab('subs')}
          >
            Submissions
          </button>
          <button
            role="tab"
            aria-selected={activeTab === 'admin'}
            onClick={() => setActiveTab('admin')}
          >
            Admin Panel
          </button>
        </nav>

        {/* User Account & Theme Actions */}
        <div className="top-actions">
          {user ? (
            <div className="user-nav-group">
              <span
                className="user-badge"
                title={`Logged in as ${user.name} (${user.username})`}
              >
                <span className="user-icon">👤</span>
                <span className="user-name-text">
                  {user.clubCode ? `${user.clubCode} · ${user.name}` : user.name}
                </span>
              </span>
              <button
                className="btn ghost btn-sm btn-pwd"
                type="button"
                onClick={onOpenChangePassword}
                title="Change Password"
              >
                <span>🔑</span> <span className="btn-label-text">Password</span>
              </button>
              <button
                className="btn ghost btn-sm btn-logout"
                type="button"
                onClick={onLogout}
                title="Sign Out"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              className="btn secondary btn-sm btn-signin"
              type="button"
              onClick={onOpenLogin}
            >
              Sign In
            </button>
          )}

          <button
            className="btn ghost theme-toggle-btn"
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            aria-label="Toggle dark/light theme"
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}

