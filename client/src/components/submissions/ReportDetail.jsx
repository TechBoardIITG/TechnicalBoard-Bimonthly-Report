import React from 'react';
import { SCORE_X } from '../../constants/referenceData';
import ReadOnlyReport from './ReadOnlyReport';

const RATED_SECTIONS = [
  { key: 'ctm', no: '1', title: 'Previous CTM progress review', nav: 'CTM review' },
  { key: 'team', no: '2', title: 'Membership & team health', nav: 'Membership' },
  { key: 'events', no: '3', title: 'Events conducted', nav: 'Events' },
  { key: 'comps', no: '4', title: 'Competitions & achievements', nav: 'Competitions' },
  { key: 'projects', no: '5', title: 'Projects & technical development', nav: 'Projects' },
  { key: 'outreach', no: '6', title: 'Outreach & visibility', nav: 'Outreach' },
  { key: 'finance', no: '7', title: 'Financial tracking', nav: 'Finance' },
];

const scoreTxt = (s) => (s && s.x ? `${s.x}.${s.y || '–'}` : '—');

export default function ReportDetail({
  report,
  councilReview,
  setCouncilReview,
  reviewState,
  onSaveReview,
  onBack,
  onEditInForm,
}) {
  const status = report.reviewed ? 'reviewed' : report.status || 'draft';

  return (
    <div className="detail" id="detail">
      <div className="detail-head">
        <button className="btn" id="btnBack" type="button" onClick={onBack}>
          ← All submissions
        </button>
        <button className="btn primary" type="button" onClick={() => onEditInForm(report)}>
          ✎ Edit this report in Form
        </button>
        <h2 id="dTitle">
          {report.reportId} · {report.clubName || report.club}
        </h2>
        <span className={`pill ${status}`}>
          {status[0].toUpperCase() + status.slice(1)}
        </span>
        <span className="meta">
          Period: {report.periodFrom || '?'} → {report.periodTo || '?'}
        </span>
      </div>

      {/* Self Scores Comparison Chips */}
      <div className="cmp">
        {RATED_SECTIONS.map((s) => (
          <div key={s.key}>
            <span className="k">{s.no}. {s.nav} · self</span>
            <span className="v">{scoreTxt(report.report?.[s.key]?.self)}</span>
          </div>
        ))}
      </div>

      {/* Council Review Form */}
      <section className="sec" id="reviewForm">
        <header className="sec-head">
          <span className="sec-no">TB</span>
          <h2>Council review & audit</h2>
          <p>For use by the Technical Board Council only. Compare with self-assessment scores and provide strategic observations.</p>
        </header>

        <div className="fgrid">
          <div className="group full">
            <h3><span className="gno">A</span>Section ratings</h3>
            <p className="gnote">Same scale as the self-assessment: X from 1 to 5, Y from 1 to 9.</p>
            <div className="fgrid">
              {RATED_SECTIONS.map((s) => {
                const curSelf = scoreTxt(report.report?.[s.key]?.self);
                const curRev = councilReview?.[s.key] || {};
                return (
                  <div key={s.key} className="field full">
                    <span className="lbl">{s.no}. {s.title}</span>
                    <div className="score">
                      <select
                        aria-label="Score X"
                        value={curRev.x || ''}
                        onChange={(e) => setCouncilReview({
                          ...councilReview,
                          [s.key]: { ...curRev, x: e.target.value }
                        })}
                      >
                        <option value="">Select X…</option>
                        {SCORE_X.map(([x, l]) => (
                          <option key={x} value={x}>{x} · {l}</option>
                        ))}
                      </select>
                      <select
                        aria-label="Score Y"
                        value={curRev.y || ''}
                        onChange={(e) => setCouncilReview({
                          ...councilReview,
                          [s.key]: { ...curRev, y: e.target.value }
                        })}
                      >
                        <option value="">Y…</option>
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((y) => (
                          <option key={y} value={y}>.{y}</option>
                        ))}
                      </select>
                      <output>{curRev.x ? `${curRev.x}.${curRev.y || '–'}` : '–'}</output>
                    </div>
                    <p className="hint">Club Self-assessed: {curSelf}</p>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="group full">
            <h3><span className="gno">B</span>Performance Indices & Rank</h3>
            <div className="fgrid">
              <div className="field third">
                <label className="lbl">Domain-wise Performance Index</label>
                <input
                  type="number"
                  step="any"
                  value={councilReview.domainIndex ?? ''}
                  onChange={(e) => setCouncilReview({ ...councilReview, domainIndex: e.target.value })}
                />
              </div>
              <div className="field third">
                <label className="lbl">Overall Club Performance Index</label>
                <input
                  type="number"
                  step="any"
                  value={councilReview.overallIndex ?? ''}
                  onChange={(e) => setCouncilReview({ ...councilReview, overallIndex: e.target.value })}
                />
              </div>
              <div className="field third">
                <label className="lbl">Overall club rank (of 16)</label>
                <input
                  type="number"
                  min="1"
                  max="16"
                  value={councilReview.rank ?? ''}
                  onChange={(e) => setCouncilReview({ ...councilReview, rank: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="group full">
            <h3><span className="gno">C</span>Observations & Actions</h3>
            <div className="fgrid">
              <div className="field full">
                <label className="lbl">Key strengths observed</label>
                <textarea
                  rows={3}
                  value={councilReview.strengths || ''}
                  onChange={(e) => setCouncilReview({ ...councilReview, strengths: e.target.value })}
                  placeholder="Notable highlights and strong achievements..."
                />
              </div>
              <div className="field full">
                <label className="lbl">Key gaps / concerns observed</label>
                <textarea
                  rows={3}
                  value={councilReview.gaps || ''}
                  onChange={(e) => setCouncilReview({ ...councilReview, gaps: e.target.value })}
                  placeholder="Areas needing improvement or risk mitigation..."
                />
              </div>
              <div className="field full">
                <label className="lbl">Actions assigned to the club</label>
                <textarea
                  rows={2}
                  value={councilReview.toClub || ''}
                  onChange={(e) => setCouncilReview({ ...councilReview, toClub: e.target.value })}
                />
              </div>
              <div className="field full">
                <label className="lbl">Actions assigned from the club to the TB Council</label>
                <textarea
                  rows={2}
                  value={councilReview.toCouncil || ''}
                  onChange={(e) => setCouncilReview({ ...councilReview, toCouncil: e.target.value })}
                />
              </div>
              <div className="field full">
                <label className="lbl">Overall review by the General Secretary, Technical Board</label>
                <textarea
                  rows={4}
                  value={councilReview.gsReview || ''}
                  onChange={(e) => setCouncilReview({ ...councilReview, gsReview: e.target.value })}
                  placeholder="GS remarks and final appraisal..."
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="toolbar" style={{ marginBlock: '12px' }}>
        <button className="btn primary" id="btnSaveReview" type="button" onClick={onSaveReview}>
          Save council review to MongoDB
        </button>
        <span className="state">{reviewState}</span>
      </div>

      {/* Read-Only Club Report View */}
      <details className="box" open>
        <summary>Report as saved by the club</summary>
        <div className="inner">
          <fieldset className="ro" disabled>
            <ReadOnlyReport report={report.report || {}} />
          </fieldset>
        </div>
      </details>
    </div>
  );
}

