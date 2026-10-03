import React from 'react';

const inr = (v) => (v == null ? '—' : '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 0 }));

export default function TechSecyPanel({ stats = {}, reports = [], onOpenReport }) {
  return (
    <div style={{ display: 'grid', gap: '18px' }}>
      {/* Executive KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Submitted Reports
          </div>
          <div style={{ fontSize: '26px', fontWeight: 750, color: 'var(--brand)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {stats.submittedReports || 0} <span style={{ fontSize: '13px', color: 'var(--ink-muted)', fontWeight: 500 }}>/ 16 Clubs</span>
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ok)', marginTop: '4px' }}>
            {stats.reviewedReports || 0} Reviewed by Council
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Total Budget Sanctioned
          </div>
          <div style={{ fontSize: '26px', fontWeight: 750, color: 'var(--accent)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {inr(stats.totalBudgetSanctioned || 0)}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>
            Utilized: <b style={{ color: 'var(--ink)' }}>{inr(stats.totalBudgetUtilized || 0)}</b> ({stats.budgetUtilizationRate || 0}%)
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Total Audience Reached
          </div>
          <div style={{ fontSize: '26px', fontWeight: 750, color: 'var(--ok)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {(stats.totalAudience || 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>
            Across {stats.totalEventsConducted || 0} Conducted Events
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '16px', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
            Active Technical Projects
          </div>
          <div style={{ fontSize: '26px', fontWeight: 750, color: 'var(--ink)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {stats.totalProjectsActive || 0}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>
            {stats.totalMembers || 0} Total Team Members
          </div>
        </div>
      </div>

      {/* Domain Breakdown */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
        <h3 style={{ marginBottom: '12px', fontSize: '16px' }}>Domain Performance & Filing Status</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
          {['Hardware', 'Software', 'Science', 'Business'].map((dom) => {
            const d = stats.domainStats?.[dom] || { count: 0, clubs: [] };
            return (
              <div key={dom} style={{ background: 'var(--sunk)', padding: '12px 14px', borderRadius: 'var(--r)', border: '1px solid var(--line-light)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <b>{dom} Domain</b>
                  <span className="pill" style={{ background: 'var(--brand-soft)', color: 'var(--brand)', border: '1px solid var(--brand-border)' }}>
                    {d.count} / 4 Filed
                  </span>
                </div>
                <div style={{ fontSize: '11.5px', color: 'var(--ink-muted)', marginTop: '6px' }}>
                  Clubs: {d.clubs?.length ? d.clubs.join(', ') : 'None yet'}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Executive Club Review Matrix */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: 'var(--r-lg)', padding: '18px', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div>
            <h3 style={{ fontSize: '16px' }}>Executive Club Review & Audit Board</h3>
            <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)' }}>Click any report to enter Council Appraisal mode and record official audit remarks.</p>
          </div>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Report ID</th>
                <th>Club Name</th>
                <th>Domain</th>
                <th>Secretary</th>
                <th>Self Score (Avg)</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => {
                const scores = Object.values(r.selfScores || {}).map((s) => parseFloat(s)).filter((n) => !isNaN(n));
                const avgScore = scores.length ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1) : '—';
                const st = r.reviewed ? 'reviewed' : r.status || 'draft';

                return (
                  <tr key={r.reportId}>
                    <td>
                      <button className="link" onClick={() => onOpenReport(r)}>
                        {r.reportId}
                      </button>
                    </td>
                    <td><b>{r.clubName || r.club}</b></td>
                    <td>{r.domain || '—'}</td>
                    <td>{r.secretary || '—'}</td>
                    <td className="mono"><b>{avgScore}</b> / 5.0</td>
                    <td>
                      <span className={`pill ${st}`}>
                        {st[0].toUpperCase() + st.slice(1)}
                      </span>
                    </td>
                    <td>
                      <button className="btn" style={{ padding: '3px 9px', fontSize: '11.5px' }} onClick={() => onOpenReport(r)}>
                        Review & Score
                      </button>
                    </td>
                  </tr>
                );
              })}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '24px', color: 'var(--ink-muted)' }}>
                    No club reports received yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

