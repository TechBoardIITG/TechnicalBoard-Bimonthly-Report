import React, { useState, useEffect } from 'react';
import TechSecyPanel from '../components/admin/TechSecyPanel';
import OCPanel from '../components/admin/OCPanel';
import EventsHeadPanel from '../components/admin/EventsHeadPanel';
import WebmasterPanel from '../components/admin/WebmasterPanel';
import { api } from '../services/api';

export default function AdminDashboardPage({
  currentRole = 'techsecy',
  setCurrentRole,
  reports = [],
  onOpenReport,
}) {
  const [adminData, setAdminData] = useState({
    stats: {},
    allEvents: [],
    allProjects: [],
    allApprovals: [],
    allRisksAndIssues: [],
    allMediaLinks: [],
  });
  const [loading, setLoading] = useState(true);

  const fetchAdminStats = async () => {
    setLoading(true);
    try {
      const data = await api.getAdminStats();
      if (data && data.success) {
        setAdminData(data);
      }
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminStats();
  }, [reports]);

  const roles = [
    { id: 'techsecy', title: 'General Secretary (TechSecy)', icon: '🏛️', desc: 'Executive overview, audit rankings & appraisals' },
    { id: 'oc', title: 'Overall Coordinator (OC)', icon: '👥', desc: 'Club health, membership retention & RIO radar' },
    { id: 'events', title: 'Events Head', icon: '🎪', desc: 'Events turnout, reach analytics & media checks' },
    { id: 'webmaster', title: 'Webmaster', icon: '⚙️', desc: 'Assets repository, DB statistics & JSON backups' },
  ];

  return (
    <div className="subs" style={{ paddingTop: '16px' }}>
      {/* Role Navigation Bar */}
      <div style={{ background: 'var(--surface)', border: '1px solid var(--line)', borderRadius: '10px', padding: '14px 18px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '20px', margin: 0 }}>Council Leadership Admin Panel</h2>
          <p style={{ fontSize: '13px', color: 'var(--ink-muted)', margin: 0 }}>
            Unified view of all details filed by the 16 Technical Board clubs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {roles.map((r) => (
            <button
              key={r.id}
              className={`btn ${currentRole === r.id ? 'primary' : 'ghost'}`}
              style={{ padding: '6px 12px', fontSize: '13px' }}
              onClick={() => setCurrentRole(r.id)}
            >
              <span>{r.icon}</span> {r.title}
            </button>
          ))}
          <button className="btn" onClick={fetchAdminStats} style={{ padding: '6px 12px' }}>
            🔄 Refresh Data
          </button>
        </div>
      </div>

      {/* Role View Banner */}
      <div style={{ background: 'var(--brand-soft)', borderRadius: '8px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <span style={{ fontSize: '22px' }}>
          {roles.find((r) => r.id === currentRole)?.icon}
        </span>
        <div>
          <b style={{ fontSize: '14px' }}>
            Active Perspective: {roles.find((r) => r.id === currentRole)?.title}
          </b>
          <p style={{ fontSize: '12.5px', color: 'var(--ink-muted)', margin: 0 }}>
            {roles.find((r) => r.id === currentRole)?.desc}
          </p>
        </div>
      </div>

      {/* Dynamic Role Panel */}
      {loading ? (
        <div className="emptybox" style={{ background: 'var(--surface)', borderRadius: '10px', border: '1px solid var(--line)' }}>
          Aggregating club data from MongoDB…
        </div>
      ) : (
        <>
          {currentRole === 'techsecy' && (
            <TechSecyPanel
              stats={adminData.stats}
              reports={reports}
              onOpenReport={onOpenReport}
            />
          )}

          {currentRole === 'oc' && (
            <OCPanel
              reports={reports}
              risksAndIssues={adminData.allRisksAndIssues}
            />
          )}

          {currentRole === 'events' && (
            <EventsHeadPanel
              events={adminData.allEvents}
              stats={adminData.stats}
            />
          )}

          {currentRole === 'webmaster' && (
            <WebmasterPanel
              mediaLinks={adminData.allMediaLinks}
              projects={adminData.allProjects}
              stats={adminData.stats}
              reports={reports}
            />
          )}
        </>
      )}
    </div>
  );
}

