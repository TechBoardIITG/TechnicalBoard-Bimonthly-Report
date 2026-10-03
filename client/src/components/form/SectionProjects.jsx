import React, { useState } from 'react';
import { SelfAssessmentSection } from '../common/FormControls';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));
const pad = (n) => String(n).padStart(2, '0');
const code = (r) => r?.cover?.club || 'CODE';
const yy = (r) => {
  const t = r?.cover?.periodTo || '';
  return /^\d{4}/.test(t) ? t.slice(2, 4) : '26';
};
const idFor = (r, kind, item, i) => `TB-${code(r)}-${kind}-${pad(N(item?.no) ?? (i + 1))}-${yy(r)}`;

export default function SectionProjects({ data = {}, formState = {}, onChange }) {
  const [armedDelete, setArmedDelete] = useState({});

  return (
    <section className="sec" id="sec-projects">
      <header className="sec-head">
        <span className="sec-no">5</span>
        <h2>Projects & technical development</h2>
        <p>Projects done by students directly affiliated with the club, expected to be shown at Techevince or similar events.</p>
      </header>
      <div className="fgrid">
        <div className="group full">
          <h3><span className="gno">5.1</span>Projects summary</h3>
          <div className="fgrid">
            <div className="field third">
              <label className="lbl">Active projects</label>
              <input
                type="number"
                min="0"
                value={data.active ?? ''}
                onChange={(e) => onChange('projects.active', N(e.target.value))}
              />
            </div>
            <div className="field third">
              <label className="lbl">Continuing from last tenure</label>
              <input
                type="number"
                min="0"
                value={data.continuing ?? ''}
                onChange={(e) => onChange('projects.continuing', N(e.target.value))}
              />
            </div>
            <div className="field third">
              <label className="lbl">Newly started</label>
              <input
                type="number"
                min="0"
                value={data.newly ?? ''}
                onChange={(e) => onChange('projects.newly', N(e.target.value))}
              />
            </div>

            <div className="field full">
              <label className="lbl">Continuing projects with expected completion timeline</label>
              <textarea
                rows={2}
                value={data.continuingNote || ''}
                onChange={(e) => onChange('projects.continuingNote', e.target.value)}
              />
            </div>
            <div className="field full">
              <label className="lbl">Link to the Project Annexure</label>
              <input
                type="url"
                value={data.annexure || ''}
                onChange={(e) => onChange('projects.annexure', e.target.value)}
                placeholder="https://drive.google.com/…"
              />
              <p className="hint">Submit once. Resubmit only if projects change or new ones are added.</p>
            </div>
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">5.2</span>Tenure project details</h3>
          <div className="reps full">
            {(data.projects || []).map((proj, idx) => (
              <div key={idx} className="rep">
                <div className="rep-head">
                  <span className="rep-title">Project {idx + 1}</span>
                  <output className="idchip">{idFor(formState, 'PRO', proj, idx)}</output>
                  <button
                    type="button"
                    className="del"
                    data-armed={armedDelete[idx] ? '' : undefined}
                    onClick={() => {
                      if (!armedDelete[idx]) {
                        setArmedDelete({ ...armedDelete, [idx]: true });
                        setTimeout(() => setArmedDelete((a) => ({ ...a, [idx]: false })), 3500);
                      } else {
                        const next = [...(data.projects || [])];
                        next.splice(idx, 1);
                        onChange('projects.projects', next);
                      }
                    }}
                  >
                    {armedDelete[idx] ? 'Confirm remove' : 'Remove'}
                  </button>
                </div>
                <div className="fgrid">
                  <div className="field half">
                    <label className="lbl">Project</label>
                    <input
                      type="text"
                      value={proj.name || ''}
                      onChange={(e) => onChange(`projects.projects.${idx}.name`, e.target.value)}
                    />
                  </div>
                  <div className="field q">
                    <label className="lbl">ID number</label>
                    <input
                      type="number"
                      min="1"
                      value={proj.no ?? (idx + 1)}
                      onChange={(e) => onChange(`projects.projects.${idx}.no`, N(e.target.value))}
                    />
                  </div>
                  <div className="field q">
                    <span className="lbl">Project ID</span>
                    <output className="calc">{idFor(formState, 'PRO', proj, idx)}</output>
                  </div>

                  <div className="field third">
                    <label className="lbl">Students working on it</label>
                    <input
                      type="number"
                      min="0"
                      value={proj.students ?? ''}
                      onChange={(e) => onChange(`projects.projects.${idx}.students`, N(e.target.value))}
                    />
                  </div>
                  <div className="field third">
                    <label className="lbl">Progress (% complete)</label>
                    <div className="affix post">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={proj.progress ?? ''}
                        onChange={(e) => onChange(`projects.projects.${idx}.progress`, N(e.target.value))}
                      />
                      <span>%</span>
                    </div>
                  </div>
                  <div className="field third">
                    <label className="lbl">Completion deadline (updated)</label>
                    <input
                      type="date"
                      value={proj.deadline || ''}
                      onChange={(e) => onChange(`projects.projects.${idx}.deadline`, e.target.value)}
                    />
                  </div>

                  <div className="field full">
                    <label className="lbl">Progress so far, compared with the submitted timeline</label>
                    <textarea
                      rows={2}
                      value={proj.progressNote || ''}
                      onChange={(e) => onChange(`projects.projects.${idx}.progressNote`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Affiliation / collaboration <span className="tag">Proposed</span></label>
                    <input
                      type="text"
                      value={proj.affiliation || ''}
                      onChange={(e) => onChange(`projects.projects.${idx}.affiliation`, e.target.value)}
                    />
                    <p className="hint">Partner club, lab or outside body, if any.</p>
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add"
              onClick={() => onChange('projects.projects', [...(data.projects || []), {}])}
            >
              + Add project
            </button>
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">5.3</span>Other technical development</h3>
          <div className="field full">
            <label className="lbl">Anything else to share</label>
            <textarea
              rows={3}
              value={data.otherTech || ''}
              onChange={(e) => onChange('projects.otherTech', e.target.value)}
            />
          </div>
        </div>

        <SelfAssessmentSection
          title="Self-assessment: Projects & technical development"
          value={data.self}
          onChange={(v) => onChange('projects.self', v)}
        />
      </div>
    </section>
  );
}

