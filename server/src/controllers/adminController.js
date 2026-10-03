import { Report } from '../models/Report.js';
import { Review } from '../models/Review.js';

// GET Admin Dashboard Summary Stats
export const getAdminStats = async (req, res) => {
  try {
    const reports = await Report.find({});
    const reviews = await Review.find({});

    const totalReports = reports.length;
    const submittedReports = reports.filter((r) => r.status === 'submitted').length;
    const draftReports = reports.filter((r) => r.status === 'draft').length;
    const reviewedReports = reports.filter((r) => r.reviewed).length;

    // Domain breakdown
    const domainStats = {
      Hardware: { count: 0, clubs: [] },
      Software: { count: 0, clubs: [] },
      Science: { count: 0, clubs: [] },
      Business: { count: 0, clubs: [] },
    };

    let totalBudgetSanctioned = 0;
    let totalBudgetUtilized = 0;
    let totalEventsPlanned = 0;
    let totalEventsConducted = 0;
    let totalAudience = 0;
    let totalProjectsActive = 0;
    let totalMembers = 0;
    const allRisksAndIssues = [];
    const allEvents = [];
    const allProjects = [];
    const allApprovals = [];
    const allMediaLinks = [];

    reports.forEach((rep) => {
      const repData = rep.report || {};
      const clubCode = rep.club;
      const clubName = rep.clubName || clubCode;
      const domain = rep.domain;

      if (domain && domainStats[domain]) {
        domainStats[domain].count++;
        domainStats[domain].clubs.push(clubCode);
      }

      // Membership
      totalMembers += (Number(repData.team?.members) || 0) + (Number(repData.team?.core) || 0);

      // Events
      totalEventsPlanned += Number(repData.events?.planned) || 0;
      totalEventsConducted += Number(repData.events?.conducted) || 0;
      totalAudience += Number(repData.events?.audience) || 0;

      (repData.events?.events || []).forEach((evt, idx) => {
        if (evt && evt.name) {
          allEvents.push({
            club: clubCode,
            clubName,
            domain,
            eventName: evt.name,
            no: evt.no || idx + 1,
            reach: Number(evt.reach) || 0,
            turnup: Number(evt.turnup) || 0,
            ratio: evt.reach && evt.turnup ? (Number(evt.reach) / Number(evt.turnup)).toFixed(2) : '—',
            timeline: evt.timeline || '',
            highlight: evt.highlight || '',
            media: evt.media || '',
          });
          if (evt.media) {
            allMediaLinks.push({
              type: 'Event Media',
              club: clubCode,
              title: evt.name,
              url: evt.media,
            });
          }
        }
      });

      // Projects
      totalProjectsActive += Number(repData.projects?.active) || 0;
      (repData.projects?.projects || []).forEach((proj, idx) => {
        if (proj && proj.name) {
          allProjects.push({
            club: clubCode,
            clubName,
            domain,
            projectName: proj.name,
            students: proj.students || 0,
            progress: proj.progress || 0,
            deadline: proj.deadline || '',
            progressNote: proj.progressNote || '',
            affiliation: proj.affiliation || '',
          });
        }
      });
      if (repData.projects?.annexure) {
        allMediaLinks.push({
          type: 'Project Annexure',
          club: clubCode,
          title: 'Project Annexure Drive Link',
          url: repData.projects.annexure,
        });
      }

      // Financials
      (repData.finance?.approvals || []).forEach((appr, idx) => {
        if (appr && appr.name) {
          const sanctioned = Number(appr.sanctioned) || 0;
          const utilized = Number(appr.utilized) || 0;
          const spent = Number(appr.spent) || 0;

          totalBudgetSanctioned += sanctioned;
          totalBudgetUtilized += utilized;

          allApprovals.push({
            club: clubCode,
            clubName,
            name: appr.name,
            category: appr.category || 'General',
            sanctioned,
            spent,
            utilized,
            utilPct: sanctioned ? Math.round((utilized / sanctioned) * 100) : 0,
            advance: appr.advance === 'Yes',
            advanceAmt: appr.advanceAmt || 0,
            sponsorUsed: appr.sponsorUsed === 'Yes',
            sponsorAmt: appr.sponsorAmt || 0,
            addendum: appr.addendum || '',
          });
        }
      });

      // RIO
      (repData.rio?.rio || []).forEach((r) => {
        if (r && (r.action || r.type)) {
          allRisksAndIssues.push({
            club: clubCode,
            clubName,
            domain,
            type: r.type || 'Risk',
            area: r.area || 'General',
            action: r.action || '',
            deadline: r.deadline || '',
          });
        }
      });
    });

    res.json({
      success: true,
      stats: {
        totalReports,
        submittedReports,
        draftReports,
        reviewedReports,
        totalMembers,
        totalEventsPlanned,
        totalEventsConducted,
        totalAudience,
        totalProjectsActive,
        totalBudgetSanctioned,
        totalBudgetUtilized,
        budgetUtilizationRate: totalBudgetSanctioned ? Math.round((totalBudgetUtilized / totalBudgetSanctioned) * 100) : 0,
        domainStats,
      },
      allEvents,
      allProjects,
      allApprovals,
      allRisksAndIssues,
      allMediaLinks,
    });
  } catch (error) {
    console.error('Error in getAdminStats:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats', error: error.message });
  }
};
