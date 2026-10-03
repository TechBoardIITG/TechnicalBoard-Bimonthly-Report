import React, { useState } from 'react';
import { YesNoRating, SelfAssessmentSection } from '../common/FormControls';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));
const pad = (n) => String(n).padStart(2, '0');
const inr = (v) => (v == null ? '—' : '₹' + Number(v).toLocaleString('en-IN', { maximumFractionDigits: 2 }));
const code = (r) => r?.cover?.club || 'CODE';
const yy = (r) => {
  const t = r?.cover?.periodTo || '';
  return /^\d{4}/.test(t) ? t.slice(2, 4) : '26';
};
const idFor = (r, kind, item, i) => `TB-${code(r)}-${kind}-${pad(N(item?.no) ?? (i + 1))}-${yy(r)}`;

export default function SectionFinance({ data = {}, formState = {}, onChange }) {
  const [armedDelete, setArmedDelete] = useState({});

  return (
    <section className="sec" id="sec-finance">
      <header className="sec-head">
        <span className="sec-no">7</span>
        <h2>Financial tracking</h2>
      </header>
      <div className="fgrid">
        <div className="full">
          <details className="guide" open>
            <summary>Sanctioned, spent and utilized budget</summary>
            <div className="gbody">
              <dl className="gtable">
                <dt>Sanctioned</dt><dd>Amount approved in the signed proposal letter or approval.</dd>
                <dt>Spent</dt><dd>Money spent on the event from your own pocket, from an advance, or from vendors to be paid after the service.</dd>
                <dt>Utilized</dt><dd>Amount used from the sanctioned budget according to admin records. Spent becomes utilized once reimbursements, advance settlements or disbursements are submitted and their forms signed.</dd>
              </dl>
            </div>
          </details>
        </div>

        <div className="group full">
          <h3><span className="gno">7.1</span>Approvals & budget utilisation</h3>
          <div className="reps full">
            {(data.approvals || []).map((appr, idx) => {
              const s = N(appr.sanctioned);
              const u = N(appr.utilized);
              const utilPct = s && u != null ? (u / s) * 100 : null;
              const isOver = utilPct != null && utilPct > 100;

              return (
                <div key={idx} className="rep">
                  <div className="rep-head">
                    <span className="rep-title">Approval {idx + 1}</span>
                    <output className="idchip">{idFor(formState, 'APPR', appr, idx)}</output>
                    <button
                      type="button"
                      className="del"
                      data-armed={armedDelete[idx] ? '' : undefined}
                      onClick={() => {
                        if (!armedDelete[idx]) {
                          setArmedDelete({ ...armedDelete, [idx]: true });
                          setTimeout(() => setArmedDelete((a) => ({ ...a, [idx]: false })), 3500);
                        } else {
                          const next = [...(data.approvals || [])];
                          next.splice(idx, 1);
                          onChange('finance.approvals', next);
                        }
                      }}
                    >
                      {armedDelete[idx] ? 'Confirm remove' : 'Remove'}
                    </button>
                  </div>
                  <div className="fgrid">
                    <div className="field half">
                      <label className="lbl">Approval</label>
                      <input
                        type="text"
                        value={appr.name || ''}
                        onChange={(e) => onChange(`finance.approvals.${idx}.name`, e.target.value)}
                      />
                    </div>
                    <div className="field q">
                      <label className="lbl">ID number</label>
                      <input
                        type="number"
                        min="1"
                        value={appr.no ?? (idx + 1)}
                        onChange={(e) => onChange(`finance.approvals.${idx}.no`, N(e.target.value))}
                      />
                    </div>
                    <div className="field q">
                      <span className="lbl">Approval ID</span>
                      <output className="calc">{idFor(formState, 'APPR', appr, idx)}</output>
                    </div>

                    <div className="field half">
                      <label className="lbl">Category of approval</label>
                      <select
                        value={appr.category || ''}
                        onChange={(e) => onChange(`finance.approvals.${idx}.category`, e.target.value)}
                      >
                        <option value="">Select…</option>
                        <option value="Event">Event</option>
                        <option value="Project">Project</option>
                        <option value="Competition">Competition</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="field half">
                      <label className="lbl">Linked event / project / competition ID <span className="tag">Proposed</span></label>
                      <input
                        type="text"
                        value={appr.linked || ''}
                        placeholder="TB-CODE-EVT-01-26"
                        onChange={(e) => onChange(`finance.approvals.${idx}.linked`, e.target.value)}
                      />
                    </div>

                    <div className="field third">
                      <label className="lbl">Approved / sanctioned</label>
                      <div className="affix pre">
                        <span>₹</span>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={appr.sanctioned ?? ''}
                          onChange={(e) => onChange(`finance.approvals.${idx}.sanctioned`, N(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="field third">
                      <label className="lbl">Spent</label>
                      <div className="affix pre">
                        <span>₹</span>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={appr.spent ?? ''}
                          onChange={(e) => onChange(`finance.approvals.${idx}.spent`, N(e.target.value))}
                        />
                      </div>
                    </div>
                    <div className="field third">
                      <label className="lbl">Utilized</label>
                      <div className="affix pre">
                        <span>₹</span>
                        <input
                          type="number"
                          min="0"
                          step="any"
                          value={appr.utilized ?? ''}
                          onChange={(e) => onChange(`finance.approvals.${idx}.utilized`, N(e.target.value))}
                        />
                      </div>
                    </div>

                    <div className="field full">
                      <span className="lbl">Utilisation</span>
                      <output className="calc" data-tone={isOver ? 'bad' : utilPct != null ? 'ok' : 'muted'}>
                        {utilPct != null
                          ? isOver
                            ? `${utilPct.toFixed(0)}% of sanction · over budget, addendum needed`
                            : `${utilPct.toFixed(0)}% of sanction`
                          : '—'}
                      </output>
                    </div>

                    <div className="field half">
                      <span className="lbl">Advance taken against sanction</span>
                      <YesNoRating
                        value={appr.advance}
                        onChange={(v) => onChange(`finance.approvals.${idx}.advance`, v)}
                      />
                    </div>
                    {appr.advance === 'Yes' && (
                      <div className="field half">
                        <label className="lbl">Advance amount</label>
                        <div className="affix pre">
                          <span>₹</span>
                          <input
                            type="number"
                            min="0"
                            value={appr.advanceAmt ?? ''}
                            onChange={(e) => onChange(`finance.approvals.${idx}.advanceAmt`, N(e.target.value))}
                          />
                        </div>
                      </div>
                    )}

                    <div className="field half">
                      <span className="lbl">Sponsorship money being used</span>
                      <YesNoRating
                        value={appr.sponsorUsed}
                        onChange={(v) => onChange(`finance.approvals.${idx}.sponsorUsed`, v)}
                      />
                    </div>
                    {appr.sponsorUsed === 'Yes' && (
                      <div className="field half">
                        <label className="lbl">Sponsorship amount used</label>
                        <div className="affix pre">
                          <span>₹</span>
                          <input
                            type="number"
                            min="0"
                            value={appr.sponsorAmt ?? ''}
                            onChange={(e) => onChange(`finance.approvals.${idx}.sponsorAmt`, N(e.target.value))}
                          />
                        </div>
                      </div>
                    )}

                    <div className="field full">
                      <label className="lbl">Addendum needed (overutilisation)</label>
                      <input
                        type="text"
                        value={appr.addendum || ''}
                        onChange={(e) => onChange(`finance.approvals.${idx}.addendum`, e.target.value)}
                      />
                    </div>
                    <div className="field full">
                      <label className="lbl">Other information about this sanctioned budget</label>
                      <textarea
                        rows={2}
                        value={appr.notes || ''}
                        onChange={(e) => onChange(`finance.approvals.${idx}.notes`, e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              className="add"
              onClick={() => onChange('finance.approvals', [...(data.approvals || []), {}])}
            >
              + Add approval
            </button>
          </div>
        </div>

        <div className="group full">
          <h3><span className="gno">7.2</span>Approvals & budget summary</h3>
          <p className="gnote">Totals are calculated from 7.1.</p>
          <div className="fgrid">
            <div className="field third">
              <span className="lbl">Approvals passed</span>
              <output className="calc">
                {(data.approvals || []).filter((a) => a && a.name).length}
              </output>
            </div>
            <div className="field third">
              <span className="lbl">Net sanctioned</span>
              <output className="calc">
                {inr((data.approvals || []).reduce((s, a) => s + (N(a?.sanctioned) || 0), 0))}
              </output>
            </div>
            <div className="field third">
              <span className="lbl">Net utilized</span>
              <output className="calc">
                {inr((data.approvals || []).reduce((s, a) => s + (N(a?.utilized) || 0), 0))}
              </output>
            </div>

            <div className="field third">
              <label className="lbl">Budget carried forward</label>
              <div className="affix pre">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  value={data.carried ?? ''}
                  onChange={(e) => onChange('finance.carried', N(e.target.value))}
                />
              </div>
              <p className="hint">Not defined in the source doc yet.</p>
            </div>
            <div className="field third">
              <label className="lbl">Net sponsorship received to TB account</label>
              <div className="affix pre">
                <span>₹</span>
                <input
                  type="number"
                  min="0"
                  value={data.sponsorReceived ?? ''}
                  onChange={(e) => onChange('finance.sponsorReceived', N(e.target.value))}
                />
              </div>
            </div>
            <div className="field third">
              <span className="lbl">Net sponsorship utilized</span>
              <output className="calc">
                {inr(
                  (data.approvals || []).reduce(
                    (s, a) => s + (a?.sponsorUsed === 'Yes' ? N(a.sponsorAmt) || 0 : 0),
                    0
                  )
                )}
              </output>
            </div>
          </div>
        </div>

        <SelfAssessmentSection
          title="Self-assessment: Financial tracking"
          value={data.self}
          onChange={(v) => onChange('finance.self', v)}
        />
      </div>
    </section>
  );
}

