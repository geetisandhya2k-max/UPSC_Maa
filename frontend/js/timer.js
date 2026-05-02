/* timer.js — Study timer */
var Timer = {
  interval: null,
  syncInt: null,

  start: function() {
    if (STATE.timerOn) return;
    STATE.timerOn = true;
    document.getElementById('startBtn').style.opacity = '0.5';
    Timer.interval = setInterval(function() {
      STATE.timerSec++;
      STATE.totalSec++;
      Timer.updateDisplay();
      if (STATE.timerSec % 60 === 0) {
        var d = new Date().getDay();
        STATE.weekH[d] = parseFloat((STATE.timerSec / 3600).toFixed(2));
        Timer.updateHourBar();
        saveState();
      }
    }, 1000);
    Timer.syncInt = setInterval(function() {
      API.syncTimer(STATE.timerSec, new Date().getDay());
    }, 30000);
  },

  pause: function() {
    STATE.timerOn = false;
    clearInterval(Timer.interval);
    clearInterval(Timer.syncInt);
    document.getElementById('startBtn').style.opacity = '1';
    API.syncTimer(STATE.timerSec, new Date().getDay());
    var d = new Date().getDay();
    STATE.weekH[d] = parseFloat((STATE.timerSec / 3600).toFixed(2));
    Timer.updateHourBar();
    saveState();
  },

  reset: function() {
    Timer.pause();
    STATE.timerSec = 0;
    STATE.hourGoalCelebrated = false;
    Timer.updateDisplay();
    Timer.updateHourBar();
  },

  updateDisplay: function() {
    var h = Math.floor(STATE.timerSec / 3600);
    var m = Math.floor((STATE.timerSec % 3600) / 60);
    var s = STATE.timerSec % 60;
    var str = (h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
    document.getElementById('timerDisp').textContent = str;
    document.getElementById('sTime').textContent = (STATE.timerSec/3600).toFixed(1)+'h';
    if (STATE.timerSec > 0 && STATE.timerSec % 3600 === 0) {
      App.toast('⭐ ' + Math.floor(STATE.timerSec/3600) + 'h done! Maa itni proud hai! 💛');
    }
  },

  updateHourBar: function() {
    var done   = STATE.timerSec / 60;
    var target = STATE.hoursPerDay * 60;
    var pct    = Math.min(100, Math.round(done / target * 100));
    document.getElementById('hbarFill').style.width = pct + '%';
    document.getElementById('hbarDone').textContent =
      done < 60 ? Math.round(done) + ' min studied' : (done/60).toFixed(1) + 'h studied';
    document.getElementById('hbarTarget').textContent =
      'Target: ' + (STATE.hoursPerDay < 1 ? Math.round(STATE.hoursPerDay*60)+'min' : STATE.hoursPerDay+'h');
    if (pct >= 100 && !STATE.hourGoalCelebrated) {
      STATE.hourGoalCelebrated = true;
      setTimeout(function() {
        App.celebrate('⭐','Study Goal Complete! 💪',
          'Poore '+STATE.hoursPerDay+'h study kar liye! Maa bahut khush hai! ❤️');
      }, 500);
    }
  }
};
