/* timer.js — Auto-counting timer with Submit to save */
var Timer = {
  interval: null,

  start: function() {
    if (Timer.interval !== null) return;
    var btn = document.getElementById('startBtn');
    if (btn) { btn.style.opacity = '0.5'; btn.disabled = true; }
    STATE.timerOn = true;

    Timer.interval = setInterval(function() {
      STATE.timerSec = (STATE.timerSec || 0) + 1;
      Timer.updateDisplay();
      if (STATE.timerSec % 60 === 0) {
        var d = new Date().getDay();
        if (!STATE.weekH) STATE.weekH = [0,0,0,0,0,0,0];
        STATE.weekH[d] = parseFloat((STATE.timerSec / 3600).toFixed(2));
        saveState();
      }
    }, 1000);
  },

  pause: function() {
    if (Timer.interval === null) return;
    clearInterval(Timer.interval);
    Timer.interval = null;
    STATE.timerOn = false;
    var btn = document.getElementById('startBtn');
    if (btn) { btn.style.opacity = '1'; btn.disabled = false; }
    saveState();
    Timer.updateDisplay();
  },

  reset: function() {
    Timer.pause();
    STATE.timerSec = 0;
    STATE.hourGoalCelebrated = false;
    saveState();
    Timer.updateDisplay();
    Timer.updateHourBar();
    App.toast('🔄 Timer reset!');
  },

  submit: function() {
    if (Timer.interval !== null) Timer.pause();
    var sec = STATE.timerSec || 0;
    if (sec < 60) { App.toast('⚠️ Study at least 1 minute first!'); return; }

    STATE.totalSec = (STATE.totalSec || 0) + sec;
    var d = new Date().getDay();
    if (!STATE.weekH) STATE.weekH = [0,0,0,0,0,0,0];
    STATE.weekH[d] = parseFloat((STATE.totalSec / 3600).toFixed(2));
    saveState();

    Timer.updateHourBar();
    API.syncTimer(STATE.timerSec, d);

    var min = Math.round(sec / 60);
    var hrs = Math.floor(min / 60);
    var rem = min % 60;
    var label = hrs > 0 ? hrs + 'h ' + rem + 'min' : rem + ' min';
    App.toast('✅ ' + label + ' study submitted! Shabash beta! 🌟');

    // Check goal
    var targetSec = (STATE.hoursPerDay || 2) * 3600;
    if (STATE.timerSec >= targetSec && !STATE.hourGoalCelebrated) {
      STATE.hourGoalCelebrated = true;
      saveState();
      setTimeout(function() {
        App.celebrate('⭐', 'Study Goal Met! 💪',
          'Aaj ka ' + STATE.hoursPerDay + 'h target poora! Maa bahut khush hai! ❤️');
      }, 500);
    }
  },

  updateDisplay: function() {
    var sec = STATE.timerSec || 0;
    var h   = Math.floor(sec / 3600);
    var m   = Math.floor((sec % 3600) / 60);
    var s   = sec % 60;
    var str = (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    var el  = document.getElementById('timerDisp');
    var st  = document.getElementById('sTime');
    if (el) el.textContent = str;
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
