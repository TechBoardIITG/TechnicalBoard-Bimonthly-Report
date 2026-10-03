const API_BASE = '/api';

export const api = {
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
      headers: {
        'Content-Type': 'application/json',
      },
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
