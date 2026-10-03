import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Report } from './models/Report.js';
import { Review } from './models/Review.js';

dotenv.config();

const sampleReport = {
  schema: 'TB/SPR/Revision-01',
  reportId: 'TB-ROBO-2',
  club: 'ROBO',
  clubName: 'Robotics',
  domain: 'Hardware',
  periodFrom: '2026-11',
  periodTo: '2026-12',
  secretary: 'Aryan Sharma',
  status: 'submitted',
  selfScores: {
    ctm: '4.2',
    team: '4.5',
    events: '3.8',
    comps: '4.1',
    projects: '3.5',
    outreach: '4.3',
    finance: '3.6',
  },
  submittedAt: new Date('2027-01-05T10:00:00Z'),
  reviewed: true,
  report: {
    cover: {
      club: 'ROBO',
      reportNo: 2,
      secretary: 'Aryan Sharma',
      periodFrom: '2026-11',
      periodTo: '2026-12',
      submittedOn: '2027-01-05',
    },
    ctm: {
      actions: [
        { item: 'Finalise the winter workshop schedule', progress: 'Dates fixed; venue request sent.', pct: '50' },
        { item: 'Set up a shared component inventory sheet', progress: 'Sheet is live and used by all project teams.', pct: '100' },
      ],
      self: { x: '4', y: '2', remarks: 'Good progress across all pending action items.' },
    },
    team: {
      heads: 4,
      core: 14,
      members: 120,
      inducted: 22,
      recruitment: 'Open call, a short task round, then interviews.',
      induction: 'Two onboarding sessions and buddy pairing with core members.',
      m_hc: 6,
      m_hc_att: 88,
      m_all: 2,
      m_all_att: 71,
      m_dom: 9,
      m_dom_att: 80,
      m_oth: 1,
      m_oth_att: 60,
      meetKinds: 'Domain syncs, hardware troubleshooting, Robocon team meetings.',
      engagement: 'Active discord channels, hands-on build nights, peer mentoring.',
      coordination: 'Coordination between mechanical and electronics tracks is strong.',
      headsPerf: 'Heads took lead on Robocon documentation and budget planning.',
      internalHealth: '8',
      overallHealth: '7',
      inactive: 'None',
      retention: 84,
      retentionWhy: 'Strong project hands-on participation kept members engaged.',
      gsConcerns: 'Need access to machine shop during late evenings.',
      retentionRating: '7',
      self: { x: '4', y: '5', remarks: 'Active engagement and strong retention across domains.' },
    },
    events: {
      planned: 4,
      conducted: 3,
      audience: 540,
      collaborated: 1,
      turnoutNote: 'Very high participation for the hands-on workshops.',
      events: [
        {
          name: 'Line Follower Sprint',
          no: 1,
          purpose: 'Beginner build-and-race event for first-years.',
          timeline: 'Nov 12 - Nov 14, 2026',
          audience: 'UG first years',
          highlight: 'Over 45 autonomous bots made it to the final qualification track.',
          reach: 310,
          turnup: 142,
          ratioNote: '46% turnup is solid given mid-semester academic load.',
        },
        {
          name: 'ROS 2 Workshop',
          no: 2,
          purpose: 'Intermediate robotics simulation and node architecture in Linux.',
          timeline: 'Dec 03 - Dec 05, 2026',
          audience: 'UG & PG robotics enthusiasts.',
          highlight: 'Hands-on Gazebo simulation deployment.',
          reach: 260,
          turnup: 118,
        },
      ],
      self: { x: '3', y: '8', remarks: 'Events executed smoothly with strong hands-on engagement.' },
    },
    comps: {
      comps: [
        {
          name: 'ABU Robocon India',
          no: 1,
          background: 'Premier national robotics competition.',
          timeline: 'Stage 1: Dec 2026; Finale: March 2027',
          participants: [
            { pname: 'Aryan Sharma', roll: '220101001' },
            { pname: 'Tanvi Verma', roll: '220102045' },
          ],
          registered: 'Yes',
          budget: 'Yes',
        },
      ],
      achs: [
        {
          comp: 'TB-ROBO-COM-01-26',
          positions: 'Stage 1 Design Qualified (Top 5)',
          shared: 'Yes',
          perfScore: '9',
          perfNote: 'CAD review praised by evaluators.',
        },
      ],
      self: { x: '4', y: '1', remarks: 'On track for national finals with validated prototypes.' },
    },
    projects: {
      active: 5,
      continuing: 2,
      newly: 3,
      projects: [
        {
          name: 'Autonomous delivery rover',
          no: 1,
          students: 6,
          progress: 60,
          deadline: '2027-02-20',
          progressNote: 'SLAM mapping integrated with LiDAR.',
        },
      ],
      self: { x: '3', y: '5', remarks: 'Good technical progress; awaiting custom PCB batch for final assembly.' },
    },
    outreach: {
      sponsors: [
        {
          sponsor: 'RoboElements Corp',
          event: 'Line Follower Sprint',
          amount: '₹25,000 + 40 Sensor Kits',
          deliverables: 'Logo on all event posters and banner in the arena.',
        },
      ],
      social: {
        instagram: { before: 2400, after: 2710, posts: 14 },
        linkedin: { before: 1100, after: 1235, posts: 6 },
      },
      self: { x: '4', y: '3', remarks: 'Consistent social engagement.' },
    },
    finance: {
      approvals: [
        {
          name: 'Line Follower Sprint Material',
          no: 1,
          category: 'Event',
          sanctioned: 40000,
          spent: 36500,
          utilized: 30000,
          advance: 'Yes',
          advanceAmt: 15000,
          sponsorUsed: 'No',
        },
        {
          name: 'Rover Drive Motors & LiDAR',
          no: 2,
          category: 'Project',
          sanctioned: 25000,
          spent: 27800,
          utilized: 27800,
          advance: 'No',
          sponsorUsed: 'Yes',
          sponsorAmt: 2800,
          addendum: 'Sponsorship adjustment applied',
        },
      ],
      carried: 5000,
      sponsorReceived: 25000,
      self: { x: '3', y: '6', remarks: 'All accounts documented; reimbursements cleared on schedule.' },
    },
    rio: {
      rio: [
        {
          type: 'Opportunity',
          area: 'Projects',
          action: 'Joint rover demo with Electronics Club at Techevince.',
        },
      ],
    },
    decl: {
      agree: true,
      signature: 'Aryan Sharma',
    },
  },
};

