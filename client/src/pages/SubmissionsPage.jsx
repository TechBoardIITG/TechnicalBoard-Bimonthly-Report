import React, { useState } from 'react';
import ReportDetail from '../components/submissions/ReportDetail';

export default function SubmissionsPage({
  submissions = [],
  loading = false,
  fDomain,
  setFDomain,
  fStatus,
  setFStatus,
  searchTerm,
  setSearchTerm,
  onRefresh,
  onExportAll,
  detailReport,
  setDetailReport,
  councilReview,
  setCouncilReview,
  reviewState,
  onSaveReview,
  onEditInForm,
}) {
  return (
    <div id="view-subs">
      <div className="subs">
        {!detailReport ? (
          <div id="subsList">
            <div className="subs-head">
              <div style={{ display: 'grid', gap: '6px' }}>
                <h2 id="subsTitle">All Submissions</h2>
                <p id="subsNote">Every report saved and synced to the MongoDB Database.</p>
              </div>
              <div className="filters">
                <input
                  type="text"
                  placeholder="Search club or ID…"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && onRefresh()}
                  style={{ width: '160px' }}
                />
                <select
                  id="fDomain"
                  aria-label="Filter by domain"
                  value={fDomain}
                  onChange={(e) => setFDomain(e.target.value)}
                >
                  <option value="">All domains</option>
                  <option>Business</option>
                  <option>Hardware</option>
                  <option>Science</option>
                  <option>Software</option>
                </select>
                <select
                  id="fStatus"
                  aria-label="Filter by status"
                  value={fStatus}
                  onChange={(e) => setFStatus(e.target.value)}
                >
                  <option value="">Any status</option>
                  <option value="draft">Draft</option>
                  <option value="submitted">Submitted</option>
                  <option value="reviewed">Reviewed</option>
                </select>
                <button className="btn" type="button" onClick={onRefresh}>
                  Refresh
                </button>
                <button className="btn" type="button" onClick={onExportAll}>
                  Export all JSON
                </button>
              </div>
            </div>

            <div className="tablewrap" style={{ marginTop: '16px' }}>
              <table>
                <thead id="subsHead">
                  <tr>
                    <th>Report ID</th>
                    <th>Club</th>
                    <th>Domain</th>
                    <th>Period</th>
                    <th>Status</th>
                    <th>Updated</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody id="subsBody">
                  {submissions.map((r) => {
                    const st = r.reviewed ? 'reviewed' : r.status || 'draft';
                    return (
                      <tr key={r._id || r.reportId}>
                        <td>
                          <button
                            className="link"
                            type="button"
                            onClick={() => setDetailReport(r)}
                          >
                            {r.reportId}
                          </button>
                        </td>
                        <td>{r.clubName || r.club || '—'}</td>
                        <td>{r.domain || '—'}</td>
                        <td className="mono">{r.periodFrom || '?'} → {r.periodTo || '?'}</td>
                        <td>
                          <span className={`pill ${st}`}>
                            {st[0].toUpperCase() + st.slice(1)}
                          </span>
                        </td>
                        <td>
                          {r.updatedAt
                            ? new Date(r.updatedAt).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })
                            : '—'}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              className="btn"
                              style={{ padding: '3px 8px', fontSize: '12px' }}
                              onClick={() => setDetailReport(r)}
                            >
                              Review
                            </button>
                            <button
                              className="btn"
                              style={{ padding: '3px 8px', fontSize: '12px' }}
                              onClick={() => onEditInForm(r)}
                            >
                              Edit
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {submissions.length === 0 && (
                <div className="emptybox">
                  {loading
                    ? 'Loading submissions from MongoDB…'
                    : 'No reports saved yet. Fill in the report form and choose Save draft or Submit; it will appear here.'}
                </div>
              )}
            </div>
          </div>
        ) : (
          <ReportDetail
            report={detailReport}
            councilReview={councilReview}
            setCouncilReview={setCouncilReview}
            reviewState={reviewState}
            onSaveReview={onSaveReview}
            onBack={() => setDetailReport(null)}
            onEditInForm={onEditInForm}
          />
        )}
      </div>
    </div>
  );
}

