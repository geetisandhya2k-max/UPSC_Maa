const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const User = require('../models/User');
const { Streak } = require('../models/Progress');
const { protect } = require('../middleware/auth');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '30d' });

// POST /api/auth/register
router.post('/register', async (req, res) => {
  const schema = Joi.object({
    name:        Joi.string().min(2).max(60).required(),
    email:       Joi.string().email().required(),
    password:    Joi.string().min(6).required(),
    hoursPerDay: Joi.number().min(0.5).max(12).default(2)
  });
  const { error, value } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const exists = await User.findOne({ email: value.email });
    if (exists) return res.status(400).json({ error: 'Email already registered' });

    const user = await User.create(value);
    // Create streak record
    await Streak.create({ user: user._id });

    const token = signToken(user._id);
    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email, hoursPerDay: user.hoursPerDay, firstLaunch: user.firstLaunch }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'Email and password required' });

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ error: 'Invalid credentials' });

    user.lastLogin = new Date();
    await user.save({ validateBeforeSave: false });

    const token = signToken(user._id);
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, hoursPerDay: user.hoursPerDay,
              alarms: user.alarms, firstLaunch: user.firstLaunch }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
