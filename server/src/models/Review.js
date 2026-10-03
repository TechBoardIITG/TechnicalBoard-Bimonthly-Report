import mongoose from 'mongoose';

const ReviewSchema = new mongoose.Schema(
  {
    reportId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    reportRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Report',
    },
    club: {
      type: String,
      trim: true,
    },
    review: {
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

export const Review = mongoose.model('Review', ReviewSchema);
