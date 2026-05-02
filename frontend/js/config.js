/* config.js — Global config, auto-detects environment */
var CONFIG = {
  API_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : '/api',
  TOKEN_KEY:      'upscMaaToken',
  STATE_KEY:      'uMaa3',
  USER_STATE_KEY: 'uMaa3'
};

var STATE = {
  streak: 0, dayInPlan: 1, tasksComp: [], timerSec: 0, timerOn: false,
  weekH: [0,0,0,0,0,0,0], qScores: [], notes: {}, hoursPerDay: 2,
  alarms: { morning: '06:00', afternoon: '14:00', night: '21:00', active: true },
  lastAlarmChk: '', lastStudyDate: '', totalSec: 0, firstLaunch: null,
  topicsDone: 0, hourGoalCelebrated: false, targetDays: 365
};

function loadState() {
  try {
    var key = CONFIG.USER_STATE_KEY || CONFIG.STATE_KEY;
    var saved = localStorage.getItem(key);
    if (saved) {
      var parsed = JSON.parse(saved);
      Object.keys(parsed).forEach(function(k) { STATE[k] = parsed[k]; });
    }
  } catch(e) {}
}

function saveState() {
  try {
    var key = CONFIG.USER_STATE_KEY || CONFIG.STATE_KEY;
    localStorage.setItem(key, JSON.stringify(STATE));
  } catch(e) {}
}

loadState();
