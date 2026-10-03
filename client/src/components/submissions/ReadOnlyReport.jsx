import React from 'react';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));
const pad = (n) => String(n).padStart(2, '0');
const inr = (v) => (v == null ? '—' : '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 2 }));
const code = (r) => r?.cover?.club || 'CODE';
const yy = (r) => {
  const t = r?.cover?.periodTo || '';
  return /^\d{4}/.test(t) ? t.slice(2, 4) : '26';
};
const idFor = (r, kind, item, i) => `TB-${code(r)}-${kind}-${pad(N(item?.no) ?? (i + 1))}-${yy(r)}`;
const scoreTxt = (s) => (s && s.x ? `${s.x}.${s.y || '–'}` : '—');

export default function ReadOnlyReport({ report = {} }) {
  return (
    <div style={{ display: 'grid', gap: '20px' }}>
      {/* 0. Cover */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">0</span>
          <h2>Cover</h2>
        </header>
        <div className="fgrid">
          <div className="field half">
            <span className="lbl">Club:</span>
            <input readOnly value={report.cover?.club || ''} />
          </div>
          <div className="field half">
            <span className="lbl">Report ID:</span>
            <input readOnly value={report.cover?.club && report.cover?.reportNo ? `TB-${report.cover.club}-${report.cover.reportNo}` : '—'} />
          </div>
          <div className="field half">
            <span className="lbl">Secretary:</span>
            <input readOnly value={report.cover?.secretary || ''} />
          </div>
          <div className="field half">
            <span className="lbl">Period:</span>
            <input readOnly value={`${report.cover?.periodFrom || ''} → ${report.cover?.periodTo || ''}`} />
          </div>
        </div>
      </section>

      {/* 1. CTM */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">1</span>
          <h2>Previous CTM progress review</h2>
        </header>
        <div className="fgrid">
          {(report.ctm?.actions || []).map((a, i) => (
            <div key={i} className="rep full">
              <b>Action {i + 1}:</b> {a.item || '—'} ({a.pct || 0}% complete)
              <p style={{ marginTop: '4px', fontSize: '13px' }}>{a.progress || 'No details'}</p>
            </div>
          ))}
          <div className="field full">
            <span className="lbl">Self Score:</span>
            <output className="calc">{scoreTxt(report.ctm?.self)}</output>
          </div>
        </div>
      </section>

      {/* 2. Membership */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">2</span>
          <h2>Membership & team health</h2>
        </header>
        <div className="fgrid">
          <div className="field q"><span className="lbl">TB Heads:</span> <input readOnly value={report.team?.heads ?? '—'} /></div>
          <div className="field q"><span className="lbl">Core:</span> <input readOnly value={report.team?.core ?? '—'} /></div>
          <div className="field q"><span className="lbl">Members:</span> <input readOnly value={report.team?.members ?? '—'} /></div>
          <div className="field q"><span className="lbl">Inducted:</span> <input readOnly value={report.team?.inducted ?? '—'} /></div>
          <div className="field half"><span className="lbl">Internal Health:</span> <input readOnly value={report.team?.internalHealth ?? '—'} /></div>
          <div className="field half"><span className="lbl">Overall Health:</span> <input readOnly value={report.team?.overallHealth ?? '—'} /></div>
          <div className="field full"><span className="lbl">Self Score:</span> <output className="calc">{scoreTxt(report.team?.self)}</output></div>
        </div>
      </section>

      {/* 3. Events */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">3</span>
          <h2>Events conducted</h2>
        </header>
        <div className="fgrid">
          <div className="field third"><span className="lbl">Planned:</span> <input readOnly value={report.events?.planned ?? '—'} /></div>
          <div className="field third"><span className="lbl">Conducted:</span> <input readOnly value={report.events?.conducted ?? '—'} /></div>
          <div className="field third"><span className="lbl">Audience:</span> <input readOnly value={report.events?.audience ?? '—'} /></div>
          {(report.events?.events || []).map((e, i) => (
            <div key={i} className="rep full">
              <b>{e.name || `Event ${i + 1}`} ({idFor(report, 'EVT', e, i)}):</b> Reach: {e.reach || '—'}, Turnup: {e.turnup || '—'}
              <p style={{ marginTop: '4px', fontSize: '13px' }}>{e.purpose || ''}</p>
            </div>
          ))}
          <div className="field full"><span className="lbl">Self Score:</span> <output className="calc">{scoreTxt(report.events?.self)}</output></div>
        </div>
      </section>

      {/* 4. Competitions */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">4</span>
          <h2>Competitions & achievements</h2>
        </header>
        <div className="fgrid">
          {(report.comps?.comps || []).map((c, i) => (
            <div key={i} className="rep full">
              <b>Competition {i + 1}: {c.name || 'Unnamed'} ({idFor(report, 'COM', c, i)})</b>
              <p style={{ marginTop: '4px', fontSize: '13px' }}>
                Participants: {(c.participants || []).map((p) => `${p.pname || ''} (${p.roll || ''})`).filter(Boolean).join(', ') || 'None'}
              </p>
            </div>
          ))}
          {(report.comps?.achs || []).map((a, i) => (
            <div key={i} className="rep full">
              <b>Achievement {i + 1}: {a.positions || 'Position'}</b> ({a.comp || a.compName || '—'})
              <p style={{ marginTop: '4px', fontSize: '13px' }}>{a.highlight || ''}</p>
            </div>
          ))}
          <div className="field full"><span className="lbl">Self Score:</span> <output className="calc">{scoreTxt(report.comps?.self)}</output></div>
        </div>
      </section>

      {/* 5. Projects */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">5</span>
          <h2>Projects & technical development</h2>
        </header>
        <div className="fgrid">
          <div className="field third"><span className="lbl">Active:</span> <input readOnly value={report.projects?.active ?? '—'} /></div>
          <div className="field third"><span className="lbl">Continuing:</span> <input readOnly value={report.projects?.continuing ?? '—'} /></div>
          <div className="field third"><span className="lbl">Newly:</span> <input readOnly value={report.projects?.newly ?? '—'} /></div>
          {(report.projects?.projects || []).map((p, i) => (
            <div key={i} className="rep full">
              <b>{p.name || `Project ${i + 1}`} ({idFor(report, 'PRO', p, i)}):</b> {p.progress ?? 0}% complete
              <p style={{ marginTop: '4px', fontSize: '13px' }}>{p.progressNote || ''}</p>
            </div>
          ))}
          <div className="field full"><span className="lbl">Self Score:</span> <output className="calc">{scoreTxt(report.projects?.self)}</output></div>
        </div>
      </section>

      {/* 6. Outreach */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">6</span>
          <h2>Outreach & visibility</h2>
        </header>
        <div className="fgrid">
          <div className="field half"><span className="lbl">Instagram Followers:</span> <input readOnly value={`${report.outreach?.social?.instagram?.before || 0} → ${report.outreach?.social?.instagram?.after || 0}`} /></div>
          <div className="field half"><span className="lbl">LinkedIn Followers:</span> <input readOnly value={`${report.outreach?.social?.linkedin?.before || 0} → ${report.outreach?.social?.linkedin?.after || 0}`} /></div>
          <div className="field full"><span className="lbl">Self Score:</span> <output className="calc">{scoreTxt(report.outreach?.self)}</output></div>
        </div>
      </section>

      {/* 7. Finance */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">7</span>
          <h2>Financial tracking</h2>
        </header>
        <div className="fgrid">
          {(report.finance?.approvals || []).map((a, i) => (
            <div key={i} className="rep full">
              <b>{a.name || `Approval ${i + 1}`}:</b> Sanctioned: {inr(a.sanctioned)}, Spent: {inr(a.spent)}, Utilized: {inr(a.utilized)}
            </div>
          ))}
          <div className="field full"><span className="lbl">Self Score:</span> <output className="calc">{scoreTxt(report.finance?.self)}</output></div>
        </div>
      </section>

      {/* 8. RIO */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">8</span>
          <h2>Risks, issues, opportunities</h2>
        </header>
        <div className="fgrid">
          {(report.rio?.rio || []).map((r, i) => (
            <div key={i} className="rep full">
              <b>[{r.type || 'Entry'}] {r.area || 'General'}:</b> {r.action || '—'} {r.deadline ? `(By: ${r.deadline})` : ''}
            </div>
          ))}
        </div>
      </section>

      {/* 9. Declaration */}
      <section className="sec">
        <header className="sec-head">
          <span className="sec-no">9</span>
          <h2>Self-declaration</h2>
        </header>
        <div className="fgrid">
          <div className="field half"><span className="lbl">Confirmed:</span> <input readOnly value={report.decl?.agree ? 'Yes' : 'No'} /></div>
          <div className="field half"><span className="lbl">Signature:</span> <input readOnly value={report.decl?.signature || '—'} /></div>
        </div>
      </section>
    </div>
  );
}

