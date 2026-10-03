import React from 'react';
import { SegmentRating, SelfAssessmentSection } from '../common/FormControls';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));

export default function SectionTeam({ data = {}, reportNo, onChange }) {
  return (
    <section className="sec" id="sec-team">
      <header className="sec-head">
        <span className="sec-no">2</span>
        <h2>Membership & team health</h2>
      </header>
      <div className="fgrid">
        <div className="group full">
          <h3><span className="gno">2.1</span>Membership data</h3>
          <div className="fgrid">
            <div className="field q">
              <label className="lbl">TB Heads</label>
              <input
                type="number"
                min="0"
                value={data.heads ?? ''}
                onChange={(e) => onChange('team.heads', N(e.target.value))}
              />
            </div>
            <div className="field q">
              <label className="lbl">Core Team members</label>
              <input
                type="number"
                min="0"
                value={data.core ?? ''}
                onChange={(e) => onChange('team.core', N(e.target.value))}
              />
            </div>
            <div className="field q">
              <label className="lbl">Affiliated club members</label>
              <input
                type="number"
                min="0"
                value={data.members ?? ''}
                onChange={(e) => onChange('team.members', N(e.target.value))}
              />
            </div>
            <div className="field q">
              <label className="lbl">New members inducted</label>
              <input
                type="number"
                min="0"
                value={data.inducted ?? ''}
                onChange={(e) => onChange('team.inducted', N(e.target.value))}
              />
            </div>

            {N(data.inducted) > 0 && (
              <>
                <div className="field full">
                  <label className="lbl">Recruitment procedure</label>
                  <textarea
                    rows={2}
                    value={data.recruitment || ''}
                    onChange={(e) => onChange('team.recruitment', e.target.value)}
                  />
                </div>
                <div className="field full">
                  <label className="lbl">Activities after inducting new members</label>
                  <textarea
                    rows={2}
                    value={data.induction || ''}
                    onChange={(e) => onChange('team.induction', e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">2.2</span>Engagement data</h3>
          <div className="fgrid">
            <div className="field half">
              <label className="lbl">All Heads / Core Team meetings</label>
              <input
                type="number"
                min="0"
                value={data.m_hc ?? ''}
                onChange={(e) => onChange('team.m_hc', N(e.target.value))}
              />
            </div>
            <div className="field half">
              <label className="lbl">Average attendance</label>
              <div className="affix post">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.m_hc_att ?? ''}
                  onChange={(e) => onChange('team.m_hc_att', N(e.target.value))}
                />
                <span>%</span>
              </div>
            </div>

            <div className="field half">
              <label className="lbl">All-team meetings</label>
              <input
                type="number"
                min="0"
                value={data.m_all ?? ''}
                onChange={(e) => onChange('team.m_all', N(e.target.value))}
              />
            </div>
            <div className="field half">
              <label className="lbl">Average attendance</label>
              <div className="affix post">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.m_all_att ?? ''}
                  onChange={(e) => onChange('team.m_all_att', N(e.target.value))}
                />
                <span>%</span>
              </div>
            </div>

            <div className="field half">
              <label className="lbl">Domain-wise meets</label>
              <input
                type="number"
                min="0"
                value={data.m_dom ?? ''}
                onChange={(e) => onChange('team.m_dom', N(e.target.value))}
              />
              <p className="hint">Meets of the club’s internal sub-teams.</p>
            </div>
            <div className="field half">
              <label className="lbl">Average attendance</label>
              <div className="affix post">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.m_dom_att ?? ''}
                  onChange={(e) => onChange('team.m_dom_att', N(e.target.value))}
                />
                <span>%</span>
              </div>
            </div>

            <div className="field half">
              <label className="lbl">Other engagement meets</label>
              <input
                type="number"
                min="0"
                value={data.m_oth ?? ''}
                onChange={(e) => onChange('team.m_oth', N(e.target.value))}
              />
            </div>
            <div className="field half">
              <label className="lbl">Average attendance</label>
              <div className="affix post">
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={data.m_oth_att ?? ''}
                  onChange={(e) => onChange('team.m_oth_att', N(e.target.value))}
                />
                <span>%</span>
              </div>
            </div>

            <div className="field full">
              <label className="lbl">What kinds of internal meets were held?</label>
              <textarea
                rows={2}
                value={data.meetKinds || ''}
                onChange={(e) => onChange('team.meetKinds', e.target.value)}
              />
            </div>

            <div className="field full">
              <label className="lbl">How do you engage and interact with affiliated members?</label>
              <textarea
                rows={2}
                value={data.engagement || ''}
                onChange={(e) => onChange('team.engagement', e.target.value)}
              />
            </div>

            <div className="field full">
              <label className="lbl">Any coordination issues or risks with Heads / Core Team?</label>
              <textarea
                rows={2}
                value={data.coordination || ''}
                onChange={(e) => onChange('team.coordination', e.target.value)}
              />
            </div>

            <div className="field full">
              <label className="lbl">Overall performance of TB Heads in your club</label>
              <textarea
                rows={2}
                value={data.headsPerf || ''}
                onChange={(e) => onChange('team.headsPerf', e.target.value)}
              />
            </div>

            <div className="field full">
              <span className="lbl">Internal team health (Heads and Core Team)</span>
              <SegmentRating
                value={data.internalHealth}
                onChange={(v) => onChange('team.internalHealth', v)}
              />
              <p className="hint">1 = poor, 10 = excellent</p>
            </div>

            <div className="field full">
              <span className="lbl">Overall team health (all affiliated members)</span>
              <SegmentRating
                value={data.overallHealth}
                onChange={(v) => onChange('team.overallHealth', v)}
              />
            </div>
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">2.3</span>Retention of membership</h3>
          {!(N(reportNo) >= 2) ? (
            <p className="note">
              Retention questions appear from the 2nd SPR onwards. Set the report number on the cover to 2 or more.
            </p>
          ) : (
            <div className="fgrid">
              <div className="field half">
                <label className="lbl">Any inactive Heads?</label>
                <input
                  type="text"
                  value={data.inactive || ''}
                  onChange={(e) => onChange('team.inactive', e.target.value)}
                />
              </div>
              <div className="field half">
                <label className="lbl">Member retention rate (estimate)</label>
                <div className="affix post">
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={data.retention ?? ''}
                    onChange={(e) => onChange('team.retention', N(e.target.value))}
                  />
                  <span>%</span>
                </div>
                <p className="hint">Compared with your last report.</p>
              </div>
              <div className="field full">
                <label className="lbl">Why is your retention high or low?</label>
                <textarea
                  rows={2}
                  value={data.retentionWhy || ''}
                  onChange={(e) => onChange('team.retentionWhy', e.target.value)}
                />
              </div>
              <div className="field full">
                <label className="lbl">Concerns for the GS about inactive TB Heads</label>
                <textarea
                  rows={2}
                  value={data.gsConcerns || ''}
                  onChange={(e) => onChange('team.gsConcerns', e.target.value)}
                />
              </div>
              <div className="field full">
                <span className="lbl">Rate your member retention</span>
                <SegmentRating
                  value={data.retentionRating}
                  onChange={(v) => onChange('team.retentionRating', v)}
                />
              </div>
            </div>
          )}
        </div>

        <SelfAssessmentSection
          title="Self-assessment: Membership & team health"
          value={data.self}
          onChange={(v) => onChange('team.self', v)}
        />
      </div>
    </section>
  );
}

