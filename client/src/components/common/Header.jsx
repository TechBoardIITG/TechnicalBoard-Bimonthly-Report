import React, { useState, useEffect } from 'react';
import techboardLogo from '../../assets/techboard-logo.jpg';

export default function Header({
  activeTab,
  setActiveTab,
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
            width="34"
            height="34"
            style={{ borderRadius: '50%', flexShrink: 0, display: 'block' }}
          />
          <div>
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

        {/* Theme Toggle */}
        <div className="top-actions">
          <button
            className="btn ghost"
            type="button"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
            style={{ padding: '6px 8px', fontSize: '14px', borderRadius: 'var(--r)' }}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  );
}
