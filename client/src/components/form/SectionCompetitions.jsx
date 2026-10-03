import React, { useState } from 'react';
import { YesNoRating, SelfAssessmentSection } from '../common/FormControls';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));
const pad = (n) => String(n).padStart(2, '0');
const code = (r) => r?.cover?.club || 'CODE';
const yy = (r) => {
  const t = r?.cover?.periodTo || '';
  return /^\d{4}/.test(t) ? t.slice(2, 4) : '26';
};
const idFor = (r, kind, item, i) => `TB-${code(r)}-${kind}-${pad(N(item?.no) ?? (i + 1))}-${yy(r)}`;

export default function SectionCompetitions({ data = {}, formState = {}, onChange }) {
  const [armedDeleteComp, setArmedDeleteComp] = useState({});
  const [armedDeleteAch, setArmedDeleteAch] = useState({});

  return (
    <section className="sec" id="sec-comps">
      <header className="sec-head">
        <span className="sec-no">4</span>
        <h2>Competitions & achievements</h2>
        <p>Use the competitions list for ongoing or upcoming participation. Move a competition to the achievements list once participation is complete.</p>
      </header>
      <div className="fgrid">
        <div className="group full">
          <h3><span className="gno">4.1</span>Competitions list</h3>
          <div className="reps full">
            {(data.comps || []).map((comp, idx) => (
              <div key={idx} className="rep">
                <div className="rep-head">
                  <span className="rep-title">Competition {idx + 1}</span>
                  <output className="idchip">{idFor(formState, 'COM', comp, idx)}</output>
                  <button
                    type="button"
                    className="del"
                    data-armed={armedDeleteComp[idx] ? '' : undefined}
                    onClick={() => {
                      if (!armedDeleteComp[idx]) {
                        setArmedDeleteComp({ ...armedDeleteComp, [idx]: true });
                        setTimeout(() => setArmedDeleteComp((a) => ({ ...a, [idx]: false })), 3500);
                      } else {
                        const next = [...(data.comps || [])];
                        next.splice(idx, 1);
                        onChange('comps.comps', next);
                      }
                    }}
                  >
                    {armedDeleteComp[idx] ? 'Confirm remove' : 'Remove'}
                  </button>
                </div>
                <div className="fgrid">
                  <div className="field half">
                    <label className="lbl">Competition</label>
                    <input
                      type="text"
                      value={comp.name || ''}
                      onChange={(e) => onChange(`comps.comps.${idx}.name`, e.target.value)}
                    />
                  </div>
                  <div className="field q">
                    <label className="lbl">ID number</label>
                    <input
                      type="number"
                      min="1"
                      value={comp.no ?? (idx + 1)}
                      onChange={(e) => onChange(`comps.comps.${idx}.no`, N(e.target.value))}
                    />
                  </div>
                  <div className="field q">
                    <span className="lbl">Competition ID</span>
                    <output className="calc">{idFor(formState, 'COM', comp, idx)}</output>
                  </div>

                  <div className="field full">
                    <label className="lbl">Background and scale of the competition</label>
                    <textarea
                      rows={2}
                      value={comp.background || ''}
                      onChange={(e) => onChange(`comps.comps.${idx}.background`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Round-wise timeline and finale dates</label>
                    <textarea
                      rows={2}
                      value={comp.timeline || ''}
                      onChange={(e) => onChange(`comps.comps.${idx}.timeline`, e.target.value)}
                    />
                  </div>

                  <div className="full">
                    <span className="lbl">Participating students</span>
                    <div className="reps">
                      {(comp.participants || []).map((p, pidx) => (
                        <div key={pidx} className="rep compact">
                          <div className="rep-head">
                            <span className="rep-title">Student {pidx + 1}</span>
                            <button
                              type="button"
                              className="del"
                              onClick={() => {
                                const nextP = [...(comp.participants || [])];
                                nextP.splice(pidx, 1);
                                onChange(`comps.comps.${idx}.participants`, nextP);
                              }}
                            >
                              Remove
                            </button>
                          </div>
                          <div className="fgrid">
                            <div className="field half">
                              <label className="lbl">Name</label>
                              <input
                                type="text"
                                value={p.pname || ''}
                                onChange={(e) => onChange(`comps.comps.${idx}.participants.${pidx}.pname`, e.target.value)}
                              />
                            </div>
                            <div className="field half">
                              <label className="lbl">Roll number</label>
                              <input
                                type="text"
                                value={p.roll || ''}
                                onChange={(e) => onChange(`comps.comps.${idx}.participants.${pidx}.roll`, e.target.value)}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="add"
                        onClick={() => onChange(`comps.comps.${idx}.participants`, [...(comp.participants || []), {}])}
                      >
                        + Add student
                      </button>
                    </div>
                  </div>

                  <div className="field third">
                    <span className="lbl">Number of students participating</span>
                    <output className="calc">
                      {(comp.participants || []).filter((p) => p && (p.pname || p.roll)).length}
                    </output>
                  </div>
                  <div className="field third">
                    <span className="lbl">Registration completed</span>
                    <YesNoRating
                      value={comp.registered}
                      onChange={(v) => onChange(`comps.comps.${idx}.registered`, v)}
                    />
                  </div>
                  <div className="field third">
                    <span className="lbl">Budget allocated / approved</span>
                    <YesNoRating
                      value={comp.budget}
                      onChange={(v) => onChange(`comps.comps.${idx}.budget`, v)}
                    />
                  </div>

                  <div className="field full">
                    <label className="lbl">If flagship: your position last year</label>
                    <textarea
                      rows={2}
                      value={comp.lastYear || ''}
                      onChange={(e) => onChange(`comps.comps.${idx}.lastYear`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Any other details</label>
                    <textarea
                      rows={2}
                      value={comp.other || ''}
                      onChange={(e) => onChange(`comps.comps.${idx}.other`, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add"
              onClick={() => onChange('comps.comps', [...(data.comps || []), { participants: [{}] }])}
            >
              + Add competition
            </button>
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">4.2</span>Achievements list</h3>
          <div className="reps full">
            {(data.achs || []).map((ach, idx) => (
              <div key={idx} className="rep">
                <div className="rep-head">
                  <span className="rep-title">Achievement {idx + 1}</span>
                  <button
                    type="button"
                    className="del"
                    data-armed={armedDeleteAch[idx] ? '' : undefined}
                    onClick={() => {
                      if (!armedDeleteAch[idx]) {
                        setArmedDeleteAch({ ...armedDeleteAch, [idx]: true });
                        setTimeout(() => setArmedDeleteAch((a) => ({ ...a, [idx]: false })), 3500);
                      } else {
                        const next = [...(data.achs || [])];
                        next.splice(idx, 1);
                        onChange('comps.achs', next);
                      }
                    }}
                  >
                    {armedDeleteAch[idx] ? 'Confirm remove' : 'Remove'}
                  </button>
                </div>
                <div className="fgrid">
                  <div className="field half">
                    <label className="lbl">Competition name</label>
                    <input
                      type="text"
                      list={`comp-list-${idx}`}
                      placeholder="Enter competition name (e.g. Inter IIT Tech Meet, Robocon...)"
                      value={ach.compName ?? ach.comp ?? ''}
                      onChange={(e) => {
                        onChange(`comps.achs.${idx}.compName`, e.target.value);
                        onChange(`comps.achs.${idx}.comp`, e.target.value);
                      }}
                    />
                    <datalist id={`comp-list-${idx}`}>
                      {(data.comps || []).filter((c) => c && c.name).map((c, cidx) => (
                        <option key={cidx} value={c.name}>
                          {c.name} ({idFor(formState, 'COM', c, cidx)})
                        </option>
                      ))}
                    </datalist>
                  </div>
                  <div className="field half">
                    <label className="lbl">Position(s) achieved</label>
                    <input
                      type="text"
                      placeholder="e.g. 1st Place, Gold Medal, Top 5..."
                      value={ach.positions || ''}
                      onChange={(e) => onChange(`comps.achs.${idx}.positions`, e.target.value)}
                    />
                  </div>

                  <div className="field half">
                    <span className="lbl">Achievement shared with the Chairperson</span>
                    <YesNoRating
                      value={ach.shared}
                      onChange={(v) => onChange(`comps.achs.${idx}.shared`, v)}
                    />
                  </div>
                  <div className="field half">
                    <label className="lbl">Performance rating (out of 10)</label>
                    <select
                      value={ach.perfScore || ''}
                      onChange={(e) => onChange(`comps.achs.${idx}.perfScore`, e.target.value)}
                    >
                      <option value="">Select…</option>
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((x) => (
                        <option key={x} value={x}>{x}</option>
                      ))}
                    </select>
                  </div>

                  <div className="field full">
                    <label className="lbl">Reason behind the performance</label>
                    <textarea
                      rows={2}
                      value={ach.perfNote || ''}
                      onChange={(e) => onChange(`comps.achs.${idx}.perfNote`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Other notable highlights</label>
                    <textarea
                      rows={2}
                      value={ach.highlight || ''}
                      onChange={(e) => onChange(`comps.achs.${idx}.highlight`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Drive link to media</label>
                    <input
                      type="url"
                      value={ach.media || ''}
                      onChange={(e) => onChange(`comps.achs.${idx}.media`, e.target.value)}
                      placeholder="https://drive.google.com/…"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add"
              onClick={() => onChange('comps.achs', [...(data.achs || []), {}])}
            >
              + Add achievement
            </button>
          </div>
        </div>

        <SelfAssessmentSection
          title="Self-assessment: Competitions & achievements"
          value={data.self}
          onChange={(v) => onChange('comps.self', v)}
        />
      </div>
    </section>
  );
}

