import React, { useMemo } from 'react';
import { CLUBS, CLUB } from '../../constants/referenceData';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));
const code = (r) => r?.cover?.club || 'CODE';
const reportId = (r) => {
  const n = N(r?.cover?.reportNo);
  return r?.cover?.club && n ? `TB-${r.cover.club}-${n}` : null;
};

export default function SectionCover({ data = {}, onChange, invalidFields = new Set(), user = null }) {
  const isSecretary = user?.role === 'club_secretary' && Boolean(user?.clubCode);
  const activeClubCode = isSecretary ? user.clubCode : (data.club || '');
  const currentClub = CLUB[activeClubCode];
  const rId = reportId({ cover: { ...data, club: activeClubCode } });

  React.useEffect(() => {
    if (isSecretary && data.club !== user.clubCode) {
      onChange('cover.club', user.clubCode);
    }
  }, [isSecretary, user?.clubCode, data.club]);

  const prevReportId = useMemo(() => {
    const n = N(data.reportNo);
    if (!n) return '—';
    return n > 1 ? `TB-${activeClubCode || code({ cover: data })}-${n - 1}` : 'None (first report)';
  }, [data.reportNo, activeClubCode]);

  return (
    <section className="sec" id="sec-cover">
      <header className="sec-head">
        <span className="sec-no">0</span>
        <h2>Cover</h2>
      </header>
      <div className="fgrid">
        <div className={`field half ${invalidFields.has('cover.club') ? 'invalid' : ''}`}>
          <label className="lbl" htmlFor="cover_club">
            Club {isSecretary ? <span style={{ color: 'var(--brand)', fontWeight: '600' }}>(Locked to your club)</span> : <span className="req">Required</span>}
          </label>
          {isSecretary ? (
            <input
              id="cover_club"
              type="text"
              readOnly
              value={`${currentClub?.name || user.clubName || user.clubCode} (${user.clubCode})`}
              style={{ background: 'var(--sunk)', cursor: 'not-allowed', fontWeight: '600' }}
            />
          ) : (
            <select
              id="cover_club"
              value={data.club || ''}
              onChange={(e) => onChange('cover.club', e.target.value)}
            >
              <option value="">Select club…</option>
              {CLUBS.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name} ({c.code})
                </option>
              ))}
            </select>
          )}
        </div>

        <div className="field half">
          <span className="lbl">Club domain</span>
          <output className="calc" data-tone={currentClub ? '' : 'muted'}>
            {currentClub ? currentClub.domain : 'Set by club'}
          </output>
        </div>

        <div className={`field third ${invalidFields.has('cover.reportNo') ? 'invalid' : ''}`}>
          <label className="lbl" htmlFor="cover_reportNo">
            Report number <span className="req">Required</span>
          </label>
          <input
            id="cover_reportNo"
            type="number"
            min="1"
            step="1"
            value={data.reportNo || ''}
            onChange={(e) => onChange('cover.reportNo', e.target.value === '' ? '' : Number(e.target.value))}
            placeholder="e.g. 1, 2"
          />
          <p className="hint">1 for the first SPR of the tenure.</p>
        </div>

        <div className="field third">
          <span className="lbl">Report ID</span>
          <output className="calc" data-tone={rId ? '' : 'muted'}>
            {rId || 'Pick a club and report number'}
          </output>
        </div>

        <div className="field third">
          <span className="lbl">Previous report ID</span>
          <output className="calc" data-tone={prevReportId === '—' ? 'muted' : ''}>
            {prevReportId}
          </output>
        </div>

        <div className={`field half ${invalidFields.has('cover.secretary') ? 'invalid' : ''}`}>
          <label className="lbl" htmlFor="cover_sec">
            Secretary / Convenor name <span className="req">Required</span>
          </label>
          <input
            id="cover_sec"
            type="text"
            value={data.secretary || ''}
            onChange={(e) => onChange('cover.secretary', e.target.value)}
            placeholder="Full name"
          />
        </div>

        <div className="field half">
          <label className="lbl" htmlFor="cover_sub">
            Date of submission
          </label>
          <input
            id="cover_sub"
            type="date"
            value={data.submittedOn || ''}
            onChange={(e) => onChange('cover.submittedOn', e.target.value)}
          />
        </div>

        <div className={`field half ${invalidFields.has('cover.periodFrom') ? 'invalid' : ''}`}>
          <label className="lbl" htmlFor="cover_from">
            Reporting period from <span className="req">Required</span>
          </label>
          <input
            id="cover_from"
            type="month"
            value={data.periodFrom || ''}
            onChange={(e) => onChange('cover.periodFrom', e.target.value)}
          />
        </div>

        <div className={`field half ${invalidFields.has('cover.periodTo') ? 'invalid' : ''}`}>
          <label className="lbl" htmlFor="cover_to">
            Reporting period to <span className="req">Required</span>
          </label>
          <input
            id="cover_to"
            type="month"
            value={data.periodTo || ''}
            onChange={(e) => onChange('cover.periodTo', e.target.value)}
          />
        </div>
      </div>
    </section>
  );
}

