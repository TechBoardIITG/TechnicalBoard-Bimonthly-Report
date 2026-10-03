import React from 'react';
import { SCORE_X } from '../../constants/referenceData';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));

export function SegmentRating({ value, onChange, max = 10 }) {
  const vals = Array.from({ length: max }, (_, i) => String(i + 1));
  const randName = React.useId();

  return (
    <div className="seg r10" role="radiogroup">
      {vals.map((x) => (
        <label key={x}>
          <input
            type="radio"
            name={randName}
            value={x}
            checked={String(value) === x}
            onChange={() => onChange(x)}
          />
          <span>{x}</span>
        </label>
      ))}
    </div>
  );
}

export function YesNoRating({ value, onChange }) {
  const randName = React.useId();

  return (
    <div className="seg" role="radiogroup">
      {['Yes', 'No'].map((x) => (
        <label key={x}>
          <input
            type="radio"
            name={randName}
            value={x}
            checked={String(value) === x}
            onChange={() => onChange(x)}
          />
          <span>{x}</span>
        </label>
      ))}
    </div>
  );
}

export function SelfAssessmentSection({ title, value = {}, onChange }) {
  const xo = SCORE_X.map(([x, l]) => (
    <option key={x} value={x}>{x} · {l}</option>
  ));
  const yo = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((y) => (
    <option key={y} value={y}>.{y}</option>
  ));

  return (
    <div className="self full">
      <h3>{title}</h3>
      <div className="fgrid">
        <div className="field full">
          <span className="lbl">Your score for this section</span>
          <div className="score">
            <select
              aria-label="Score X"
              value={value?.x || ''}
              onChange={(e) => onChange({ ...value, x: e.target.value })}
            >
              <option value="">Select X…</option>
              {xo}
            </select>
            <select
              aria-label="Score Y"
              value={value?.y || ''}
              onChange={(e) => onChange({ ...value, y: e.target.value })}
            >
              <option value="">Y…</option>
              {yo}
            </select>
            <output>{value?.x ? `${value.x}.${value.y || '–'}` : '–'}</output>
          </div>
          <p className="hint">X from the scale, Y (1–9) for how close you are to X+1. Example: 3.4</p>
        </div>

        <div className="field full">
          <label className="lbl">Remarks</label>
          <textarea
            rows={2}
            value={value?.remarks || ''}
            onChange={(e) => onChange({ ...value, remarks: e.target.value })}
            placeholder="Key reflections regarding this section..."
          />
        </div>
      </div>
    </div>
  );
}

export function SocialRow({ data = {}, onChange }) {
  const b = N(data?.before);
  const a = N(data?.after);
  const growth = b && a != null ? `${(((a - b) / b) * 100).toFixed(1)}%` : '—';
  const tone = a >= b ? 'ok' : 'bad';

  return (
    <>
      <div className="field q">
        <label className="lbl">Followers before</label>
        <input
          type="number"
          min="0"
          value={data?.before ?? ''}
          onChange={(e) => onChange({ ...data, before: N(e.target.value) })}
        />
      </div>
      <div className="field q">
        <label className="lbl">Followers after</label>
        <input
          type="number"
          min="0"
          value={data?.after ?? ''}
          onChange={(e) => onChange({ ...data, after: N(e.target.value) })}
        />
      </div>
      <div className="field q">
        <label className="lbl">Posts published</label>
        <input
          type="number"
          min="0"
          value={data?.posts ?? ''}
          onChange={(e) => onChange({ ...data, posts: N(e.target.value) })}
        />
      </div>
      <div className="field q">
        <span className="lbl">Overall growth</span>
        <output className="calc" data-tone={growth !== '—' ? tone : 'muted'}>
          {growth}
        </output>
      </div>
    </>
  );
}

