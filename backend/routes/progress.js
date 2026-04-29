const express = require('express');
const router  = express.Router();
const { DailyProgress, Streak } = require('../models/Progress');
const { protect } = require('../middleware/auth');

const todayStr = () => new Date().toISOString().slice(0, 10);

// GET /api/progress/today
router.get('/today', protect, async (req, res) => {
  try {
    const prog   = await DailyProgress.findOne({ user: req.user._id, date: todayStr() });
    const streak = await Streak.findOne({ user: req.user._id });
    res.json({ progress: prog || { tasksCompleted:[], studiedSeconds:0 }, streak });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/progress/task-done
router.post('/task-done', protect, async (req, res) => {
  const { taskId, dayInPlan, tasksTotal } = req.body;
  if (!taskId) return res.status(400).json({ error: 'taskId required' });
  try {
    const prog = await DailyProgress.findOneAndUpdate(
      { user: req.user._id, date: todayStr() },
      { $addToSet: { tasksCompleted: taskId },
        $setOnInsert: { dayInPlan: dayInPlan||1, tasksTotal: tasksTotal||0, targetHours: req.user.hoursPerDay }},
      { upsert: true, new: true }
    );
    // Update streak
    let streak = await Streak.findOne({ user: req.user._id });
    if (!streak) streak = await Streak.create({ user: req.user._id });
    const today = todayStr();
    if (streak.lastStudyDate !== today) {
      const yest = new Date(); yest.setDate(yest.getDate()-1);
      const yStr = yest.toISOString().slice(0,10);
      streak.current      = streak.lastStudyDate === yStr ? streak.current + 1 : 1;
      streak.longest      = Math.max(streak.longest, streak.current);
      streak.lastStudyDate = today;
      streak.totalDaysStudied += 1;
      streak.topicsDone   = (streak.topicsDone||0) + 1;
      await streak.save();
    }
    res.json({ success: true, progress: prog, streak });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/progress/timer
router.post('/timer', protect, async (req, res) => {
  const { seconds, dayOfWeek } = req.body;
  if (seconds === undefined) return res.status(400).json({ error: 'seconds required' });
  try {
    await DailyProgress.findOneAndUpdate(
      { user: req.user._id, date: todayStr() },
      { $set: { studiedSeconds: seconds } },
      { upsert: true }
    );
    const streak = await Streak.findOne({ user: req.user._id });
    if (streak) {
      const weekH = [...(streak.weeklyHours||[0,0,0,0,0,0,0])];
      weekH[dayOfWeek ?? new Date().getDay()] = parseFloat((seconds/3600).toFixed(2));
      streak.weeklyHours  = weekH;
      streak.totalSeconds = (streak.totalSeconds||0) + 30;
      await streak.save();
    }
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/progress/history
router.get('/history', protect, async (req, res) => {
  const days = parseInt(req.query.days)||30;
  const from = new Date(); from.setDate(from.getDate()-days);
  try {
    const history = await DailyProgress.find({
      user: req.user._id,
      date: { $gte: from.toISOString().slice(0,10) }
    }).sort({ date: -1 });
    const streak = await Streak.findOne({ user: req.user._id });
    res.json({ history, streak });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
