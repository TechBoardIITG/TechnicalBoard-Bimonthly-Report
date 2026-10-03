export const CLUBS = [
  { code: 'CNA', name: 'Consulting & Analytics', domain: 'Business' },
  { code: 'EDC', name: 'Entrepreneurship Cell', domain: 'Business' },
  { code: 'FEC', name: 'Finance & Economics', domain: 'Business' },
  { code: 'AERO', name: 'Aeromodelling', domain: 'Hardware' },
  { code: 'AUTO', name: 'Automobile', domain: 'Hardware' },
  { code: 'ELEC', name: 'Electronics', domain: 'Hardware' },
  { code: 'ROBO', name: 'Robotics', domain: 'Hardware' },
  { code: '4I', name: '4i Labs', domain: 'Hardware' },
  { code: 'QUIZ', name: 'Acumen', domain: 'Science' },
  { code: 'ASTRO', name: 'Equinox', domain: 'Science' },
  { code: 'POLY', name: 'Polygon', domain: 'Science' },
  { code: 'PRAK', name: 'Prakriti', domain: 'Science' },
  { code: 'CC', name: 'Coding', domain: 'Software' },
  { code: 'GDES', name: 'Game Development & E-Sports', domain: 'Software' },
  { code: 'AI', name: 'IITG AI', domain: 'Software' },
  { code: 'WS', name: 'Whitespace', domain: 'Software' }
];

export const CLUB = Object.fromEntries(CLUBS.map(c => [c.code, c]));

export const SCORE_X = [
  ['1', 'Not satisfactory: lack of documentation'],
  ['2', 'Not satisfactory: poor input from club and from myself'],
  ['3', 'Satisfactory: could improve with inputs from Club Heads'],
  ['4', 'Satisfactory: could improve with inputs from club members'],
  ['5', 'Satisfactory to the maximum under the conditions']
];

