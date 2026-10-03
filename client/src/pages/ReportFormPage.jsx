import React from 'react';
import SectionCover from '../components/form/SectionCover';
import SectionCTM from '../components/form/SectionCTM';
import SectionTeam from '../components/form/SectionTeam';
import SectionEvents from '../components/form/SectionEvents';
import SectionCompetitions from '../components/form/SectionCompetitions';
import SectionProjects from '../components/form/SectionProjects';
import SectionOutreach from '../components/form/SectionOutreach';
import SectionFinance from '../components/form/SectionFinance';
import SectionRIO from '../components/form/SectionRIO';
import SectionDeclaration from '../components/form/SectionDeclaration';

export default function ReportFormPage({
  formState,
  onChange,
  invalidFields,
  activeSection,
  setActiveSection,
  sectionCounts,
  exampleOn,
  onClearExample,
  currentReportId,
  saveState,
  onSaveDraft,
  onSubmit,
  user = null,
}) {
  const sections = [
    { key: 'cover', no: '0', nav: 'Cover' },
    { key: 'ctm', no: '1', nav: 'CTM review' },
    { key: 'team', no: '2', nav: 'Membership' },
    { key: 'events', no: '3', nav: 'Events' },
    { key: 'comps', no: '4', nav: 'Competitions' },
    { key: 'projects', no: '5', nav: 'Projects' },
    { key: 'outreach', no: '6', nav: 'Outreach' },
    { key: 'finance', no: '7', nav: 'Finance' },
    { key: 'rio', no: '8', nav: 'RIO' },
    { key: 'decl', no: '9', nav: 'Declaration' },
  ];

  return (
    <div className="shell">
      {/* Navigation Rail */}
      <aside className="rail" aria-label="Sections">
        <ol id="navList">
          {sections.map((s) => (
            <li key={s.key}>
              <a
                href={`#sec-${s.key}`}
                className={activeSection === s.key ? 'on' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(`sec-${s.key}`)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="n">{s.no}</span>
                <span>{s.nav}</span>
                <span className={`cnt ${sectionCounts[s.key]?.full ? 'full' : ''}`}>
                  {sectionCounts[s.key]?.filled}/{sectionCounts[s.key]?.total}
                </span>
              </a>
            </li>
          ))}
        </ol>
      </aside>

      {/* Main Form Content */}
      <main>
        {/* Example Banner */}
        {exampleOn && (
          <div className="banner example" id="exampleBanner">
            <span>
              <b>Example data.</b> This is sample demonstration content representing the Robotics Club report.
            </span>
            <button className="btn ghost" type="button" onClick={onClearExample}>
              Clear example
            </button>
          </div>
        )}

        <form id="form" onSubmit={(e) => e.preventDefault()} noValidate>
          <SectionCover
            data={formState.cover}
            onChange={onChange}
            invalidFields={invalidFields}
            user={user}
          />
          <SectionCTM
            data={formState.ctm}
            onChange={onChange}
          />
          <SectionTeam
            data={formState.team}
            reportNo={formState.cover?.reportNo}
            onChange={onChange}
          />
          <SectionEvents
            data={formState.events}
            formState={formState}
            onChange={onChange}
          />
          <SectionCompetitions
            data={formState.comps}
            formState={formState}
            onChange={onChange}
          />
          <SectionProjects
            data={formState.projects}
            formState={formState}
            onChange={onChange}
          />
          <SectionOutreach
            data={formState.outreach}
            onChange={onChange}
          />
          <SectionFinance
            data={formState.finance}
            formState={formState}
            onChange={onChange}
          />
          <SectionRIO
            data={formState.rio}
            onChange={onChange}
          />
          <SectionDeclaration
            data={formState.decl}
            onChange={onChange}
            invalidFields={invalidFields}
          />

          {/* Bottom Action Submission Bar */}
          <div className="form-submit-bar">
            {saveState?.text && saveState.text !== 'Not saved' && (
              <span className="state" data-tone={saveState?.tone}>
                {saveState?.text}
              </span>
            )}
            <button
              className="btn submit btn-submit-report"
              type="button"
              onClick={onSubmit}
            >
              Submit Report
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}


