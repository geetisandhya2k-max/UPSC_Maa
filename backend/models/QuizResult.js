const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonKey:  { type: String, required: true },   // e.g. "history", "polity"
  subject:    { type: String, required: true },
  dayInPlan:  { type: Number },
  date:       { type: String },

  questions: [{
    question:   { type: String },
    selected:   { type: Number },
    correct:    { type: Number },
    isCorrect:  { type: Boolean }
  }],

  totalQ:     { type: Number },
  correctQ:   { type: Number },
  score:      { type: Number },   // percentage 0-100
  timeTaken:  { type: Number }    // seconds
}, { timestamps: true });

quizResultSchema.index({ user: 1, subject: 1 });
quizResultSchema.index({ user: 1, date: 1 });

module.exports = mongoose.model('QuizResult', quizResultSchema);
