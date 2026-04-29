/* config.js — Auto-detects environment (Render or localhost) */
const CONFIG = {
  // On Render, frontend and backend are served from same origin.
  // In development, backend is on localhost:5000.
  API_URL: (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : '/api',           // same-origin on Render
  TOKEN_KEY:      'upscMaaToken',
  STATE_KEY:      'uMaa3',
  USER_STATE_KEY: 'uMaa3'
};

// Global state
const STATE = {
  streak:0, dayInPlan:1, tasksComp:[], timerSec:0, timerOn:false,
  weekH:[0,0,0,0,0,0,0], qScores:[], notes:{}, hoursPerDay:2,
  alarms:{ morning:'06:00', afternoon:'14:00', night:'21:00', active:true },
  lastAlarmChk:'', lastStudyDate:'', totalSec:0, firstLaunch:null,
  topicsDone:0, hourGoalCelebrated:false
};

function loadState() {
  try {
    const key   = CONFIG.USER_STATE_KEY || CONFIG.STATE_KEY;
    const saved = localStorage.getItem(key);
    if (saved) Object.assign(STATE, JSON.parse(saved));
  } catch(e) {}
}

function saveState() {
  try {
    localStorage.setItem(CONFIG.USER_STATE_KEY || CONFIG.STATE_KEY, JSON.stringify(STATE));
  } catch(e) {}
}

loadState();
