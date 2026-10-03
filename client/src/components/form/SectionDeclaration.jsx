import React from 'react';

export default function SectionDeclaration({ data = {}, onChange, invalidFields = new Set() }) {
  return (
    <section className="sec" id="sec-decl">
      <header className="sec-head">
        <span className="sec-no">9</span>
        <h2>Self-declaration</h2>
      </header>
      <div className="fgrid">
        <div className="full">
          <p className="decl">
            I confirm that the information in this report is accurate to the best of my knowledge.
            I agree that it may be used for the Techboard Internal Audit, where it may be reviewed by the Chairperson,
            Technical Board. I will be answerable if the information here does not match the results of the audit.
          </p>
        </div>

        <div className={`field full ${invalidFields.has('decl.agree') ? 'invalid' : ''}`}>
          <span className="lbl">Declaration <span className="req">Required</span></span>
          <label className="check">
            <input
              type="checkbox"
              checked={!!data.agree}
              onChange={(e) => onChange('decl.agree', e.target.checked)}
            />
            <span>I confirm the declaration above</span>
          </label>
        </div>

        <div className={`field half ${invalidFields.has('decl.signature') ? 'invalid' : ''}`}>
          <label className="lbl" htmlFor="decl_sig">
            Signature (type your full name) <span className="req">Required</span>
          </label>
          <input
            id="decl_sig"
            type="text"
            value={data.signature || ''}
            onChange={(e) => onChange('decl.signature', e.target.value)}
            placeholder="e.g. Full Name"
          />
        </div>
      </div>
    </section>
  );
}

