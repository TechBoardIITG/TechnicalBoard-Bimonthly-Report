import React, { useState } from 'react';
import { api } from '../../services/api';

export default function ChangePasswordModal({ isOpen, onClose, user, onPasswordChanged, isMandatoryFirstLogin = false }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match');
      return;
    }

    setLoading(true);
    try {
      const res = await api.changePassword(currentPassword, newPassword);
      setSuccess(res.message || 'Password changed successfully!');
      setTimeout(() => {
        if (onPasswordChanged) onPasswordChanged(res.user);
        onClose();
      }, 1200);
    } catch (err) {
      setError(err.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 110,
      padding: '16px'
    }}>
      <div className="card" style={{
        maxWidth: '440px',
        width: '100%',
        boxShadow: 'var(--shadow-lg)',
        border: '1px solid var(--line-strong)',
        background: 'var(--surface)',
        borderRadius: 'var(--r-lg)',
        padding: '24px'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--ink)' }}>
            {isMandatoryFirstLogin ? '🔒 First Login: Set New Password' : 'Change Password'}
          </h2>
          {!isMandatoryFirstLogin && (
            <button
              type="button"
              className="btn ghost"
              style={{ padding: '4px 8px', fontSize: '16px' }}
              onClick={onClose}
            >
              ✕
            </button>
          )}
        </div>

        {isMandatoryFirstLogin ? (
          <div style={{
            background: 'var(--warn-soft)',
            border: '1px solid var(--warn-border)',
            color: 'var(--warn)',
            padding: '10px 14px',
            borderRadius: 'var(--r)',
            fontSize: '13px',
            marginBottom: '16px'
          }}>
            👋 Welcome <b>{user?.name || user?.username}</b>! For security on your first login, please change your temporary password to a new personal password.
          </div>
        ) : (
          <p style={{ color: 'var(--ink-secondary)', fontSize: '13px', marginBottom: '16px' }}>
            Update your account password for <b>{user?.username}</b>.
          </p>
        )}

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

        {success && (
          <div style={{
            background: 'var(--ok-soft)',
            border: '1px solid var(--ok-border)',
            color: 'var(--ok)',
            padding: '10px 14px',
            borderRadius: 'var(--r)',
            fontSize: '13px',
            marginBottom: '16px'
          }}>
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '12px' }}>
            <label className="lbl" style={{ marginBottom: '6px', display: 'block' }}>Current / Default Password</label>
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '12px' }}>
            <label className="lbl" style={{ marginBottom: '6px', display: 'block' }}>New Password (min 6 characters)</label>
            <input
              type="password"
              placeholder="••••••••"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label className="lbl" style={{ marginBottom: '6px', display: 'block' }}>Confirm New Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            {!isMandatoryFirstLogin && (
              <button
                type="button"
                className="btn secondary"
                onClick={onClose}
              >
                Cancel
              </button>
            )}
            <button
              type="submit"
              className="btn primary"
              disabled={loading || Boolean(success)}
            >
              {loading ? 'Saving…' : 'Save New Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
