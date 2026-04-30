// backend/routes/study.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const StudyLog = require('../models/StudyLog');
const User = require('../models/User');
const { query } = require('../config/db');

// POST /api/study/start  — begin session, upsert today's log
router.post('/start', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const targetSec = Math.round(user.hours_per_day * 3600);
    const log = await StudyLog.upsert(req.userId, user.day_in_plan, targetSec);
    const updated = await User.updateStreak(req.userId);
    res.json({ success: true, log, streak: updated.streak, dayInPlan: updated.day_in_plan });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/study/timer  — sync timer progress (every 60s from frontend)
router.post('/timer', auth, async (req, res) => {
  try {
    const { seconds } = req.body;
    if (!seconds || seconds < 1) return res.status(400).json({ success: false, message: 'Invalid seconds' });
    await StudyLog.addStudyTime(req.userId, seconds);
    await User.addStudyTime(req.userId, seconds);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/study/task-done  — mark a task complete
router.post('/task-done', auth, async (req, res) => {
  try {
    const { taskId, taskTitle, subject, dayInPlan } = req.body;
    if (!taskId) return res.status(400).json({ success: false, message: 'taskId required' });
    const result = await StudyLog.completeTask(req.userId, taskId, taskTitle, subject, dayInPlan);

    // Check & award achievements
    const taskCount = await query(
      `SELECT COUNT(*) AS cnt FROM task_completions WHERE user_id = $1`, [req.userId]
    );
    const cnt = parseInt(taskCount.rows[0].cnt);
    const badges = [];
    for (const [threshold, code] of [[1,'first_task'],[50,'tasks_50'],[100,'tasks_100']]) {
      if (cnt >= threshold) {
        const ach = await query(`SELECT id FROM achievements WHERE code = $1`, [code]);
        if (ach.rows.length) {
          await query(
            `INSERT INTO user_achievements (user_id, achievement_id) VALUES ($1,$2) ON CONFLICT DO NOTHING RETURNING *`,
            [req.userId, ach.rows[0].id]
          );
          badges.push(code);
        }
      }
    }
    res.json({ success: true, result, newBadges: badges });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/study/today — get today's full state
router.get('/today', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const log = await StudyLog.getTodayLog(req.userId);
    const completedTasks = await StudyLog.getTodayCompletedTasks(req.userId, user.day_in_plan);
    const notes = await StudyLog.getNotes(req.userId, user.day_in_plan);
    res.json({
      success: true,
      dayInPlan:    user.day_in_plan,
      hoursPerDay:  parseFloat(user.hours_per_day),
      streak:       user.streak,
      studySec:     log?.study_sec || 0,
      targetSec:    log?.target_sec || Math.round(user.hours_per_day * 3600),
      completedTasks,
      notes,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/study/note  — save note for a task
router.post('/note', auth, async (req, res) => {
  try {
    const { taskId, dayInPlan, content } = req.body;
    const note = await StudyLog.saveNote(req.userId, taskId, dayInPlan, content);
    res.json({ success: true, note });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/study/quiz-score  — record quiz result
router.post('/quiz-score', auth, async (req, res) => {
  try {
    const { score, subject, questionId, selectedOpt, isCorrect, timeTakenS } = req.body;
    if (score !== undefined) await StudyLog.recordQuizScore(req.userId, score);
    if (questionId) {
      await query(
        `INSERT INTO quiz_attempts (user_id, question_id, subject, selected_opt, is_correct, time_taken_s)
         VALUES ($1,$2,$3,$4,$5,$6)`,
        [req.userId, questionId, subject, selectedOpt, isCorrect, timeTakenS]
      );
    }
    // Check quiz achievement
    const avg = await query(
      `SELECT ROUND(AVG(CASE WHEN is_correct THEN 100 ELSE 0 END),1) AS avg FROM quiz_attempts WHERE user_id = $1`,
      [req.userId]
    );
    const avgScore = parseFloat(avg.rows[0].avg || 0);
    const badges = [];
    if (avgScore >= 90) badges.push('quiz_90');
    else if (avgScore >= 70) badges.push('quiz_70');
    res.json({ success: true, quizAvg: avgScore, newBadges: badges });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/study/plan  — 365-day plan for the user
router.get('/plan', auth, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const h = parseFloat(user.hours_per_day);
    const durMap = { 0.5:'20 min',1:'35 min',2:'60 min',4:'90 min',6:'120 min',8:'150 min',12:'180 min' };
    const dur = h<=0.5?'20 min':h<=1?'35 min':h<=2?'60 min':h<=4?'90 min':h<=6?'120 min':h<=8?'150 min':'180 min';
    // Just return user context; frontend has full SYLLABUS array
    res.json({
      success: true,
      dayInPlan: user.day_in_plan,
      hoursPerDay: h,
      durationPerTopic: dur,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
