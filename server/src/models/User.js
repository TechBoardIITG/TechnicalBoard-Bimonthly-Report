import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['club_secretary', 'admin', 'tech_secy', 'oc', 'events_head', 'webmaster'],
      default: 'club_secretary',
    },
    clubCode: {
      type: String,
      uppercase: true,
      trim: true,
      default: null,
    },
    clubName: {
      type: String,
      trim: true,
      default: null,
    },
    domain: {
      type: String,
      trim: true,
      default: null,
    },
    isFirstLogin: {
      type: Boolean,
      default: true,
    },
    passwordChangedAt: {
      type: Date,
      default: null,
    },
    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Method to compare candidate password
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model('User', UserSchema);
