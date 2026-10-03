import React, { useState } from 'react';
import { api } from '../../services/api';

const QUICK_ACCOUNTS = [
  { group: 'Hardware Domain', list: [
    { u: 'robo', name: 'Robotics Club', pass: 'tb@robo2026' },
    { u: 'aero', name: 'Aeromodelling Club', pass: 'tb@aero2026' },
    { u: 'auto', name: 'Automobile Club', pass: 'tb@auto2026' },
    { u: 'elec', name: 'Electronics Club', pass: 'tb@elec2026' },
    { u: '4i', name: '4i Labs', pass: 'tb@4i2026' },
  ]},
  { group: 'Software Domain', list: [
    { u: 'cc', name: 'Coding Club', pass: 'tb@cc2026' },
    { u: 'ai', name: 'IITG AI Club', pass: 'tb@ai2026' },
    { u: 'gdes', name: 'Game Dev & E-Sports', pass: 'tb@gdes2026' },
    { u: 'ws', name: 'Whitespace (Design)', pass: 'tb@ws2026' },
  ]},
  { group: 'Business & Science', list: [
    { u: 'cna', name: 'Consulting & Analytics', pass: 'tb@cna2026' },
    { u: 'edc', name: 'Entrepreneurship Cell', pass: 'tb@edc2026' },
    { u: 'fec', name: 'Finance & Economics', pass: 'tb@fec2026' },
    { u: 'quiz', name: 'Acumen (Quiz)', pass: 'tb@quiz2026' },
    { u: 'astro', name: 'Equinox (Astronomy)', pass: 'tb@astro2026' },
    { u: 'poly', name: 'Polygon (Maths)', pass: 'tb@poly2026' },
    { u: 'prak', name: 'Prakriti (Eco)', pass: 'tb@prak2026' },
  ]},
  { group: 'Council & Admin', list: [
    { u: 'admin', name: 'TB Administrator', pass: 'tb@admin2026' },
    { u: 'techsecy', name: 'General Secretary (Tech)', pass: 'tb@techsecy2026' },
    { u: 'oc', name: 'Operations Coordinator', pass: 'tb@oc2026' },
  ]}
];

export default function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showHelper, setShowHelper] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setError('Please enter both username and password');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await api.login(username.trim(), password);
      onLoginSuccess(res.user);
      onClose();
    } catch (err) {
      setError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  const selectQuickAccount = (u, p) => {
    setUsername(u);
    setPassword(p);
    setError('');
  };

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.45)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '16px'
    }}>
      <div className="card" style={{
        maxWidth: '460px',
        width: '100%',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--line-strong)',
        background: 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        padding: '24px',
        maxHeight: '90vh',
        overflowY: 'auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)' }}>Club Secretary Login</h2>
          <button
            type="button"
            className="btn ghost"
            style={{ padding: '4px 8px', fontSize: '16px' }}
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <p style={{ color: 'var(--ink-secondary)', fontSize: '13px', marginBottom: '18px' }}>
          Sign in to submit your club's bimonthly progress report or manage council reviews.
        </p>

        {error && (
          <div style={{
            background: 'var(--bad-soft)',
            border: '1px solid var(--bad-border)',
            color: 'var(--bad)',
            padding: '10px 14px',
            borderRadius: 'var(--r)',
            fontSize: '13px',
            marginBottom: '16px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '14px' }}>
            <label className="lbl" style={{ marginBottom: '6px', display: 'block' }}>Username / Club Code</label>
            <input
              type="text"
              placeholder="e.g. robo, cc, aero, admin..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoFocus
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '18px' }}>
            <label className="lbl" style={{ marginBottom: '6px', display: 'block' }}>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end', alignItems: 'center' }}>
            <button
              type="button"
              className="btn ghost"
              onClick={() => setShowHelper(!showHelper)}
              style={{ fontSize: '12px', marginRight: 'auto' }}
            >
              {showHelper ? 'Hide default credentials' : '🔑 View default credentials'}
            </button>
            <button
              type="button"
              className="btn secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn primary"
              disabled={loading}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </div>
        </form>

        {showHelper && (
          <div style={{
            marginTop: '20px',
            paddingTop: '16px',
            borderTop: '1px solid var(--line)',
            fontSize: '12px'
          }}>
            <div style={{ fontWeight: '600', color: 'var(--ink)', marginBottom: '8px' }}>
              Default Secretary Credentials (Click to fill):
            </div>
            <div style={{ maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {QUICK_ACCOUNTS.map((grp, gidx) => (
                <div key={gidx}>
                  <div style={{ color: 'var(--ink-muted)', fontWeight: '600', fontSize: '11px', marginBottom: '4px' }}>
                    {grp.group}
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {grp.list.map((acc, aidx) => (
                      <button
                        key={aidx}
                        type="button"
                        className="btn sunk"
                        style={{ padding: '4px 8px', fontSize: '11px' }}
                        onClick={() => selectQuickAccount(acc.u, acc.pass)}
                        title={`Username: ${acc.u} | Pass: ${acc.pass}`}
                      >
                        <b>{acc.u}</b> · {acc.name}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