export const EXAMPLE_DATA = {
  cover: {
    club: 'ROBO',
    reportNo: 2,
    secretary: 'Aryan Sharma',
    periodFrom: '2026-11',
    periodTo: '2026-12',
    submittedOn: '2027-01-05'
  },
  ctm: {
    actions: [
      { item: 'Finalise the winter workshop schedule', progress: 'Dates fixed; venue request sent.', pct: '50' },
      { item: 'Set up a shared component inventory sheet', progress: 'Sheet is live and used by all project teams.', pct: '100' }
    ],
    self: { x: '4', y: '2', remarks: 'Good coordination with TB Heads and timely execution.' }
  },
  team: {
    heads: 4,
    core: 14,
    members: 120,
    inducted: 22,
    recruitment: 'Open call across hostels, short technical task round, followed by in-person interviews.',
    induction: 'Two onboarding sessions, orientation to lab safety, and buddy pairing with senior core members.',
    m_hc: 6,
    m_hc_att: 88,
    m_all: 2,
    m_all_att: 71,
    m_dom: 9,
    m_dom_att: 80,
    m_oth: 1,
    m_oth_att: 60,
    meetKinds: 'Bi-weekly core syncs, mechanical subteam builds, electrical design sprints.',
    engagement: 'Slack updates, monthly open labs, and weekend build sessions.',
    coordination: 'No major bottlenecks. Inter-subteam communication is smooth.',
    headsPerf: 'Exemplary dedication in mentoring first and second year student teams.',
    internalHealth: '8',
    overallHealth: '7',
    inactive: 'None',
    retention: 84,
    retentionWhy: 'Hands-on projects with clear ownership keep members motivated.',
    gsConcerns: 'Lab space allocation during peak competition seasons.',
    retentionRating: '7',
    self: { x: '4', y: '5', remarks: 'Active engagement and strong retention across domains.' }
  },
  events: {
    planned: 4,
    conducted: 3,
    audience: 540,
    collaborated: 1,
    turnoutNote: 'Very high participation for the hands-on workshops; online lecture had slightly lower live attendance.',
    events: [
      {
        name: 'Line Follower Sprint',
        no: 1,
        purpose: 'Beginner build-and-race event for first-years to learn basic PID and sensors.',
        timeline: 'Nov 12 - Nov 14, 2026',
        audience: 'First and second year B.Tech students.',
        highlight: 'Over 45 autonomous bots made it to the final qualification track.',
        vsLast: 'Doubled custom hardware fabrication compared to last tenure.',
        collab: 'Partnered with Electronics Club for sensor modules.',
        reach: 310,
        turnup: 142,
        otherMetrics: '35 teams submitted working designs',
        ratioNote: '46% turnup is solid given mid-semester academic load.',
        media: 'https://drive.google.com/drive/folders/example-robo-evt1'
      },
      {
        name: 'ROS 2 Workshop',
        no: 2,
        purpose: 'Intermediate robotics simulation and node architecture in Linux.',
        timeline: 'Dec 03 - Dec 05, 2026',
        audience: 'UG & PG robotics enthusiasts.',
        highlight: 'Hands-on Gazebo simulation deployment.',
        vsLast: 'First time using ROS 2 Humble instead of ROS 1.',
        collab: 'Conducted independently by Robotics Club.',
        reach: 260,
        turnup: 118,
        otherMetrics: '90 students completed all lab exercises',
        ratioNote: '45% attendance with high active completion.',
        media: 'https://drive.google.com/drive/folders/example-robo-evt2'
      }
    ],
    self: { x: '3', y: '8', remarks: 'Events executed smoothly with strong hands-on engagement.' }
  },
  comps: {
    comps: [
      {
        name: 'ABU Robocon India',
        no: 1,
        background: 'Premier national robotics competition representing IIT Guwahati.',
        timeline: 'Stage 1 submission: Dec 2026; Finale: March 2027',
        participants: [
          { pname: 'Aryan Sharma', roll: '220101001' },
          { pname: 'Tanvi Verma', roll: '220102045' },
          { pname: 'Rohan Joshi', roll: '230103088' }
        ],
        registered: 'Yes',
        budget: 'Yes',
        lastYear: 'Ranked Top 8 Nationally',
        other: 'Chassis fabrication in progress at 4i Labs.'
      }
    ],
    achs: [
      {
        comp: 'TB-ROBO-COM-01-26',
        positions: 'Stage 1 Design Qualified (Top 5)',
        compName: '',
        compId: '',
        background: '',
        shared: 'Yes',
        perfScore: '9',
        perfNote: 'CAD review praised by national evaluators.',
        highlight: 'Custom pneumatic shooting mechanism was highly commended.',
        media: 'https://drive.google.com/drive/folders/example-robo-ach'
      }
    ],
    self: { x: '4', y: '1', remarks: 'On track for national finals with validated prototypes.' }
  },
  projects: {
    active: 5,
    continuing: 2,
    newly: 3,
    continuingNote: 'Autonomous Rover & Quadruped Robot continuing into testing phase.',
    annexure: 'https://drive.google.com/drive/folders/example-project-annexure',
    projects: [
      {
        name: 'Autonomous delivery rover',
        no: 1,
        students: 6,
        progress: 60,
        deadline: '2027-02-20',
        progressNote: 'SLAM mapping integrated with LiDAR. Outdoor navigation trials active.',
        affiliation: 'TB & 4i Labs'
      },
      {
        name: 'Quadruped Robotic Dog',
        no: 2,
        students: 5,
        progress: 45,
        deadline: '2027-03-15',
        progressNote: 'Inverse kinematics simulation done; assembling leg joints with high-torque actuators.',
        affiliation: 'Robotics Club'
      }
    ],
    otherTech: 'Conducted 3 internal hands-on soldering & PCB design workshops for project teams.',
    self: { x: '3', y: '5', remarks: 'Good technical progress; awaiting custom PCB batch for final assembly.' }
  },
  outreach: {
    sponsors: [
      {
        sponsor: 'RoboElements Corp',
        event: 'Line Follower Sprint',
        basis: 'Component sponsorship for sensor kits & microcontrollers',
        amount: '₹25,000 + 40 Sensor Kits',
        deliverables: 'Logo on all event posters, banner in the arena, social media shoutout'
      }
    ],
    interCollege: 'Joint tech talks with robotics clubs from IIT Bombay & IIT Delhi.',
    industry: 'Alumni mentorship sessions from engineers at Boston Dynamics & ISRO.',
    professor: 'Dr. S. K. Dwivedy (Mechanical) guiding autonomous rover dynamics.',
    schools: 'Interactive robotics demonstration for 60 visiting high school students.',
    media: 'Featured in IITG Campus Newsletter for Robocon qualifier.',
    highlight: 'Secured industry sponsor for core competition components.',
    social: {
      instagram: { before: 2400, after: 2710, posts: 14 },
      linkedin: { before: 1100, after: 1235, posts: 6 }
    },
    otherSocial: [
      { platform: 'YouTube', before: 850, after: 940, posts: 3 }
    ],
    self: { x: '4', y: '3', remarks: 'Consistent social engagement and expanded external collaborations.' }
  },
  finance: {
    approvals: [
      {
        name: 'Line Follower Sprint Material',
        no: 1,
        category: 'Event',
        linked: 'TB-ROBO-EVT-01-26',
        sanctioned: 40000,
        spent: 36500,
        utilized: 30000,
        advance: 'Yes',
        advanceAmt: 15000,
        sponsorUsed: 'No',
        sponsorAmt: null,
        addendum: '',
        notes: 'Final settlement forms submitted to TB accounts.'
      },
      {
        name: 'Rover Drive Motors & LiDAR',
        no: 2,
        category: 'Project',
        linked: 'TB-ROBO-PRO-01-26',
        sanctioned: 25000,
        spent: 27800,
        utilized: 27800,
        advance: 'No',
        advanceAmt: null,
        sponsorUsed: 'Yes',
        sponsorAmt: 2800,
        addendum: 'Sponsorship adjustment applied',
        notes: 'Excess covered through RoboElements sponsorship fund.'
      }
    ],
    carried: 5000,
    sponsorReceived: 25000,
    self: { x: '3', y: '6', remarks: 'All accounts documented; reimbursements cleared on schedule.' }
  },
  rio: {
    rio: [
      {
        type: 'Risk',
        area: 'Events',
        deadline: '2027-01-15',
        action: 'End-semester lab examinations overlap with planned hackathon; proposing rescheduling to late January.'
      },
      {
        type: 'Opportunity',
        area: 'Projects',
        deadline: '2027-02-10',
        action: 'Joint rover demo with Electronics Club at Techevince to showcase autonomous sensor fusion.'
      }
    ],
    otherInfo: 'Club room renovation completed. New soldering stations are now operational.'
  },
  decl: {
    agree: true,
    signature: 'Aryan Sharma'
  }
};
