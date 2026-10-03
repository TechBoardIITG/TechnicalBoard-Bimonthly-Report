import React, { useState } from 'react';
import { SelfAssessmentSection } from '../common/FormControls';

export default function SectionCTM({ data = {}, onChange }) {
  const [armedDelete, setArmedDelete] = useState({});

  return (
    <section className="sec" id="sec-ctm">
      <header className="sec-head">
        <span className="sec-no">1</span>
        <h2>Previous CTM progress review</h2>
        <p>Checks progress on the actions decided in the last Core Team Meeting.</p>
      </header>
      <div className="fgrid">
        <div className="group full">
          <h3>
            <span className="gno">1.1</span>Progress review on pending actions
          </h3>
          <div className="full">
            <details className="guide">
              <summary>Guide to % completion</summary>
              <div className="gbody">
                <dl className="gtable">
                  <dt>5%</dt>
                  <dd>Work will start after this report is submitted</dd>
                  <dt>10%</dt>
                  <dd>Timeline made and work is in progress</dd>
                  <dt>50%</dt>
                  <dd>Significant progress that can be highlighted</dd>
                  <dt>75%</dt>
                  <dd>Done for now, may be updated later</dd>
                  <dt>100%</dt>
                  <dd>Done, no further updates expected</dd>
                </dl>
              </div>
            </details>
          </div>

          <div className="reps full">
            {(data.actions || []).map((act, idx) => (
              <div key={idx} className="rep">
                <div className="rep-head">
                  <span className="rep-title">Action item {idx + 1}</span>
                  <button
                    type="button"
                    className="del"
                    data-armed={armedDelete[idx] ? '' : undefined}
                    onClick={() => {
                      if (!armedDelete[idx]) {
                        setArmedDelete({ ...armedDelete, [idx]: true });
                        setTimeout(() => setArmedDelete((a) => ({ ...a, [idx]: false })), 3500);
                      } else {
                        const next = [...(data.actions || [])];
                        next.splice(idx, 1);
                        onChange('ctm.actions', next);
                      }
                    }}
                  >
                    {armedDelete[idx] ? 'Confirm remove' : 'Remove'}
                  </button>
                </div>
                <div className="fgrid">
                  <div className="field full">
                    <label className="lbl">Action item discussed</label>
                    <textarea
                      rows={2}
                      value={act.item || ''}
                      onChange={(e) => onChange(`ctm.actions.${idx}.item`, e.target.value)}
                      placeholder="Describe the action item..."
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Work progress details</label>
                    <textarea
                      rows={2}
                      value={act.progress || ''}
                      onChange={(e) => onChange(`ctm.actions.${idx}.progress`, e.target.value)}
                      placeholder="Current status and outcomes..."
                    />
                  </div>
                  <div className="field half">
                    <label className="lbl">% completion</label>
                    <select
                      value={act.pct || ''}
                      onChange={(e) => onChange(`ctm.actions.${idx}.pct`, e.target.value)}
                    >
                      <option value="">Select…</option>
                      <option value="5">5% · starts after submission</option>
                      <option value="10">10% · timeline made, in progress</option>
                      <option value="50">50% · significant progress</option>
                      <option value="75">75% · done for now</option>
                      <option value="100">100% · complete</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add"
              onClick={() => onChange('ctm.actions', [...(data.actions || []), {}])}
            >
              + Add action item
            </button>
          </div>
        </div>

        <SelfAssessmentSection
          title="Self-assessment: Previous CTM progress review"
          value={data.self}
          onChange={(v) => onChange('ctm.self', v)}
        />
      </div>
    </section>
  );
}

