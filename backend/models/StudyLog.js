const mongoose = require('mongoose');

// Compatibility stub — real progress data is in DailyProgress model
const studyLogSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date:       { type: String },
  studySec:   { type: Number, default: 0 },
  targetSec:  { type: Number, default: 7200 }
}, { timestamps: true });

studyLogSchema.statics.getWeeklyHours = async function(userId) {
  const weekAgo = new Date(); weekAgo.setDate(weekAgo.getDate()-7);
  const logs = await this.find({ user: userId, createdAt: { $gte: weekAgo } });
  const result = [0,0,0,0,0,0,0];
  logs.forEach(l => {
    const d = new Date(l.date || l.createdAt).getDay();
    result[d] = parseFloat((l.studySec/3600).toFixed(2));
  });
  return result;
};

studyLogSchema.statics.getTodayLog = async function(userId) {
  const today = new Date().toISOString().slice(0,10);
  return this.findOne({ user: userId, date: today });
};

module.exports = mongoose.model('StudyLog', studyLogSchema);
