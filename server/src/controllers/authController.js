import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'technical_board_spr_secret_key_2026';

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      role: user.role,
      clubCode: user.clubCode,
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const authController = {
  // POST /api/auth/login
  async login(req, res) {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Username and password are required' });
      }

      const cleanUsername = String(username).trim().toLowerCase();
      const user = await User.findOne({ username: cleanUsername });

      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }

      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Invalid username or password' });
      }

      // Update last login
      user.lastLoginAt = new Date();
      await user.save();

      const token = generateToken(user);

      return res.json({
        success: true,
        message: 'Login successful',
        token,
        user: {
          id: user._id,
          username: user.username,
          name: user.name,
          role: user.role,
          clubCode: user.clubCode,
          clubName: user.clubName,
          domain: user.domain,
          isFirstLogin: Boolean(user.isFirstLogin),
        },
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ success: false, message: 'Server error during login', error: error.message });
    }
  },

  // POST /api/auth/change-password
  async changePassword(req, res) {
    try {
      const { currentPassword, newPassword, username: bodyUsername } = req.body;

      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({
          success: false,
          message: 'New password must be at least 6 characters long',
        });
      }

      // Extract user ID from token or from request if authenticated
      let user = null;
      const authHeader = req.headers.authorization;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
          const decoded = jwt.verify(token, JWT_SECRET);
          user = await User.findById(decoded.id);
        } catch {
          // invalid token
        }
      }

      if (!user && bodyUsername) {
        user = await User.findOne({ username: String(bodyUsername).trim().toLowerCase() });
      }

      if (!user) {
        return res.status(401).json({ success: false, message: 'User not found or unauthenticated' });
      }

      // If current password provided, verify it
      if (currentPassword) {
        const isMatch = await user.comparePassword(currentPassword);
        if (!isMatch) {
          return res.status(400).json({ success: false, message: 'Current password is incorrect' });
        }
      }

      // Hash and save new password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(newPassword, salt);
      user.isFirstLogin = false;
      user.passwordChangedAt = new Date();
      await user.save();

      const token = generateToken(user);

      return res.json({
        success: true,
        message: 'Password changed successfully! You can now access all portal features.',
        token,
        user: {
          id: user._id,
          username: user.username,
          name: user.name,
          role: user.role,
          clubCode: user.clubCode,
          clubName: user.clubName,
          domain: user.domain,
          isFirstLogin: false,
        },
      });
    } catch (error) {
      console.error('Change password error:', error);
      return res.status(500).json({ success: false, message: 'Error changing password', error: error.message });
    }
  },

  // GET /api/auth/me
  async getMe(req, res) {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: 'No authorization token provided' });
      }

      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      return res.json({
        success: true,
        user: {
          id: user._id,
          username: user.username,
          name: user.name,
          role: user.role,
          clubCode: user.clubCode,
          clubName: user.clubName,
          domain: user.domain,
          isFirstLogin: Boolean(user.isFirstLogin),
        },
      });
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
  },

  // GET /api/auth/users (for reference list & admin)
  async getUsers(req, res) {
    try {
      const users = await User.find().select('-password').sort({ role: 1, clubCode: 1 });
      return res.json({ success: true, users });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error fetching users' });
    }
  },
};
