const express = require('express');
const router  = express.Router();
const { Streak } = require('../models/Progress');
const QuizResult = require('../models/QuizResult');
const Note       = require('../models/Note');
const { protect } = require('../middleware/auth');

router.get('/dashboard', protect, async (req, res) => {
  try {
    const streak    = await Streak.findOne({ user: req.user._id });
    const quizStats = await QuizResult.find({ user: req.user._id });
    const noteCount = await Note.countDocuments({ user: req.user._id });
    const daysLeft  = Math.max(0, Math.ceil((new Date('2026-05-24') - new Date()) / 864e5));
    const quizAvg   = quizStats.length
      ? Math.round(quizStats.reduce((a,r) => a+r.score, 0) / quizStats.length) : 0;

    const bySubject = {};
    quizStats.forEach(r => {
      if (!bySubject[r.subject]) bySubject[r.subject] = { attempts:0, total:0 };
      bySubject[r.subject].attempts++;
      bySubject[r.subject].total += r.score;
    });
    Object.keys(bySubject).forEach(s => {
      bySubject[s].avg = Math.round(bySubject[s].total / bySubject[s].attempts);
    });

    const topicsDone = Math.min(streak?.topicsDone||0, 420);
    res.json({
      streak: {
        current:     streak?.current||0,
        longest:     streak?.longest||0,
        totalDays:   streak?.totalDaysStudied||0,
        totalHours:  Math.floor((streak?.totalSeconds||0)/3600),
        topicsDone,
        weeklyHours: streak?.weeklyHours||[0,0,0,0,0,0,0]
      },
      quiz:    { average: quizAvg, total: quizStats.length, bySubject },
      notes:   { total: noteCount },
      syllabus:{ topicsDone, total:420, percent: Math.round(topicsDone/420*100) },
      exam:    { daysLeft, date:'2026-05-24' }
    });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
