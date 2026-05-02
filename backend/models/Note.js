const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  user:       { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  taskId:     { type: String, required: true },
  topicId:    { type: String },
  subject:    { type: String },
  dayInPlan:  { type: Number },
  content:    { type: String, default: '' },
  tags:       [{ type: String }],
  isPinned:   { type: Boolean, default: false },
  isReview:   { type: Boolean, default: false }  // flagged for re-read
}, { timestamps: true });

noteSchema.index({ user: 1, taskId: 1 });
noteSchema.index({ user: 1, subject: 1 });

module.exports = mongoose.model('Note', noteSchema);