const sampleReview = {
  reportId: 'TB-ROBO-2',
  club: 'ROBO',
  review: {
    ctm: { x: '4', y: '5' },
    team: { x: '4', y: '3' },
    events: { x: '4', y: '0' },
    comps: { x: '4', y: '2' },
    projects: { x: '3', y: '8' },
    outreach: { x: '4', y: '1' },
    finance: { x: '3', y: '7' },
    domainIndex: 8.6,
    overallIndex: 8.4,
    rank: 3,
    strengths: 'Excellent Robocon qualification, strong member retention (84%), and high workshop participation.',
    gaps: 'Need faster clearance of advance settlements and lab space management during late hours.',
    toClub: 'Prepare CAD assembly presentation for interim review by Jan 25.',
    toCouncil: 'Assist with Central Workshop permissions for evening slot machining.',
    gsReview: 'Commendable performance by Robotics Club. The autonomous rover project has great potential for Techevince.',
  },
};

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/tb_progress_reports');
    console.log('Connected to MongoDB');

    await Report.findOneAndUpdate({ reportId: sampleReport.reportId }, sampleReport, { upsert: true, new: true });
    console.log('Sample report seeded: TB-ROBO-2');

    await Review.findOneAndUpdate({ reportId: sampleReview.reportId }, sampleReview, { upsert: true, new: true });
    console.log('Sample council review seeded: TB-ROBO-2');

    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
