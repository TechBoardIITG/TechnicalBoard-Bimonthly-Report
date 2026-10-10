const API_BASE = import.meta.env.VITE_BACKEND_URL || import.meta.env.VITE_API_URL || '/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('tbspr-token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const api = {
  // Authentication
  async login(username, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Login failed');
    }
    if (data.token) {
      localStorage.setItem('tbspr-token', data.token);
    }
    return data;
  },

  async changePassword(currentPassword, newPassword) {
    const res = await fetch(`${API_BASE}/auth/change-password`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.success) {
      throw new Error(data.message || 'Failed to change password');
    }
    if (data.token) {
      localStorage.setItem('tbspr-token', data.token);
    }
    return data;
  },

  async getMe() {
    const token = localStorage.getItem('tbspr-token');
    if (!token) return null;
    try {
      const res = await fetch(`${API_BASE}/auth/me`, {
        headers: getAuthHeaders(),
      });
      if (!res.ok) {
        localStorage.removeItem('tbspr-token');
        return null;
      }
      const data = await res.json();
      return data.user || null;
    } catch {
      return null;
    }
  },

  async getUsers() {
    const res = await fetch(`${API_BASE}/auth/users`, {
      headers: getAuthHeaders(),
    });
    if (!res.ok) throw new Error('Failed to fetch users');
    return await res.json();
  },

  // Check health and DB status
  async checkHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      if (!res.ok) throw new Error('Health check failed');
      return await res.json();
    } catch (err) {
      console.warn('API Health check error:', err);
      return null;
    }
  },

  // Get Admin Dashboard Stats & Matrices
  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch admin stats');
    }
    return await res.json();
  },

  // Get all reports with optional filters
  async getReports(params = {}) {
    const query = new URLSearchParams();
    if (params.domain) query.append('domain', params.domain);
    if (params.status) query.append('status', params.status);
    if (params.search) query.append('search', params.search);

    const url = `${API_BASE}/reports${query.toString() ? `?${query.toString()}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch reports');
    }
    return await res.json();
  },

  // Get single report by reportId or _id
  async getReport(id) {
    const res = await fetch(`${API_BASE}/reports/${encodeURIComponent(id)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch report');
    }
    return await res.json();
  },

  // Save report (Draft or Submitted)
  async saveReport(reportData) {
    const res = await fetch(`${API_BASE}/reports`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(reportData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to save report');
    }
    return await res.json();
  },

  // Delete a report
  async deleteReport(id) {
    const res = await fetch(`${API_BASE}/reports/${encodeURIComponent(id)}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to delete report');
    }
    return await res.json();
  },

  // Get Council Review
  async getReview(reportId) {
    const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(reportId)}`);
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to fetch review');
    }
    return await res.json();
  },

  // Save Council Review
  async saveReview(reportId, reviewData) {
    const res = await fetch(`${API_BASE}/reviews/${encodeURIComponent(reportId)}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reviewData),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to save review');
    }
    return await res.json();
  },
};
