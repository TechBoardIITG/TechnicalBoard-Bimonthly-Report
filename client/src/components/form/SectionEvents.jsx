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

export default function SectionEvents({ data = {}, formState = {}, onChange }) {
  const [armedDelete, setArmedDelete] = useState({});

  return (
    <section className="sec" id="sec-events">
      <header className="sec-head">
        <span className="sec-no">3</span>
        <h2>Events conducted</h2>
      </header>
      <div className="fgrid">
        <div className="group full">
          <h3><span className="gno">3.1</span>Events summary</h3>
          <div className="fgrid">
            <div className="field third">
              <label className="lbl">Events planned (events calendar)</label>
              <input
                type="number"
                min="0"
                value={data.planned ?? ''}
                onChange={(e) => onChange('events.planned', N(e.target.value))}
              />
            </div>
            <div className="field third">
              <label className="lbl">Events conducted</label>
              <input
                type="number"
                min="0"
                value={data.conducted ?? ''}
                onChange={(e) => onChange('events.conducted', N(e.target.value))}
              />
            </div>
            <div className="field third">
              <span className="lbl">Conducted vs planned</span>
              <output className="calc">
                {N(data.planned) && data.conducted != null
                  ? `${data.conducted} of ${data.planned} · ${Math.round((data.conducted / data.planned) * 100)}%`
                  : '—'}
              </output>
            </div>

            <div className="field half">
              <label className="lbl">Total audience across events</label>
              <input
                type="number"
                min="0"
                value={data.audience ?? ''}
                onChange={(e) => onChange('events.audience', N(e.target.value))}
              />
              <p className="hint">People reached: session attendees, offline participants, online submissions.</p>
            </div>
            <div className="field half">
              <span className="lbl">Audience Reach Index</span>
              <output className="calc">
                {N(data.audience) != null && N(data.conducted)
                  ? `${(N(data.audience) / N(data.conducted)).toFixed(1)} per event`
                  : '—'}
              </output>
              <p className="hint">Total audience ÷ events conducted.</p>
            </div>

            <div className="field half">
              <label className="lbl">Events collaborated on (any IITG club or body)</label>
              <input
                type="number"
                min="0"
                value={data.collaborated ?? ''}
                onChange={(e) => onChange('events.collaborated', N(e.target.value))}
              />
            </div>
            <div className="field full">
              <label className="lbl">Comment on participation turnout in your events</label>
              <textarea
                rows={2}
                value={data.turnoutNote || ''}
                onChange={(e) => onChange('events.turnoutNote', e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">3.2</span>Events detail list</h3>
          <div className="reps full">
            {(data.events || []).map((evt, idx) => (
              <div key={idx} className="rep">
                <div className="rep-head">
                  <span className="rep-title">Event {idx + 1}</span>
                  <output className="idchip">{idFor(formState, 'EVT', evt, idx)}</output>
                  <button
                    type="button"
                    className="del"
                    data-armed={armedDelete[idx] ? '' : undefined}
                    onClick={() => {
                      if (!armedDelete[idx]) {
                        setArmedDelete({ ...armedDelete, [idx]: true });
                        setTimeout(() => setArmedDelete((a) => ({ ...a, [idx]: false })), 3500);
                      } else {
                        const next = [...(data.events || [])];
                        next.splice(idx, 1);
                        onChange('events.events', next);
                      }
                    }}
                  >
                    {armedDelete[idx] ? 'Confirm remove' : 'Remove'}
                  </button>
                </div>
                <div className="fgrid">
                  <div className="field half">
                    <label className="lbl">Event name</label>
                    <input
                      type="text"
                      value={evt.name || ''}
                      onChange={(e) => onChange(`events.events.${idx}.name`, e.target.value)}
                    />
                  </div>
                  <div className="field q">
                    <label className="lbl">ID number</label>
                    <input
                      type="number"
                      min="1"
                      value={evt.no ?? (idx + 1)}
                      onChange={(e) => onChange(`events.events.${idx}.no`, N(e.target.value))}
                    />
                    <p className="hint">Keeps ID stable across reports.</p>
                  </div>
                  <div className="field q">
                    <span className="lbl">Event ID</span>
                    <output className="calc">{idFor(formState, 'EVT', evt, idx)}</output>
                  </div>

                  <div className="field full">
                    <label className="lbl">What was this event and why was it held?</label>
                    <textarea
                      rows={2}
                      value={evt.purpose || ''}
                      onChange={(e) => onChange(`events.events.${idx}.purpose`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">When was it held? (date, timeline, schedule)</label>
                    <textarea
                      rows={2}
                      value={evt.timeline || ''}
                      onChange={(e) => onChange(`events.events.${idx}.timeline`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Who was the target audience, and did they show up?</label>
                    <textarea
                      rows={2}
                      value={evt.audience || ''}
                      onChange={(e) => onChange(`events.events.${idx}.audience`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Biggest highlight</label>
                    <textarea
                      rows={2}
                      value={evt.highlight || ''}
                      onChange={(e) => onChange(`events.events.${idx}.highlight`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">If held last tenure too: visible improvements or setbacks</label>
                    <textarea
                      rows={2}
                      value={evt.vsLast || ''}
                      onChange={(e) => onChange(`events.events.${idx}.vsLast`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">If collaborative: comment on the collaboration</label>
                    <textarea
                      rows={2}
                      value={evt.collab || ''}
                      onChange={(e) => onChange(`events.events.${idx}.collab`, e.target.value)}
                    />
                  </div>

                  <div className="field third">
                    <label className="lbl">Total reach (registrations / outreach)</label>
                    <input
                      type="number"
                      min="0"
                      value={evt.reach ?? ''}
                      onChange={(e) => onChange(`events.events.${idx}.reach`, N(e.target.value))}
                    />
                  </div>
                  <div className="field third">
                    <label className="lbl">Total turnup (submissions / attendance)</label>
                    <input
                      type="number"
                      min="0"
                      value={evt.turnup ?? ''}
                      onChange={(e) => onChange(`events.events.${idx}.turnup`, N(e.target.value))}
                    />
                  </div>
                  <div className="field third">
                    <span className="lbl">Reach-to-turnup</span>
                    <output className="calc">
                      {N(evt.reach) && N(evt.turnup)
                        ? `${(N(evt.reach) / N(evt.turnup)).toFixed(2)} : 1 · ${Math.round((N(evt.turnup) / N(evt.reach)) * 100)}% turnup`
                        : '—'}
                    </output>
                  </div>

                  <div className="field full">
                    <label className="lbl">Other metrics</label>
                    <input
                      type="text"
                      value={evt.otherMetrics || ''}
                      onChange={(e) => onChange(`events.events.${idx}.otherMetrics`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Comment on your reach-to-turnup ratio</label>
                    <textarea
                      rows={2}
                      value={evt.ratioNote || ''}
                      onChange={(e) => onChange(`events.events.${idx}.ratioNote`, e.target.value)}
                    />
                  </div>
                  <div className="field full">
                    <label className="lbl">Drive link to event media</label>
                    <input
                      type="url"
                      value={evt.media || ''}
                      onChange={(e) => onChange(`events.events.${idx}.media`, e.target.value)}
                      placeholder="https://drive.google.com/…"
                    />
                  </div>
                </div>
              </div>
            ))}
            <button
              type="button"
              className="add"
              onClick={() => onChange('events.events', [...(data.events || []), {}])}
            >
              + Add event
            </button>
          </div>
        </div>

        <SelfAssessmentSection
          title="Self-assessment: Events conducted"
          value={data.self}
          onChange={(v) => onChange('events.self', v)}
        />
      </div>
    </section>
  );
}

