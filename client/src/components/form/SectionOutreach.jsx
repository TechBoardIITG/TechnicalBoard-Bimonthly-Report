import React, { useState } from 'react';
import { SocialRow, SelfAssessmentSection } from '../common/FormControls';

export default function SectionOutreach({ data = {}, onChange }) {
  const [armedDelete, setArmedDelete] = useState({});

  return (
    <section className="sec" id="sec-outreach">
      <header className="sec-head">
        <span className="sec-no">6</span>
        <h2>Outreach & visibility</h2>
      </header>
      <div className="fgrid">
        <div className="group full">
          <h3><span className="gno">6.1</span>Sponsorships / collaborations</h3>
          <div className="reps full">
            {(data.sponsors || []).map((spon, idx) => (
              <div key={idx} className="rep">
                <div className="rep-head">
                  <span className="rep-title">Sponsor {idx + 1}</span>
                  <button
                    type="button"
                    className="del"
                    data-armed={armedDelete[idx] ? '' : undefined}
                    onClick={() => {
                      if (!armedDelete[idx]) {
                        setArmedDelete({ ...armedDelete, [idx]: true });
                        setTimeout(() => setArmedDelete((a) => ({ ...a, [idx]: false })), 3500);
                      } else {
                        const next = [...(data.sponsors || [])];
                        next.splice(idx, 1);
                        onChange('outreach.sponsors', next);
                      }
                    }}
                  >
                    {armedDelete[idx] ? 'Confirm remove' : 'Remove'}
                  </button>
                </div>
                <div className="fgrid">
                  <div className="field half">
                    <label className="lbl">Sponsor name</label>
                    <input
                      type="text"
                      value={spon.sponsor || ''}
                      onChange={(e) => onChange(`outreach.sponsors.${idx}.sponsor`, e.target.value)}
                    />
                  </div>
                  <div className="field half">
                    <label className="lbl">For which event</label>
                    <input
                      type="text"
                      value={spon.event || ''}
                      onChange={(e) => onChange(`outreach.sponsors.${idx}.event`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Basis of this sponsorship</label>
                    <textarea
                      rows={2}
                      value={spon.basis || ''}
                      onChange={(e) => onChange(`outreach.sponsors.${idx}.basis`, e.target.value)}
                    />
                  </div>
                  <div className="field half">
                    <label className="lbl">Amount / benefits</label>
                    <input
                      type="text"
                      value={spon.amount || ''}
                      onChange={(e) => onChange(`outreach.sponsors.${idx}.amount`, e.target.value)}
                    />
                  </div>
                  <div className="field half">
                    <label className="lbl">Deliverables</label>
                    <input
                      type="text"
                      value={spon.deliverables || ''}
                      onChange={(e) => onChange(`outreach.sponsors.${idx}.deliverables`, e.target.value)}
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add"
              onClick={() => onChange('outreach.sponsors', [...(data.sponsors || []), {}])}
            >
              + Add sponsor
            </button>
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">6.2</span>External engagement</h3>
          <div className="fgrid">
            <div className="field half">
              <label className="lbl">Inter-college collaborations</label>
              <input
                type="text"
                value={data.interCollege || ''}
                onChange={(e) => onChange('outreach.interCollege', e.target.value)}
              />
            </div>
            <div className="field half">
              <label className="lbl">Industry / alumni engagement</label>
              <input
                type="text"
                value={data.industry || ''}
                onChange={(e) => onChange('outreach.industry', e.target.value)}
              />
            </div>
            <div className="field half">
              <label className="lbl">Professor engagement</label>
              <input
                type="text"
                value={data.professor || ''}
                onChange={(e) => onChange('outreach.professor', e.target.value)}
              />
            </div>
            <div className="field half">
              <label className="lbl">Schools / external communities</label>
              <input
                type="text"
                value={data.schools || ''}
                onChange={(e) => onChange('outreach.schools', e.target.value)}
              />
            </div>
            <div className="field full">
              <label className="lbl">Media mentions / features</label>
              <input
                type="text"
                value={data.media || ''}
                onChange={(e) => onChange('outreach.media', e.target.value)}
              />
            </div>
            <div className="field full">
              <label className="lbl">Notable highlight in external engagement</label>
              <textarea
                rows={2}
                value={data.highlight || ''}
                onChange={(e) => onChange('outreach.highlight', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">6.3</span>Social media engagement</h3>
          <div className="fgrid">
            <div className="full"><span className="lbl">Instagram</span></div>
            <SocialRow
              data={data.social?.instagram}
              onChange={(v) => onChange('outreach.social.instagram', v)}
            />

            <div className="full"><span className="lbl">LinkedIn</span></div>
            <SocialRow
              data={data.social?.linkedin}
              onChange={(v) => onChange('outreach.social.linkedin', v)}
            />

            <div className="reps full">
              {(data.otherSocial || []).map((os, idx) => (
                <div key={idx} className="rep compact">
                  <div className="rep-head">
                    <span className="rep-title">{os.platform || `Platform ${idx + 1}`}</span>
                    <button
                      type="button"
                      className="del"
                      onClick={() => {
                        const nextOS = [...(data.otherSocial || [])];
                        nextOS.splice(idx, 1);
                        onChange('outreach.otherSocial', nextOS);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                  <div className="fgrid">
                    <div className="field full">
                      <label className="lbl">Platform</label>
                      <input
                        type="text"
                        value={os.platform || ''}
                        placeholder="e.g. YouTube, X / Twitter, Discord"
                        onChange={(e) => onChange(`outreach.otherSocial.${idx}.platform`, e.target.value)}
                      />
                    </div>
                    <SocialRow
                      data={os}
                      onChange={(v) => onChange(`outreach.otherSocial.${idx}`, { ...os, ...v })}
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="add"
                onClick={() => onChange('outreach.otherSocial', [...(data.otherSocial || []), {}])}
              >
                + Add platform
              </button>
            </div>

            <p className="hint full">Overall growth = (followers after − followers before) ÷ followers before.</p>
          </div>
        </div>

        <SelfAssessmentSection
          title="Self-assessment: Outreach & visibility"
          value={data.self}
          onChange={(v) => onChange('outreach.self', v)}
        />
      </div>
    </section>
  );
}

