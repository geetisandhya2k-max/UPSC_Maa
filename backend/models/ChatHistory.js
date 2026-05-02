const mongoose = require('mongoose');

const chatHistorySchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messages: [{
    role:      { type: String, enum: ['user', 'assistant'], required: true },
    content:   { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
  }],
  sessionDate: { type: String }  // "YYYY-MM-DD"
}, { timestamps: true });

chatHistorySchema.index({ user: 1, sessionDate: 1 });

module.exports = mongoose.model('ChatHistory', chatHistorySchema);
