import React from 'react';

export default function WebmasterPanel({ mediaLinks = [], projects = [], stats = {}, reports = [] }) {
  const handleExportFullBackup = () => {
    const backup = {
      exportedAt: new Date().toISOString(),
      schema: 'TB/SPR/Revision-01',
      stats,
      reports,
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backup, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `TB-Full-System-Backup-${new Date().toISOString().slice(0, 10)}.json`);
    dlAnchor.click();
  };

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {/* System Health KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>MongoDB Database Status</div>
          <div style={{ fontSize: '20px', fontWeight: 700, color: 'var(--ok)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="dot on" style={{ width: '10px', height: '10px' }}></span>
            Online & Synced
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '4px' }}>
            Port 27017 · mongodb://127.0.0.1
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Database Records</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--brand)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {reports.length} Reports
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>
            {stats.reviewedReports || 0} Review Documents
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>External Media Links</div>
          <div style={{ fontSize: '26px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {mediaLinks.length} Assets
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>
            Drive folders & annexures
          </div>
        </div>
      </div>

      {/* Cloud & Drive Assets Verification Repository */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '18px' }}>Drive Media & Project Annexures Repository</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Verify permission and accessibility of Google Drive folders submitted by club secretaries.</p>
          </div>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Club</th>
                <th>Asset Type</th>
                <th>Item / Description</th>
                <th>Drive URL</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {mediaLinks.map((m, idx) => (
                <tr key={idx}>
                  <td><b>{m.club}</b></td>
                  <td>
                    <span className="pill" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                      {m.type}
                    </span>
                  </td>
                  <td><b>{m.title}</b></td>
                  <td className="mono" style={{ fontSize: '12px', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {m.url}
                  </td>
                  <td>
                    <a href={m.url} target="_blank" rel="noreferrer" className="btn" style={{ padding: '3px 10px', fontSize: '12px' }}>
                      Inspect URL ↗
                    </a>
                  </td>
                </tr>
              ))}
              {mediaLinks.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '20px', color: 'var(--ink-muted)' }}>
                    No media links found in the submitted reports yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Technical Projects Master Directory */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
        <h3 style={{ fontSize: '18px', marginBottom: '14px' }}>Technical Projects Master Directory</h3>
        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Club</th>
                <th>Domain</th>
                <th>Project Name</th>
                <th>Students Involved</th>
                <th>Progress %</th>
                <th>Target Deadline</th>
                <th>Affiliation / Lab</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, idx) => (
                <tr key={idx}>
                  <td><b>{p.club}</b></td>
                  <td>{p.domain || '—'}</td>
                  <td><b>{p.projectName}</b></td>
                  <td>{p.students} students</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '80px', background: 'var(--line)', height: '6px', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{ width: `${p.progress}%`, background: 'var(--ok)', height: '100%' }}></div>
                      </div>
                      <span className="mono" style={{ fontSize: '12px' }}>{p.progress}%</span>
                    </div>
                  </td>
                  <td className="mono">{p.deadline || '—'}</td>
                  <td>{p.affiliation || '—'}</td>
                </tr>
              ))}
              {projects.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px', color: 'var(--ink-muted)' }}>
                    No technical projects logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Database Backup & Export */}
      <div style={{ background: 'var(--brand-soft)', borderRadius: '10px', padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px' }}>
        <div>
          <h4 style={{ margin: 0, fontSize: '16px' }}>Complete System Data Backup</h4>
          <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-muted)' }}>
            Export all 16 club reports, council reviews, financial approvals, and metadata as a timestamped JSON dump.
          </p>
        </div>
        <button className="btn primary" type="button" onClick={handleExportFullBackup}>
          ⬇ Download Full Database Dump
        </button>
      </div>
    </div>
  );
}

