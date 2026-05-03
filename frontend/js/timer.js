/* timer.js — Simple study time logger (submit hours studied) */
var Timer = {
  interval:  null,
  running:   false,
  startTime: null,

  // Log study time manually (user submits hours after studying)
  submitStudyTime: function() {
    var hrs = parseFloat(document.getElementById('studyHrsInput').value || '0');
    var min = parseInt(document.getElementById('studyMinInput').value || '0');
    if (isNaN(hrs)) hrs = 0;
    if (isNaN(min)) min = 0;
    var totalMin = Math.round(hrs * 60) + min;
    if (totalMin <= 0) { App.toast('⚠️ Enter study time first!'); return; }
    if (totalMin > 720) { App.toast('⚠️ Maximum 12 hours per day!'); return; }

    var addedSec = totalMin * 60;
    STATE.timerSec = (STATE.timerSec || 0) + addedSec;
    STATE.totalSec = (STATE.totalSec || 0) + addedSec;

    var d = new Date().getDay();
    if (!STATE.weekH) STATE.weekH = [0,0,0,0,0,0,0];
    STATE.weekH[d] = parseFloat((STATE.timerSec / 3600).toFixed(2));

    saveState();
    Timer.updateDisplay();
    Timer.updateHourBar();
    API.syncTimer(STATE.timerSec, d);

    // Reset inputs
    document.getElementById('studyHrsInput').value = '';
    document.getElementById('studyMinInput').value = '';

    // Celebrate if goal met
    var targetMin = (STATE.hoursPerDay || 2) * 60;
    var studiedMin = STATE.timerSec / 60;
    if (studiedMin >= targetMin && !STATE.hourGoalCelebrated) {
      STATE.hourGoalCelebrated = true;
      saveState();
      App.celebrate('⭐', 'Study Goal Met! 💪', 'Aaj ka '+STATE.hoursPerDay+'h target poora! Maa bahut khush hai! ❤️');
    } else {
      App.toast('✅ ' + totalMin + ' min study logged! Shabash beta! 🌟');
    }
  },

  resetDay: function() {
    if (!confirm('Reset today\'s study time?')) return;
    STATE.timerSec = 0;
    STATE.hourGoalCelebrated = false;
    var d = new Date().getDay();
    if (STATE.weekH) STATE.weekH[d] = 0;
    saveState();
    Timer.updateDisplay();
    Timer.updateHourBar();
    App.toast('🔄 Study time reset for today.');
  },

  updateDisplay: function() {
    var sec = STATE.timerSec || 0;
    var h   = Math.floor(sec / 3600);
    var m   = Math.floor((sec % 3600) / 60);
    var el  = document.getElementById('timerDisp');
    var st  = document.getElementById('sTime');
    if (el) el.textContent = h + 'h ' + m + 'min studied today';
    if (st) st.textContent = (sec / 3600).toFixed(1) + 'h';
  },

  updateHourBar: function() {
    var done   = (STATE.timerSec || 0) / 60;
    var target = (STATE.hoursPerDay || 2) * 60;
    var pct    = Math.min(100, Math.round(done / target * 100));
    var fill   = document.getElementById('hbarFill');
    var doneEl = document.getElementById('hbarDone');
    var targEl = document.getElementById('hbarTarget');
    if (fill)   fill.style.width   = pct + '%';
    if (doneEl) doneEl.textContent = done < 60 ? Math.round(done)+' min studied' : (done/60).toFixed(1)+'h studied';
    if (targEl) targEl.textContent = 'Target: '+STATE.hoursPerDay+'h';
  }
};
