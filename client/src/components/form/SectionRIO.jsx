import React, { useState } from 'react';

export default function SectionRIO({ data = {}, onChange }) {
  const [armedDelete, setArmedDelete] = useState({});

  return (
    <section className="sec" id="sec-rio">
      <header className="sec-head">
        <span className="sec-no">8</span>
        <h2>Risks, issues, opportunities</h2>
        <p>Anything the club may need support on from the Technical Board Council.</p>
      </header>
      <div className="fgrid">
        <div className="full">
          <details className="guide">
            <summary>What counts as a risk, issue or opportunity</summary>
            <div className="gbody">
              <dl className="gtable">
                <dt>Risk</dt><dd>An uncertainty that could hurt your objectives.</dd>
                <dt>Issue</dt><dd>A risk that has happened, or a problem affecting performance now.</dd>
                <dt>Opportunity</dt><dd>Something not yet done that could help the club.</dd>
              </dl>
            </div>
          </details>
        </div>

        <div className="reps full">
          {(data.rio || []).map((item, idx) => (
            <div key={idx} className="rep">
              <div className="rep-head">
                <span className="rep-title">Entry {idx + 1}</span>
                <button
                  type="button"
                  className="del"
                  data-armed={armedDelete[idx] ? '' : undefined}
                  onClick={() => {
                    if (!armedDelete[idx]) {
                      setArmedDelete({ ...armedDelete, [idx]: true });
                      setTimeout(() => setArmedDelete((a) => ({ ...a, [idx]: false })), 3500);
                    } else {
                      const next = [...(data.rio || [])];
                      next.splice(idx, 1);
                      onChange('rio.rio', next);
                    }
                  }}
                >
                  {armedDelete[idx] ? 'Confirm remove' : 'Remove'}
                </button>
              </div>
              <div className="fgrid">
                <div className="field third">
                  <label className="lbl">Type</label>
                  <select
                    value={item.type || ''}
                    onChange={(e) => onChange(`rio.rio.${idx}.type`, e.target.value)}
                  >
                    <option value="">Select…</option>
                    <option value="Risk">Risk</option>
                    <option value="Issue">Issue</option>
                    <option value="Opportunity">Opportunity</option>
                  </select>
                </div>
                <div className="field third">
                  <label className="lbl">Related to</label>
                  <select
                    value={item.area || ''}
                    onChange={(e) => onChange(`rio.rio.${idx}.area`, e.target.value)}
                  >
                    <option value="">Select…</option>
                    <option value="Team Health">Team Health</option>
                    <option value="Events">Events</option>
                    <option value="Projects">Projects</option>
                    <option value="Competitions">Competitions</option>
                    <option value="Outreach">Outreach</option>
                    <option value="Finances">Finances</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="field third">
                  <label className="lbl">Deadline (if any)</label>
                  <input
                    type="date"
                    value={item.deadline || ''}
                    onChange={(e) => onChange(`rio.rio.${idx}.deadline`, e.target.value)}
                  />
                </div>
                <div className="field full">
                  <label className="lbl">Action description</label>
                  <textarea
                    rows={2}
                    value={item.action || ''}
                    onChange={(e) => onChange(`rio.rio.${idx}.action`, e.target.value)}
                  />
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="add"
            onClick={() => onChange('rio.rio', [...(data.rio || []), {}])}
          >
            + Add entry
          </button>
        </div>

        <div className="field full">
          <label className="lbl">Anything else that isn’t a risk, issue or opportunity</label>
          <textarea
            rows={3}
            value={data.otherInfo || ''}
            onChange={(e) => onChange('rio.otherInfo', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

