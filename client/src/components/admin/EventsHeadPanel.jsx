import React, { useState } from 'react';

export default function EventsHeadPanel({ events = [], stats = {} }) {
  const [filterDomain, setFilterDomain] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter((e) => {
    if (filterDomain && e.domain !== filterDomain) return false;
    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      return (
        e.eventName?.toLowerCase().includes(q) ||
        e.club?.toLowerCase().includes(q) ||
        e.clubName?.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {/* Events KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Total Events Conducted</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--brand)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {stats.totalEventsConducted || 0}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>
            Planned: <b>{stats.totalEventsPlanned || 0}</b> ({stats.totalEventsPlanned ? Math.round(((stats.totalEventsConducted || 0) / stats.totalEventsPlanned) * 100) : 0}%)
          </div>
        </div>

        <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '16px' }}>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', textTransform: 'uppercase' }}>Total Footfall / Audience</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: 'var(--accent)', fontFamily: 'var(--f-display)', marginTop: '4px' }}>
            {(stats.totalAudience || 0).toLocaleString()}
          </div>
          <div style={{ fontSize: '12px', color: 'var(--ink-muted)', marginTop: '2px' }}>
            Avg. Reach: <b>{stats.totalEventsConducted ? Math.round((stats.totalAudience || 0) / stats.totalEventsConducted) : 0}</b> per event
          </div>
        </div>
      </div>

      {/* All-Club Unified Events Tracker */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
          <div>
            <h3 style={{ fontSize: '18px' }}>Master Events & Workshop Tracker</h3>
            <p style={{ fontSize: '13px', color: 'var(--ink-muted)' }}>Review reach-to-turnup ratios, participation turnouts, and event media drive links.</p>
          </div>
          <div className="filters">
            <input
              type="text"
              placeholder="Search event name or club…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '180px' }}
            />
            <select value={filterDomain} onChange={(e) => setFilterDomain(e.target.value)}>
              <option value="">All Domains</option>
              <option value="Hardware">Hardware</option>
              <option value="Software">Software</option>
              <option value="Science">Science</option>
              <option value="Business">Business</option>
            </select>
          </div>
        </div>

        <div className="tablewrap">
          <table>
            <thead>
              <tr>
                <th>Club</th>
                <th>Domain</th>
                <th>Event Name</th>
                <th>Timeline</th>
                <th>Reach</th>
                <th>Turnup</th>
                <th>Reach:Turnup Ratio</th>
                <th>Media Link</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt, idx) => (
                <tr key={idx}>
                  <td><b>{evt.club}</b></td>
                  <td>{evt.domain || '—'}</td>
                  <td><b>{evt.eventName}</b></td>
                  <td>{evt.timeline || '—'}</td>
                  <td>{evt.reach || 0}</td>
                  <td>{evt.turnup || 0}</td>
                  <td className="mono">
                    <span className="pill" style={{ background: 'var(--brand-soft)', color: 'var(--brand)' }}>
                      {evt.ratio} : 1
                    </span>
                  </td>
                  <td>
                    {evt.media ? (
                      <a href={evt.media} target="_blank" rel="noreferrer" className="link">
                        Google Drive ↗
                      </a>
                    ) : (
                      <span style={{ color: 'var(--ink-muted)', fontSize: '12px' }}>None</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredEvents.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '24px', color: 'var(--ink-muted)' }}>
                    No events match the current criteria.
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

