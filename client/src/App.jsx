import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/common/Header';
import ReportFormPage from './pages/ReportFormPage';
import SubmissionsPage from './pages/SubmissionsPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import LoginModal from './components/auth/LoginModal';
import ChangePasswordModal from './components/auth/ChangePasswordModal';
import { CLUB, EXAMPLE_DATA } from './constants/referenceData';
import { api } from './services/api';

const N = (v) => (v === '' || v == null || isNaN(Number(v)) ? null : Number(v));
const empty = (v) => v === '' || v == null || v === false;
const clone = (o) => JSON.parse(JSON.stringify(o || {}));

const reportId = (r) => {
  const n = N(r?.cover?.reportNo);
  return r?.cover?.club && n ? `TB-${r.cover.club}-${n}` : null;
};
const scoreTxt = (s) => (s && s.x ? `${s.x}.${s.y || '–'}` : '—');

const RATED_KEYS = ['ctm', 'team', 'events', 'comps', 'projects', 'outreach', 'finance'];

export default function App() {
  // Authentication State
  const [user, setUser] = useState(null);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  // Page Tab: 'form' | 'subs' | 'admin'
  const [activeTab, setActiveTab] = useState('form');

  // Role: 'techsecy' | 'oc' | 'events' | 'webmaster'
  const [currentRole, setCurrentRole] = useState('techsecy');

  // Form State
  const [S, setS] = useState({
    cover: { club: '', reportNo: '', secretary: '', submittedOn: '', periodFrom: '', periodTo: '' },
    ctm: { actions: [{}], self: { x: '', y: '', remarks: '' } },
    team: {
      heads: '', core: '', members: '', inducted: '', recruitment: '', induction: '',
      m_hc: '', m_hc_att: '', m_all: '', m_all_att: '', m_dom: '', m_dom_att: '', m_oth: '', m_oth_att: '',
      meetKinds: '', engagement: '', coordination: '', headsPerf: '', internalHealth: '', overallHealth: '',
      inactive: '', retention: '', retentionWhy: '', gsConcerns: '', retentionRating: '',
      self: { x: '', y: '', remarks: '' }
    },
    events: {
      planned: '', conducted: '', audience: '', collaborated: '', turnoutNote: '',
      events: [{}],
      self: { x: '', y: '', remarks: '' }
    },
    comps: {
      comps: [{ participants: [{}] }],
      achs: [{}],
      self: { x: '', y: '', remarks: '' }
    },
    projects: {
      active: '', continuing: '', newly: '', continuingNote: '', annexure: '',
      projects: [{}],
      otherTech: '',
      self: { x: '', y: '', remarks: '' }
    },
    outreach: {
      sponsors: [{}],
      interCollege: '', industry: '', professor: '', schools: '', media: '', highlight: '',
      social: { instagram: { before: '', after: '', posts: '' }, linkedin: { before: '', after: '', posts: '' } },
      otherSocial: [],
      self: { x: '', y: '', remarks: '' }
    },
    finance: {
      approvals: [{}],
      carried: '', sponsorReceived: '',
      self: { x: '', y: '', remarks: '' }
    },
    rio: {
      rio: [{}],
      otherInfo: ''
    },
    decl: {
      agree: false,
      signature: ''
    }
  });

  // App Flags & Status
  const [exampleOn, setExampleOn] = useState(false);
  const [dirty, setDirty] = useState(false);
  const [saveState, setSaveState] = useState({ text: 'Not saved', tone: '' });
  const [toastMsg, setToastMsg] = useState('');
  const [activeSection, setActiveSection] = useState('cover');
  const [dbConnected, setDbConnected] = useState(false);
  const [dbStatusText, setDbStatusText] = useState('Connecting to MongoDB…');
  const [invalidFields, setInvalidFields] = useState(new Set());
  const [newBtnArmed, setNewBtnArmed] = useState(false);

  // Submissions State
  const [submissions, setSubmissions] = useState([]);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [fDomain, setFDomain] = useState('');
  const [fStatus, setFStatus] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [detailReport, setDetailReport] = useState(null);
  const [councilReview, setCouncilReview] = useState({});
  const [reviewState, setReviewState] = useState('');

  // Toast Helper
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg((cur) => (cur === msg ? '' : cur));
    }, 4500);
  };

  // State updater by deep path
  const updateField = (path, value) => {
    setS((prev) => {
      const next = clone(prev);
      const keys = path.split('.');
      let cur = next;
      for (let i = 0; i < keys.length - 1; i++) {
        const k = keys[i];
        if (cur[k] == null || typeof cur[k] !== 'object') {
          cur[k] = /^\d+$/.test(keys[i + 1]) ? [] : {};
        }
        cur = cur[k];
      }
      cur[keys[keys.length - 1]] = value;
      return next;
    });
    setDirty(true);
    setSaveState({ text: 'Unsaved changes', tone: 'warn' });
    setInvalidFields((prev) => {
      const next = new Set(prev);
      next.delete(path);
      return next;
    });
  };

  // Initial load & authentication check
  useEffect(() => {
    const init = async () => {
      try {
        const d = JSON.parse(localStorage.getItem('tbspr-react-draft') || 'null');
        if (d && d.S) {
          setS(d.S);
          setExampleOn(!!d.exampleOn);
          setDirty(true);
          setSaveState({ text: 'Draft restored from browser', tone: 'warn' });
        }
      } catch (_) {}

      // Check active user session
      try {
        const activeUser = await api.getMe();
        if (activeUser) {
          setUser(activeUser);
          if (activeUser.role !== 'club_secretary') {
            setActiveTab('admin');
            if (activeUser.role === 'tech_secy') setCurrentRole('techsecy');
            else if (activeUser.role === 'oc') setCurrentRole('oc');
            else if (activeUser.role === 'events_head') setCurrentRole('events');
            else if (activeUser.role === 'webmaster') setCurrentRole('webmaster');
          }
          if (activeUser.isFirstLogin) {
            setIsChangePasswordOpen(true);
          }
        } else {
          // Open login modal if not authenticated
          setIsLoginOpen(true);
        }
      } catch (_) {
        setIsLoginOpen(true);
      }

      const res = await api.checkHealth();
      if (res && res.status === 'ok') {
        setDbConnected(true);
        setDbStatusText('MongoDB Connected · Live Store');
      } else {
        setDbConnected(false);
        setDbStatusText('Local draft mode (Server offline)');
      }
      fetchSubmissions();
    };
    init();
  }, []);

  const handleLoginSuccess = (loggedInUser) => {
    setUser(loggedInUser);
    if (loggedInUser.role !== 'club_secretary') {
      setActiveTab('admin');
      if (loggedInUser.role === 'tech_secy') setCurrentRole('techsecy');
      else if (loggedInUser.role === 'oc') setCurrentRole('oc');
      else if (loggedInUser.role === 'events_head') setCurrentRole('events');
      else if (loggedInUser.role === 'webmaster') setCurrentRole('webmaster');
      showToast(`🏛️ Welcome ${loggedInUser.name}! Opening Council Admin Panel.`);
    } else {
      setActiveTab('form');
      if (loggedInUser.clubCode) {
        if (!S.cover.club) updateField('cover.club', loggedInUser.clubCode);
        if (!S.cover.secretary) updateField('cover.secretary', loggedInUser.name);
      }
      showToast(`👋 Welcome ${loggedInUser.name}!`);
    }
    if (loggedInUser.isFirstLogin) {
      setIsChangePasswordOpen(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('tbspr-token');
    setUser(null);
    setActiveTab('form');
    setDetailReport(null);
    showToast('Signed out successfully.');
  };

  const handlePasswordChanged = (updatedUser) => {
    if (updatedUser) {
      setUser(updatedUser);
    } else {
      setUser((prev) => (prev ? { ...prev, isFirstLogin: false } : null));
    }
    showToast('🔒 Password updated successfully!');
  };

  // Save to localStorage debounce
  useEffect(() => {
    if (dirty) {
      const t = setTimeout(() => {
        try {
          localStorage.setItem('tbspr-react-draft', JSON.stringify({ S, exampleOn }));
        } catch (_) {}
      }, 600);
      return () => clearTimeout(t);
    }
  }, [S, dirty, exampleOn]);

  // Section scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['cover', 'ctm', 'team', 'events', 'comps', 'projects', 'outreach', 'finance', 'rio', 'decl'];
      for (const id of sectionIds) {
        const el = document.getElementById(`sec-${id}`);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160 && rect.bottom >= 160) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Validation
  const validateForm = () => {
    const required = [
      { p: 'cover.club', name: 'Club' },
      { p: 'cover.reportNo', name: 'Report Number' },
      { p: 'cover.secretary', name: 'Secretary Name' },
      { p: 'cover.periodFrom', name: 'Period From' },
      { p: 'cover.periodTo', name: 'Period To' },
      { p: 'decl.agree', name: 'Declaration Agreement' },
      { p: 'decl.signature', name: 'Signature' },
    ];

    const missing = [];
    const invalid = new Set();

    required.forEach(({ p, name }) => {
      const val = p.split('.').reduce((a, k) => a?.[k], S);
      if (empty(val)) {
        missing.push(name);
        invalid.add(p);
      }
    });

    setInvalidFields(invalid);
    return missing;
  };

  // Save / Submit to MongoDB
  const handleSave = async (status = 'draft') => {
    if (!user) {
      setIsLoginOpen(true);
      showToast('🔒 Please sign in with your Club Secretary account to upload progress reports.');
      return false;
    }

    if (user.role !== 'club_secretary') {
      showToast('⛔ Access Denied: Only Club Secretaries can upload or submit progress reports.');
      return false;
    }

    if (user.clubCode && S.cover?.club && user.clubCode.toUpperCase() !== S.cover.club.toUpperCase()) {
      showToast(`⛔ Access Denied: As ${user.clubCode} Secretary, you can only file reports for ${user.clubCode}.`);
      return false;
    }

    const rId = reportId(S);
    if (!rId) {
      validateForm();
      showToast('Pick a club and report number on the cover before saving.');
      document.getElementById('sec-cover')?.scrollIntoView({ behavior: 'smooth' });
      return false;
    }

    if (status === 'submitted') {
      const missing = validateForm();
      if (missing.length > 0) {
        showToast(`Please fill the ${missing.length} required field(s): ${missing.join(', ')}`);
        const firstInvalid = document.querySelector('.field.invalid');
        firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return false;
      }
    }

    setSaveState({ text: 'Saving to MongoDB…', tone: '' });

    const selfScores = Object.fromEntries(
      RATED_KEYS.map((k) => [k, scoreTxt(S[k]?.self)])
    );

    const payload = {
      reportId: rId,
      club: S.cover?.club,
      clubName: CLUB[S.cover?.club]?.name || '',
      domain: CLUB[S.cover?.club]?.domain || '',
      periodFrom: S.cover?.periodFrom || '',
      periodTo: S.cover?.periodTo || '',
      secretary: S.cover?.secretary || '',
      status,
      selfScores,
      report: S,
    };

    try {
      await api.saveReport(payload);
      setDirty(false);
      setSaveState({
        text: `${status === 'submitted' ? 'Submitted' : 'Draft saved'} ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`,
        tone: 'ok',
      });
      showToast(status === 'submitted' ? '🎉 Report submitted successfully to MongoDB!' : '✓ Draft saved to MongoDB');
      fetchSubmissions();
      return true;
    } catch (err) {
      console.error(err);
      setSaveState({ text: 'Saved locally only', tone: 'warn' });
      showToast(`Database save failed: ${err.message}. Kept in browser storage.`);
      return false;
    }
  };

  // Fetch submissions from MongoDB
  const fetchSubmissions = async () => {
    setLoadingSubs(true);
    try {
      const res = await api.getReports({ domain: fDomain, status: fStatus, search: searchTerm });
      setSubmissions(res.reports || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingSubs(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'subs' || activeTab === 'admin') {
      fetchSubmissions();
    }
  }, [activeTab, fDomain, fStatus]);

  // Fill Example Data
  const handleFillExample = () => {
    setS(clone(EXAMPLE_DATA));
    setExampleOn(true);
    setDirty(true);
    setSaveState({ text: 'Example data loaded', tone: 'warn' });
    showToast('Loaded example report data for Robotics Club.');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset / New Report
  const handleNewReport = (force = false) => {
    if (dirty && !newBtnArmed && !force) {
      setNewBtnArmed(true);
      setTimeout(() => setNewBtnArmed(false), 3500);
      return;
    }
    setNewBtnArmed(false);
    setS({
      cover: { club: '', reportNo: '', secretary: '', submittedOn: '', periodFrom: '', periodTo: '' },
      ctm: { actions: [{}], self: { x: '', y: '', remarks: '' } },
      team: {
        heads: '', core: '', members: '', inducted: '', recruitment: '', induction: '',
        m_hc: '', m_hc_att: '', m_all: '', m_all_att: '', m_dom: '', m_dom_att: '', m_oth: '', m_oth_att: '',
        meetKinds: '', engagement: '', coordination: '', headsPerf: '', internalHealth: '', overallHealth: '',
        inactive: '', retention: '', retentionWhy: '', gsConcerns: '', retentionRating: '',
        self: { x: '', y: '', remarks: '' }
      },
      events: { planned: '', conducted: '', audience: '', collaborated: '', turnoutNote: '', events: [{}], self: { x: '', y: '', remarks: '' } },
      comps: { comps: [{ participants: [{}] }], achs: [{}], self: { x: '', y: '', remarks: '' } },
      projects: { active: '', continuing: '', newly: '', continuingNote: '', annexure: '', projects: [{}], otherTech: '', self: { x: '', y: '', remarks: '' } },
      outreach: {
        sponsors: [{}], interCollege: '', industry: '', professor: '', schools: '', media: '', highlight: '',
        social: { instagram: { before: '', after: '', posts: '' }, linkedin: { before: '', after: '', posts: '' } },
        otherSocial: [],
        self: { x: '', y: '', remarks: '' }
      },
      finance: { approvals: [{}], carried: '', sponsorReceived: '', self: { x: '', y: '', remarks: '' } },
      rio: { rio: [{}], otherInfo: '' },
      decl: { agree: false, signature: '' }
    });
    setExampleOn(false);
    setDirty(false);
    setSaveState({ text: 'Not saved', tone: '' });
    try {
      localStorage.removeItem('tbspr-react-draft');
    } catch (_) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Export JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(S, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `${reportId(S) || 'TB-Report-Draft'}.json`);
    dlAnchor.click();
  };

  // Open single report in detail/audit mode
  const handleOpenReport = async (rep) => {
    try {
      const res = await api.getReport(rep.reportId);
      setDetailReport(res.report);
      setCouncilReview(res.review || {});
      setReviewState(res.review ? 'Last updated review' : 'Not reviewed yet');
      if (user && user.role !== 'club_secretary') {
        setActiveTab('admin');
      } else {
        setActiveTab('subs');
      }
    } catch (err) {
      console.error(err);
      showToast('Failed to open report details.');
    }
  };

  // Edit in Form (Strictly Club Secretary only)
  const handleEditInForm = (rep) => {
    if (!user || user.role !== 'club_secretary') {
      showToast('⛔ Access Denied: Only Club Secretaries can edit reports in the form editor.');
      return;
    }
    if (user.clubCode && rep.club && user.clubCode.toUpperCase() !== rep.club.toUpperCase()) {
      showToast(`⛔ Access Denied: As ${user.clubCode} Secretary, you can only edit reports for ${user.clubCode}.`);
      return;
    }
    if (rep.report) {
      setS(clone(rep.report));
      setExampleOn(false);
      setDirty(false);
      setSaveState({ text: `${rep.status === 'submitted' ? 'Submitted' : 'Draft'} loaded from DB`, tone: 'ok' });
      setDetailReport(null);
      setActiveTab('form');
      showToast(`Loaded ${rep.reportId} into form editor.`);
    }
  };

  // Save Council Review
  const handleSaveReview = async () => {
    if (!detailReport) return;
    try {
      await api.saveReview(detailReport.reportId, {
        club: detailReport.club,
        review: councilReview,
      });
      setReviewState('Saved just now');
      setDetailReport((prev) => ({ ...prev, reviewed: true, status: 'reviewed' }));
      showToast('Council review saved to MongoDB.');
      fetchSubmissions();
    } catch (err) {
      console.error(err);
      showToast('Failed to save council review: ' + err.message);
    }
  };

  // Section completion indicators
  const sectionCounts = useMemo(() => {
    const counts = {};
    const check = (key, countFilled, total) => {
      counts[key] = { filled: countFilled, total, full: countFilled >= total && total > 0 };
    };

    check('cover', [S.cover.club, S.cover.reportNo, S.cover.secretary, S.cover.periodFrom, S.cover.periodTo, S.cover.submittedOn].filter((x) => !empty(x)).length, 6);
    check('ctm', (S.ctm.actions || []).filter((a) => a && (a.item || a.progress)).length + (!empty(S.ctm.self?.x) ? 1 : 0), 2);
    check('team', [S.team.heads, S.team.core, S.team.members, S.team.internalHealth, S.team.overallHealth, S.team.self?.x].filter((x) => !empty(x)).length, 6);
    check('events', [S.events.planned, S.events.conducted, S.events.events?.length, S.events.self?.x].filter((x) => !empty(x)).length, 4);
    check('comps', [S.comps.comps?.length, S.comps.achs?.length, S.comps.self?.x].filter((x) => !empty(x)).length, 3);
    check('projects', [S.projects.active, S.projects.projects?.length, S.projects.self?.x].filter((x) => !empty(x)).length, 3);
    check('outreach', [S.outreach.sponsors?.length, S.outreach.social?.instagram?.after, S.outreach.self?.x].filter((x) => !empty(x)).length, 3);
    check('finance', [S.finance.approvals?.length, S.finance.self?.x].filter((x) => !empty(x)).length, 2);
    check('rio', (S.rio.rio || []).filter((r) => r && r.action).length, 1);
    check('decl', [S.decl.agree ? 1 : null, S.decl.signature].filter((x) => !empty(x)).length, 2);

    return counts;
  }, [S]);

  return (
    <div className="app-container">
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        user={user}
        onOpenLogin={() => setIsLoginOpen(true)}
        onOpenChangePassword={() => setIsChangePasswordOpen(true)}
        onLogout={handleLogout}
      />

      {/* Role Guard: Council Members see ONLY Admin Panel */}
      {user && user.role !== 'club_secretary' ? (
        <AdminDashboardPage
          currentRole={currentRole}
          setCurrentRole={setCurrentRole}
          reports={submissions}
          onOpenReport={handleOpenReport}
          detailReport={detailReport}
          setDetailReport={setDetailReport}
          councilReview={councilReview}
          setCouncilReview={setCouncilReview}
          reviewState={reviewState}
          onSaveReview={handleSaveReview}
          user={user}
        />
      ) : (
        <>
          {activeTab === 'form' && (
            !user ? (
              <div style={{ maxWidth: '580px', margin: '60px auto', padding: '36px 28px', textAlign: 'center' }} className="card">
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔒</div>
                <h2 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '8px', color: 'var(--ink)' }}>
                  Club Secretary Login Required
                </h2>
                <p style={{ color: 'var(--ink-secondary)', marginBottom: '22px', fontSize: '13.5px', lineHeight: '1.6' }}>
                  Only <b>Club Secretaries</b> are authorized to upload and submit bimonthly progress reports. Please sign in with your club credentials to access the report form.
                </p>
                <button
                  type="button"
                  className="btn primary"
                  style={{ padding: '10px 24px', fontSize: '14px', fontWeight: '600' }}
                  onClick={() => setIsLoginOpen(true)}
                >
                  Sign In with Club Secretary Credentials
                </button>
              </div>
            ) : (
              <ReportFormPage
                formState={S}
                onChange={updateField}
                invalidFields={invalidFields}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                sectionCounts={sectionCounts}
                exampleOn={exampleOn}
                onClearExample={() => handleNewReport(true)}
                currentReportId={reportId(S)}
                saveState={saveState}
                onSaveDraft={() => handleSave('draft')}
                onSubmit={() => handleSave('submitted')}
                user={user}
              />
            )
          )}

          {activeTab === 'subs' && (
            <SubmissionsPage
              submissions={submissions}
              loading={loadingSubs}
              fDomain={fDomain}
              setFDomain={setFDomain}
              fStatus={fStatus}
              setFStatus={setFStatus}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onRefresh={fetchSubmissions}
              onExportAll={() => {
                const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(submissions, null, 2));
                const dlAnchor = document.createElement('a');
                dlAnchor.setAttribute('href', dataStr);
                dlAnchor.setAttribute('download', `TB-Submissions-${new Date().toISOString().slice(0, 10)}.json`);
                dlAnchor.click();
              }}
              detailReport={detailReport}
              setDetailReport={setDetailReport}
              councilReview={councilReview}
              setCouncilReview={setCouncilReview}
              reviewState={reviewState}
              onSaveReview={handleSaveReview}
              onEditInForm={handleEditInForm}
              user={user}
            />
          )}
        </>
      )}

      {/* Authentication Modals */}
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
        user={user}
        onPasswordChanged={handlePasswordChanged}
        isMandatoryFirstLogin={Boolean(user?.isFirstLogin)}
      />

      {toastMsg && <div className="toast" role="status">{toastMsg}</div>}
    </div>
  );
}

