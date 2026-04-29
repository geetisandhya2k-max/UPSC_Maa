/* timer.js — Study timer with server sync */
const Timer = {
  interval: null,
  syncInterval: null,

  start() {
    if (STATE.timerOn) return;
    STATE.timerOn = true;
    document.getElementById('startBtn').style.opacity = '0.5';

    this.interval = setInterval(() => {
      STATE.timerSec++;
      STATE.totalSec++;
      this.updateDisplay();
      if (STATE.timerSec % 60 === 0) {
        const d = new Date().getDay();
        STATE.weekH[d] = parseFloat((STATE.timerSec / 3600).toFixed(2));
        this.updateHourBar();
        saveState();
      }
    }, 1000);

    // Sync to server every 30 seconds
    this.syncInterval = setInterval(() => {
      API.syncTimer(STATE.timerSec, new Date().getDay());
    }, 30000);
  },

  pause() {
    STATE.timerOn = false;
    clearInterval(this.interval);
    clearInterval(this.syncInterval);
    document.getElementById('startBtn').style.opacity = '1';
    API.syncTimer(STATE.timerSec, new Date().getDay());
    const d = new Date().getDay();
    STATE.weekH[d] = parseFloat((STATE.timerSec / 3600).toFixed(2));
    this.updateHourBar();
    saveState();
  },

  reset() {
    this.pause();
    STATE.timerSec = 0;
    STATE.hourGoalCelebrated = false;
    this.updateDisplay();
    this.updateHourBar();
  },

  updateDisplay() {
    const h = Math.floor(STATE.timerSec / 3600);
    const m = Math.floor((STATE.timerSec % 3600) / 60);
    const s = STATE.timerSec % 60;
    document.getElementById('timerDisp').textContent =
      `${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    document.getElementById('sTime').textContent = (STATE.timerSec / 3600).toFixed(1) + 'h';
    if (STATE.timerSec > 0 && STATE.timerSec % 3600 === 0) {
      App.toast(`⭐ ${Math.floor(STATE.timerSec/3600)}h done! Maa itni proud hai! 💛`);
    }
  },

  updateHourBar() {
    const done = STATE.timerSec / 60;
    const target = STATE.hoursPerDay * 60;
    const pct = Math.min(100, Math.round(done / target * 100));
    document.getElementById('hbarFill').style.width = pct + '%';
    document.getElementById('hbarDone').textContent =
      done < 60 ? Math.round(done) + ' min studied' : (done / 60).toFixed(1) + 'h studied';
    document.getElementById('hbarTarget').textContent =
      `Target: ${STATE.hoursPerDay < 1 ? Math.round(STATE.hoursPerDay * 60) + 'min' : STATE.hoursPerDay + 'h'}`;
    if (pct >= 100 && !STATE.hourGoalCelebrated) {
      STATE.hourGoalCelebrated = true;
      setTimeout(() => App.celebrate('⭐', 'Study Goal Complete! 💪',
        `Poore ${STATE.hoursPerDay}h study kar liye! Maa bahut khush hai! I love you beta! 🌟`), 500);
    }
  }
};
