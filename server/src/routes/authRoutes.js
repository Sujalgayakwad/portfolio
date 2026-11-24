import express from 'express';
import jwt from 'jsonwebtoken';
import { DataStore } from '../utils/dataStore.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const admin = await DataStore.authenticateAdmin(email, password);
    if (!admin) {
      return res.status(401).json({ error: 'Invalid admin credentials' });
    }

    const secret = process.env.JWT_SECRET || 'sujal_cyber_security_jwt_secret_token_99182374';
    const token = jwt.sign(
      { email: admin.email, role: admin.role, name: admin.name },
      secret,
      { expiresIn: '7d' }
    );

    return res.json({
      message: 'Authentication successful',
      token,
      user: admin
    });
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during authentication' });
  }
});

// GET /api/auth/verify
router.get('/verify', protect, (req, res) => {
  return res.json({
    valid: true,
    user: req.user
  });
});

// POST /api/auth/change-password
router.post('/change-password', protect, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Current and new passwords are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ error: 'New password must be at least 6 characters' });
    }

    await DataStore.updateAdminPassword(currentPassword, newPassword);
    return res.json({ message: 'Password updated successfully' });
  } catch (err) {
    return res.status(400).json({ error: err.message || 'Failed to update password' });
  }
});

export default router;
