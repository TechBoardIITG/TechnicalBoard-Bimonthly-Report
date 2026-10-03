import mongoose from 'mongoose';

const ReportSchema = new mongoose.Schema(
  {
    schema: {
      type: String,
      default: 'TB/SPR/Revision-01',
    },
    reportId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    club: {
      type: String,
      required: true,
      trim: true,
    },
    clubName: {
      type: String,
      trim: true,
    },
    domain: {
      type: String,
      trim: true,
    },
    periodFrom: {
      type: String,
      trim: true,
    },
    periodTo: {
      type: String,
      trim: true,
    },
    secretary: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'reviewed'],
      default: 'draft',
      index: true,
    },
    selfScores: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    submittedAt: {
      type: Date,
    },
    reviewed: {
      type: Boolean,
      default: false,
    },
    report: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
      default: {},
    },
  },
  {
    timestamps: true,
    minimize: false,
  }
);

export const Report = mongoose.model('Report', ReportSchema);
