/* timer.js — Study timer - FIXED: multiple start prevention */
var Timer = {
  interval:  null,
  syncInt:   null,

  start: function() {
    if (STATE.timerOn) return;          // prevent double-start
    STATE.timerOn = true;
    document.getElementById('startBtn').style.opacity = '0.5';
    document.getElementById('startBtn').disabled = true;

    Timer.interval = setInterval(function() {
      STATE.timerSec++;
      STATE.totalSec = (STATE.totalSec || 0) + 1;
      Timer.updateDisplay();
      if (STATE.timerSec % 60 === 0) {
        var d = new Date().getDay();
        if (!STATE.weekH) STATE.weekH = [0,0,0,0,0,0,0];
        STATE.weekH[d] = parseFloat((STATE.timerSec / 3600).toFixed(2));
        Timer.updateHourBar();
        saveState();
      }
    }, 1000);

    Timer.syncInt = setInterval(function() {
      if (STATE.timerOn) API.syncTimer(STATE.timerSec, new Date().getDay());
    }, 30000);
  },

  pause: function() {
    if (!STATE.timerOn) return;         // prevent double-pause
    STATE.timerOn = false;
    clearInterval(Timer.interval);
    clearInterval(Timer.syncInt);
    Timer.interval = null;
    Timer.syncInt  = null;
    document.getElementById('startBtn').style.opacity = '1';
    document.getElementById('startBtn').disabled = false;
    var d = new Date().getDay();
    if (!STATE.weekH) STATE.weekH = [0,0,0,0,0,0,0];
    STATE.weekH[d] = parseFloat((STATE.timerSec / 3600).toFixed(2));
    Timer.updateHourBar();
    saveState();
    API.syncTimer(STATE.timerSec, d);
  },

  reset: function() {
    Timer.pause();
    STATE.timerSec = 0;
    STATE.hourGoalCelebrated = false;
    Timer.updateDisplay();
    Timer.updateHourBar();
    saveState();
  },

  updateDisplay: function() {
    var h   = Math.floor(STATE.timerSec / 3600);
    var m   = Math.floor((STATE.timerSec % 3600) / 60);
    var s   = STATE.timerSec % 60;
    var str = (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    var el  = document.getElementById('timerDisp');
    var st  = document.getElementById('sTime');
    if (el) el.textContent = str;
    if (st) st.textContent = (STATE.timerSec/3600).toFixed(1)+'h';
    if (STATE.timerSec > 0 && STATE.timerSec % 3600 === 0) {
      App.toast('⭐ ' + Math.floor(STATE.timerSec/3600) + 'h done! Maa itni proud hai! 💛');
    }
  },

  updateHourBar: function() {
    var done   = STATE.timerSec / 60;
    var target = (STATE.hoursPerDay || 2) * 60;
    var pct    = Math.min(100, Math.round(done / target * 100));
    var fill   = document.getElementById('hbarFill');
    var doneEl = document.getElementById('hbarDone');
    var targEl = document.getElementById('hbarTarget');
    if (fill)   fill.style.width = pct + '%';
    if (doneEl) doneEl.textContent = done < 60 ? Math.round(done) + ' min studied' : (done/60).toFixed(1) + 'h studied';
    if (targEl) targEl.textContent = 'Target: ' + (STATE.hoursPerDay < 1 ? Math.round(STATE.hoursPerDay*60)+'min' : STATE.hoursPerDay+'h');
    if (pct >= 100 && !STATE.hourGoalCelebrated) {
      STATE.hourGoalCelebrated = true;
      setTimeout(function() {
        App.celebrate('⭐', 'Study Goal Complete! 💪', 'Poore '+STATE.hoursPerDay+'h kar liye! Maa khush hai! ❤️');
      }, 500);
    }
  }
};
