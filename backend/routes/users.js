const express = require('express');
const router  = express.Router();
const User    = require('../models/User');
const { protect } = require('../middleware/auth');

// GET /api/users/profile  OR  /api/user/profile
router.get('/profile', protect, async (req, res) => {
  try {
    res.json({ success: true, user: req.user });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/users/hours  OR  PATCH /api/user/hours
router.put('/hours', protect, async (req, res) => {
  const h = parseFloat(req.body.hoursPerDay || req.body.hours);
  if (!h || h < 0.5 || h > 12)
    return res.status(400).json({ error: 'Hours must be 0.5–12' });
  try {
    const user = await User.findByIdAndUpdate(req.user._id, { hoursPerDay: h }, { new: true });
    res.json({ success: true, user, message: `${h}h target set! Maa will adjust your plan! 🎯` });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.patch('/hours', protect, router.stack[router.stack.length - 1].handle);

// PUT /api/users/profile
router.put('/profile', protect, async (req, res) => {
  const allowed = ['name', 'hoursPerDay', 'alarms', 'phone', 'avatar'];
  const updates = {};
  allowed.forEach(k => { if (req.body[k] !== undefined) updates[k] = req.body[k]; });
  try {
    const user = await User.findByIdAndUpdate(req.user._id, updates, { new: true, runValidators: true });
    res.json({ success: true, user });
  } catch (err) { res.status(400).json({ error: err.message }); }
});

// PATCH /api/users/settings
router.patch('/settings', protect, async (req, res) => {
  const { alarmMorning, alarmAfternoon, alarmNight, alarmsActive, alarms } = req.body;
  const update = alarms
    ? { alarms }
    : { alarms: { morning: alarmMorning, afternoon: alarmAfternoon, night: alarmNight, active: alarmsActive } };
  try {
    const user = await User.findByIdAndUpdate(req.user._id, update, { new: true });
    res.json({ success: true, user, message: 'Settings saved! Maa will ring at the right time! ⏰' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PUT /api/users/push-subscription
router.put('/push-subscription', protect, async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { pushSubscription: req.body.subscription });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
