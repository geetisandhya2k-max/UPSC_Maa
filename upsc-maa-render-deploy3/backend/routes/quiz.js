const express    = require('express');
const router     = express.Router();
const QuizResult = require('../models/QuizResult');
const { DailyProgress } = require('../models/Progress');
const { protect } = require('../middleware/auth');

router.post('/submit', protect, async (req, res) => {
  const { lessonKey, subject, questions, dayInPlan, timeTaken } = req.body;
  if (!questions?.length) return res.status(400).json({ error: 'questions required' });
  const correctQ = questions.filter(q => q.isCorrect).length;
  const score    = Math.round((correctQ / questions.length) * 100);
  const today    = new Date().toISOString().slice(0,10);
  try {
    const result = await QuizResult.create({
      user: req.user._id, lessonKey: lessonKey||'mixed',
      subject: subject||lessonKey||'Mixed', dayInPlan, date: today,
      questions, totalQ: questions.length, correctQ, score, timeTaken
    });
    await DailyProgress.findOneAndUpdate(
      { user: req.user._id, date: today },
      { $inc: { quizAttempts:1, quizCorrect: correctQ } },
      { upsert: true }
    );
    res.status(201).json({ result, score, correctQ, totalQ: questions.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/stats', protect, async (req, res) => {
  try {
    const results = await QuizResult.find({ user: req.user._id }).sort({ createdAt:-1 });
    const avg = results.length
      ? Math.round(results.reduce((a,r) => a+r.score, 0)/results.length) : 0;
    const bySubject = {};
    results.forEach(r => {
      if (!bySubject[r.subject]) bySubject[r.subject] = { attempts:0, total:0 };
      bySubject[r.subject].attempts++;
      bySubject[r.subject].total += r.score;
    });
    Object.keys(bySubject).forEach(s => {
      bySubject[s].avg = Math.round(bySubject[s].total/bySubject[s].attempts);
    });
    res.json({ average: avg, total: results.length, bySubject, recent: results.slice(0,10) });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
