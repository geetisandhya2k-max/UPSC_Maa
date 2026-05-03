/* config.js — Global config and state */
var CONFIG = {
  API_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : '/api',
  TOKEN_KEY:      'upscMaaToken',
  STATE_KEY:      'uMaa3',
  USER_STATE_KEY: 'uMaa3'
};

var STATE = {
  streak: 0, dayInPlan: 1, timerOn: false,
  weekH: [0,0,0,0,0,0,0], qScores: [], notes: {}, hoursPerDay: 2,
  alarms: { morning: '06:00', afternoon: '14:00', night: '21:00', active: true },
  lastAlarmChk: '', lastStudyDate: '', totalSec: 0, firstLaunch: null,
  topicsDone: 0, hourGoalCelebrated: false, targetDays: 365,

  // Per-day task tracking: { 'day1': ['t1','t2'], 'day2': ['t1'] }
  dayTasks: {},

  // Pending days: array of day numbers not fully completed
  pendingDays: []
};

function loadState() {
  try {
    var key    = CONFIG.USER_STATE_KEY || CONFIG.STATE_KEY;
    var saved  = localStorage.getItem(key);
    if (saved) {
      var parsed = JSON.parse(saved);
      Object.keys(parsed).forEach(function(k) { STATE[k] = parsed[k]; });
    }
  } catch(e) {}
}

function saveState() {
  try {
    localStorage.setItem(CONFIG.USER_STATE_KEY || CONFIG.STATE_KEY, JSON.stringify(STATE));
  } catch(e) {}
}

// Get completed tasks for a specific day
function getDayTasks(dayNum) {
  return (STATE.dayTasks && STATE.dayTasks['day' + dayNum]) || [];
}

// Save completed task for a specific day
function markDayTask(dayNum, taskId) {
  if (!STATE.dayTasks) STATE.dayTasks = {};
  var key = 'day' + dayNum;
  if (!STATE.dayTasks[key]) STATE.dayTasks[key] = [];
  if (STATE.dayTasks[key].indexOf(taskId) < 0) {
    STATE.dayTasks[key].push(taskId);
  }
}

// Check if a day is fully complete
function isDayComplete(dayNum) {
  var tasks     = Tasks.get(STATE.hoursPerDay, dayNum);
  var completed = getDayTasks(dayNum);
  return tasks.every(function(t) { return completed.indexOf(t.id) >= 0; });
}

// Update pending days list
function updatePendingDays() {
  var pending = [];
  for (var d = 1; d < STATE.dayInPlan; d++) {
    if (!isDayComplete(d)) pending.push(d);
  }
  STATE.pendingDays = pending;
  saveState();
  return pending;
}

loadState();
