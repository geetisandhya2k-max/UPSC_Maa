const mongoose = require('mongoose');

const dailyProgressSchema = new mongoose.Schema({
  user:          { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:          { type: String, required: true },   // "YYYY-MM-DD"
  dayInPlan:     { type: Number, required: true },

  // Tasks
  tasksTotal:    { type: Number, default: 0 },
  tasksCompleted: [{ type: String }],               // task IDs completed today

  // Time
  studiedSeconds: { type: Number, default: 0 },
  targetHours:   { type: Number, default: 2 },

  // Quiz
  quizAttempts:  { type: Number, default: 0 },
  quizCorrect:   { type: Number, default: 0 },

  // Hour completion flag
  hourGoalMet:   { type: Boolean, default: false },

  notes: { type: String, default: '' }
}, { timestamps: true });

// Compound index: one record per user per date
dailyProgressSchema.index({ user: 1, date: 1 }, { unique: true });

// ── Streak model ──
const streakSchema = new mongoose.Schema({
  user:           { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  current:        { type: Number, default: 0 },
  longest:        { type: Number, default: 0 },
  lastStudyDate:  { type: String, default: '' },    // "YYYY-MM-DD"
  totalDaysStudied: { type: Number, default: 0 },
  weeklyHours:    { type: [Number], default: [0,0,0,0,0,0,0] },
  totalSeconds:   { type: Number, default: 0 },
  topicsDone:     { type: Number, default: 0 }
}, { timestamps: true });

module.exports = {
  DailyProgress: mongoose.model('DailyProgress', dailyProgressSchema),
  Streak: mongoose.model('Streak', streakSchema)
};
