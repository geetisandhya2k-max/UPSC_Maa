const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true, maxlength: 60 },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:   { type: String, required: true, minlength: 6, select: false },
  phone:      { type: String, trim: true },
  avatar:     { type: String, default: '👩‍🎓' },
  role:       { type: String, enum: ['student', 'admin'], default: 'student' },

  // Study settings
  hoursPerDay:   { type: Number, default: 2, min: 0.5, max: 12 },
  targetYear:    { type: Number, default: 2026 },
  examDate:      { type: Date, default: new Date('2026-05-24') },
  firstLaunch:   { type: Date, default: Date.now },

  // Alarm settings
  alarms: {
    morning:   { type: String, default: '06:00' },
    afternoon: { type: String, default: '14:00' },
    night:     { type: String, default: '21:00' },
    active:    { type: Boolean, default: true }
  },

  // Push notification subscription
  pushSubscription: { type: Object, default: null },

  isActive:   { type: Boolean, default: true },
  lastLogin:  { type: Date }
}, { timestamps: true });

// Hash password before save
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Match password
userSchema.methods.matchPassword = async function (entered) {
  return bcrypt.compare(entered, this.password);
};

module.exports = mongoose.model('User', userSchema);
