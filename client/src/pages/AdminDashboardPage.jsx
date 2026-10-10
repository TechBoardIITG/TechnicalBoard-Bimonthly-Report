import React, { useState, useEffect } from 'react';
import TechSecyPanel from '../components/admin/TechSecyPanel';
import OCPanel from '../components/admin/OCPanel';
import EventsHeadPanel from '../components/admin/EventsHeadPanel';
import WebmasterPanel from '../components/admin/WebmasterPanel';
import ReportDetail from '../components/submissions/ReportDetail';
import { api } from '../services/api';

export default function AdminDashboardPage({
  currentRole = 'techsecy',
  setCurrentRole,
  reports = [],
  onOpenReport,
  detailReport = null,
  setDetailReport,
  councilReview = {},
  setCouncilReview,
  reviewState = '',
  onSaveReview,
  user = null,
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

  if (detailReport) {
    return (
      <div className="subs admin-page" style={{ paddingTop: '16px' }}>
        <ReportDetail
          report={detailReport}
          councilReview={councilReview}
          setCouncilReview={setCouncilReview}
          reviewState={reviewState}
          onSaveReview={onSaveReview}
          onBack={() => setDetailReport && setDetailReport(null)}
          onEditInForm={null}
          user={user}
        />
      </div>
    );
  }

  return (
    <div className="subs admin-page" style={{ paddingTop: '16px' }}>
      {/* Role Navigation Bar */}
      <div className="admin-header-card">
        <div className="admin-title-group">
          <h2>Council Leadership Admin Panel</h2>
          <p>
            Unified view of all details filed by the 16 Technical Board clubs.
          </p>
        </div>

        <div className="admin-roles-group">
          {roles.map((r) => (
            <button
              key={r.id}
              className={`btn role-btn ${currentRole === r.id ? 'primary' : 'ghost'}`}
              onClick={() => setCurrentRole(r.id)}
            >
              <span className="role-icon">{r.icon}</span> <span className="role-name">{r.title}</span>
            </button>
          ))}
          <button className="btn refresh-btn" onClick={fetchAdminStats}>
            🔄 Refresh Data
          </button>
        </div>
      </div>

      {/* Role View Banner */}
      <div className="admin-role-banner">
        <span className="banner-icon">
          {roles.find((r) => r.id === currentRole)?.icon}
        </span>
        <div>
          <b>
            Active Perspective: {roles.find((r) => r.id === currentRole)?.title}
          </b>
          <p>
            {roles.find((r) => r.id === currentRole)?.desc}
          </p>
        </div>
      </div>

      {/* Dynamic Role Panel */}
      {loading ? (
        <div className="emptybox admin-loading-box">
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

