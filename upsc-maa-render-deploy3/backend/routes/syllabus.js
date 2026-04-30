const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');

// Full 420-topic syllabus inline (same as frontend, served from API)
// Returns topics for a given day range
router.get('/topics', protect, (req, res) => {
  const { day, subject, phase } = req.query;
  // The full syllabus array is maintained in frontend/js/syllabus.js
  // This endpoint can filter from the DB or return metadata
  res.json({
    message: 'Syllabus data is in frontend/js/syllabus.js',
    totalTopics: 420,
    subjects: ['History','Polity','Geography','Economy','Environment','Science','Governance','Ethics','IR','CSAT'],
    phases: ['Foundation (Day 1-90)','Core Study (Day 91-210)','Revision (Day 211-300)','Mock Tests (Day 301-365)']
  });
});

// GET /api/syllabus/day/:dayNum — get plan for specific day
router.get('/day/:dayNum', protect, (req, res) => {
  const day = parseInt(req.params.dayNum);
  if (day < 1 || day > 365) return res.status(400).json({ error: 'Day must be 1-365' });
  res.json({ day, message: 'Full topic list is in frontend/js/syllabus.js, indexed by day' });
});

module.exports = router;
