import React, { useState } from 'react';

export default function OCPanel({ reports = [], risksAndIssues = [] }) {
  const [rioFilterType, setRioFilterType] = useState('');
  const [rioFilterArea, setRioFilterArea] = useState('');

  const filteredRIO = risksAndIssues.filter((r) => {
    if (rioFilterType && r.type !== rioFilterType) return false;
    if (rioFilterArea && r.area !== rioFilterArea) return false;
    return true;
  });

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {/* OC Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Clubs Monitored</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--brand)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {reports.length} <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--ink-muted)' }}>/ 16 Clubs</span>
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Active RIO Escalations</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {risksAndIssues.length}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>
            {risksAndIssues.filter((r) => r.type === 'Issue').length} Urgent Issues
          </div>
        </div>
      </div>

      {/* Team Health & Retention Matrix */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '6px' }}>Club Membership & Health Matrix</h3>
        <p style={{ fontSize: '13px', color: 'var(--ink-muted)', marginBottom: '14px' }}>
          Track team sizes, new member onboarding, and internal/overall health scores reported by Club Heads.
        </p>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Club</th>
                <th>Domain</th>
                <th>TB Heads</th>
                <th>Core Team</th>
                <th>Affiliated Members</th>
                <th>Inducted</th>
                <th>Internal Health</th>
                <th>Overall Health</th>
                <th>Retention %</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => {
                const team = r.report?.team || {};
                return (
                  <tr key={r.reportId}>
                    <td><b>{r.clubName || r.club}</b> ({r.club})</td>
                    <td>{r.domain || '—'}</td>
                    <td>{team.heads ?? '—'}</td>
                    <td>{team.core ?? '—'}</td>
                    <td>{team.members ?? '—'}</td>
                    <td>{team.inducted ? `+${team.inducted}` : '0'}</td>
                    <td>
                      <span className="pill" style={{ background: Number(team.internalHealth) >= 8 ? 'var(--ok-soft)' : 'var(--warn-soft)', color: Number(team.internalHealth) >= 8 ? 'var(--ok)' : 'var(--warn)' }}>
                        {team.internalHealth ? `${team.internalHealth}/10` : '—'}
                      </span>
                    </td>
                    <td>
                      <span className="pill" style={{ background: Number(team.overallHealth) >= 8 ? 'var(--ok-soft)' : 'var(--warn-soft)', color: Number(team.overallHealth) >= 8 ? 'var(--ok)' : 'var(--warn)' }}>
                        {team.overallHealth ? `${team.overallHealth}/10` : '—'}
                      </span>
                    </td>
                    <td className="mono">{team.retention ? `${team.retention}%` : '—'}</td>
                  </tr>
                );
              })}
              {reports.length === 0 && (
                <tr>
                  <td colSpan="9" style={{ textAlign: 'center', padding: '20px', color: 'var(--ink-muted)' }}>
                    No reports submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIO (Risks, Issues, Opportunities) Board */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '18px' }}>Escalated Risks, Issues & Opportunities (RIO)</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Requests for Council assistance, administrative bottlenecks, and inter-club synergies.</p>
          </div>
          <div className="filters">
            <select value={rioFilterType} onChange={(e) => setRioFilterType(e.target.value)}>
              <option value="">All Types</option>
              <option value="Risk">Risk</option>
              <option value="Issue">Issue</option>
              <option value="Opportunity">Opportunity</option>
            </select>
            <select value={rioFilterArea} onChange={(e) => setRioFilterArea(e.target.value)}>
              <option value="">All Areas</option>
              <option value="Events">Events</option>
              <option value="Projects">Projects</option>
              <option value="Team Health">Team Health</option>
              <option value="Competitions">Competitions</option>
              <option value="Finances">Finances</option>
              <option value="Outreach">Outreach</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Club</th>
                <th>Type</th>
                <th>Area</th>
                <th>Action / Description</th>
                <th>Target Deadline</th>
              </tr>
            </thead>
            <tbody>
              {filteredRIO.map((item, idx) => (
                <tr key={idx}>
                  <td><b>{item.club}</b></td>
                  <td>
                    <span
                      className="pill"
                      style={{
                        background: item.type === 'Issue' ? 'var(--bad-soft)' : item.type === 'Risk' ? 'var(--warn-soft)' : 'var(--ok-soft)',
                        color: item.type === 'Issue' ? 'var(--bad)' : item.type === 'Risk' ? 'var(--warn)' : 'var(--ok)',
                      }}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td><b>{item.area}</b></td>
                  <td style={{ maxWidth: '400px', whiteSpace: 'normal' }}>{item.action}</td>
                  <td className="mono">{item.deadline || 'Ongoing'}</td>
                </tr>
              ))}
              {filteredRIO.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--ink-muted)' }}>
                    No RIO entries match the selected filters.
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

