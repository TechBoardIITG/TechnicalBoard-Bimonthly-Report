import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

export const INITIAL_CLUBS = [
  { code: 'CNA', name: 'Consulting & Analytics', domain: 'Business' },
  { code: 'EDC', name: 'Entrepreneurship Cell', domain: 'Business' },
  { code: 'FEC', name: 'Finance & Economics', domain: 'Business' },
  { code: 'AERO', name: 'Aeromodelling Club', domain: 'Hardware' },
  { code: 'AUTO', name: 'Automobile Club', domain: 'Hardware' },
  { code: 'ELEC', name: 'Electronics Club', domain: 'Hardware' },
  { code: 'ROBO', name: 'Robotics Club', domain: 'Hardware' },
  { code: '4I', name: '4i Labs', domain: 'Hardware' },
  { code: 'QUIZ', name: 'Acumen Club', domain: 'Science' },
  { code: 'ASTRO', name: 'Equinox (Astronomy)', domain: 'Science' },
  { code: 'POLY', name: 'Polygon (Maths & Computing)', domain: 'Science' },
  { code: 'PRAK', name: 'Prakriti (Environment)', domain: 'Science' },
  { code: 'CC', name: 'Coding Club', domain: 'Software' },
  { code: 'GDES', name: 'Game Development & E-Sports', domain: 'Software' },
  { code: 'AI', name: 'IITG AI Club', domain: 'Software' },
  { code: 'WS', name: 'Whitespace (Design)', domain: 'Software' }
];

export const seedDefaultUsers = async () => {
  try {
    const salt = await bcrypt.genSalt(10);
    const passPrefix = process.env.DEFAULT_SECRETARY_PASS_PREFIX || 'tb@';
    const passSuffix = process.env.DEFAULT_SECRETARY_PASS_SUFFIX || '2026';

    // 1. Seed Club Secretaries
    for (const club of INITIAL_CLUBS) {
      const envUserKey = `SECY_${club.code}_USERNAME`;
      const envPassKey = `SECY_${club.code}_PASSWORD`;
      const username = (process.env[envUserKey] || club.code.toLowerCase()).trim().toLowerCase();
      const defaultPassword = process.env[envPassKey] || `tb@${club.code.toLowerCase()}2026`;

      const existing = await User.findOne({ username });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(defaultPassword, salt);
        await User.create({
          username,
          password: hashedPassword,
          name: `${club.name} Secretary`,
          role: 'club_secretary',
          clubCode: club.code,
          clubName: club.name,
          domain: club.domain,
          isFirstLogin: true,
        });
        console.log(`👤 Created secretary account: ${username} (env: ${envUserKey}, pass: ${defaultPassword})`);
      }
    }

    // 2. Seed Council / Admin roles from environment
    const adminAccounts = [
      {
        username: process.env.ADMIN_USERNAME || 'admin',
        name: 'Technical Board Admin',
        role: 'admin',
        defaultPass: process.env.ADMIN_PASSWORD || 'tb@admin2026',
      },
      {
        username: process.env.TECHSECY_USERNAME || 'techsecy',
        name: 'General Secretary (Technical)',
        role: 'tech_secy',
        defaultPass: process.env.TECHSECY_PASSWORD || 'tb@techsecy2026',
      },
      {
        username: process.env.OC_USERNAME || 'oc',
        name: 'Operations Coordinator',
        role: 'oc',
        defaultPass: process.env.OC_PASSWORD || 'tb@oc2026',
      },
      {
        username: process.env.EVENTS_USERNAME || 'events',
        name: 'Events Head',
        role: 'events_head',
        defaultPass: process.env.EVENTS_PASSWORD || 'tb@events2026',
      },
      {
        username: process.env.WEBMASTER_USERNAME || 'webmaster',
        name: 'Webmaster',
        role: 'webmaster',
        defaultPass: process.env.WEBMASTER_PASSWORD || 'tb@webmaster2026',
      },
    ];

    for (const acc of adminAccounts) {
      const existing = await User.findOne({ username: acc.username });
      if (!existing) {
        const hashedPassword = await bcrypt.hash(acc.defaultPass, salt);
        await User.create({
          username: acc.username,
          password: hashedPassword,
          name: acc.name,
          role: acc.role,
          isFirstLogin: false,
        });
        console.log(`🛡️ Created council/admin account: ${acc.username} (default pass: ${acc.defaultPass})`);
      }
    }
  } catch (error) {
    console.error('Error seeding default users:', error);
  }
};
