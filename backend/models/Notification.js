const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title:     { type: String, required: true },
  body:      { type: String, required: true },
  type:      { type: String, enum: ['alarm', 'achievement', 'reminder', 'system'], default: 'alarm' },
  isRead:    { type: Boolean, default: false },
  sentAt:    { type: Date, default: Date.now }
}, { timestamps: true });

notificationSchema.index({ user: 1, isRead: 1 });

module.exports = mongoose.model('Notification', notificationSchema);
