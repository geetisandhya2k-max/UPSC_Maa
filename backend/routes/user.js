// backend/routes/user.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const User = require('../models/User');
const StudyLog = require('../models/StudyLog');
const { query } = require('../config/db');

// GET /api/user/profile
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ success: false, message: 'Not found' });
    res.json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PATCH /api/user/hours
router.patch('/hours', auth,
  [body('hours').isFloat({ min: 0.5, max: 12 })],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, errors: errors.array() });
    try {
      const user = await User.updateHours(req.userId, req.body.hours);
      res.json({ success: true, user, message: `${req.body.hours}h target set! Maa will adjust your plan! 🎯` });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Server error' });
    }
  }
);

// PATCH /api/user/settings
router.patch('/settings', auth, async (req, res) => {
  try {
    const { alarmMorning, alarmAfternoon, alarmNight, alarmsActive } = req.body;
    const settings = await User.updateSettings(req.userId, { alarmMorning, alarmAfternoon, alarmNight, alarmsActive });
    res.json({ success: true, settings, message: 'Settings saved! Maa will ring at the right time! ⏰' });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/user/stats
router.get('/stats', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const weeklyHours = await StudyLog.getWeeklyHours(req.userId);
    const today = await StudyLog.getTodayLog(req.userId);

    // Quiz average
    const quizRes = await query(
      `SELECT ROUND(AVG(CASE WHEN is_correct THEN 100 ELSE 0 END), 1) AS avg_score,
              COUNT(*) AS total_attempts
       FROM quiz_attempts WHERE user_id = $1`,
      [req.userId]
    );

    // Count completed tasks
    const taskRes = await query(
      `SELECT COUNT(*) AS total FROM task_completions WHERE user_id = $1`,
      [req.userId]
    );

    // Days until UPSC Prelims 2026-05-24
    const prelims = new Date('2026-05-24');
    const daysLeft = Math.max(0, Math.ceil((prelims - new Date()) / 86400000));

    // Syllabus coverage
    const topicsDone = parseInt(taskRes.rows[0].total);

    res.json({
      success: true,
      stats: {
        streak:        user.streak,
        totalHours:    Math.floor(user.total_study_sec / 3600),
        dayInPlan:     user.day_in_plan,
        hoursPerDay:   parseFloat(user.hours_per_day),
        tasksDone:     topicsDone,
        quizAvg:       quizRes.rows[0].avg_score || null,
        weeklyHours,
        daysLeft,
        syllabusTopicsDone: Math.min(topicsDone, 420),
        todayStudySec: today?.study_sec || 0,
        todayTarget:   today?.target_sec || (user.hours_per_day * 3600),
      }
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/user/achievements
router.get('/achievements', auth, async (req, res) => {
  try {
    const result = await query(
      `SELECT a.*, ua.earned_at
       FROM achievements a
       LEFT JOIN user_achievements ua ON ua.achievement_id = a.id AND ua.user_id = $1
       ORDER BY ua.earned_at DESC NULLS LAST`,
      [req.userId]
    );
    res.json({ success: true, achievements: result.rows });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
