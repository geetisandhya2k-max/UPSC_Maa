/* settings.js */
var Settings = {

  onHourChange: function(v) {
    var h = parseFloat(v);
    STATE.hoursPerDay = h;
    document.getElementById('hourSV').textContent = h + 'h';
    Settings.buildPreview(h);
    Tasks.render();
    App.updateAdaptBanner();
    Timer.updateHourBar();
    saveState();
    Auth.updateUser({ hoursPerDay: h });
    API.updateHours(h);
  },

  onTargetDaysChange: function(v) {
    var days = parseInt(v);
    STATE.targetDays = days;
    var sv = document.getElementById('targetDaysSV');
    if (sv) sv.textContent = days + ' days';
    Settings.updateTargetInfo(days);
    // Recalculate dayInPlan with new target
    var now = new Date();
    STATE.dayInPlan = Math.min(days, Math.floor((now - new Date(STATE.firstLaunch)) / 864e5) + 1);
    saveState();
    // Update everything that depends on targetDays
    Tasks.render();
    App.updateAdaptBanner();
    // Refresh plan tab if open
    if (document.getElementById('pg-plan').classList.contains('active')) {
      Plan.renderTabs();
      Plan.renderContent();
    }
    App.toast('📅 Plan updated to ' + days + ' days!');
    // Update plan title immediately
    var titleEl = document.getElementById('planTitle');
    if (titleEl) titleEl.textContent = days + '-Day UPSC Plan (' + Math.round(days/30) + ' months)';
    // Also force refresh plan if visible
    Plan.renderTabs();
    Plan.renderContent();
  },

  updateTargetInfo: function(days) {
    var el = document.getElementById('targetDaysInfo');
    if (!el) return;
    var months     = (days / 30).toFixed(1);
    var tasksCount = Tasks.get(STATE.hoursPerDay || 2, STATE.dayInPlan || 1).length;
    var topicsDay  = Math.ceil(420 / days);
    var maaMsg     = days <= 90  ? 'Bahut tight! Kam se kam 6h/day chahiye!' :
                     days <= 180 ? 'Good target! 4-6h daily karo!' :
                     days <= 365 ? 'Perfect — 1 year is ideal for UPSC!' :
                                   'Aaram se chaloge — but consistency must!';
    el.innerHTML =
      '<div class="tp-item"><span class="tp-lbl">Target</span><span class="tp-val">'+days+' days ('+months+' months)</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Topics/day</span><span class="tp-val">'+topicsDay+' topics</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Daily tasks</span><span class="tp-val">'+tasksCount+' tasks</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Maa says</span><span class="tp-val" style="color:var(--sf)">'+maaMsg+'</span></div>';
  },

  buildPreview: function(h) {
    var mins = h * 60;
    var tier, tasks, note;
    if      (mins <= 30)  { tier='Beginner (30 min)';    tasks=2;  note='Build the habit first!'; }
    else if (mins <= 60)  { tier='Starter (1 hr)';       tasks=3;  note='Adding more helps!'; }
    else if (mins <= 120) { tier='Regular (1-2 hrs)';    tasks=4;  note='Consistent = winner!'; }
    else if (mins <= 240) { tier='Serious (2-4 hrs)';    tasks=5;  note='Solid aspirant!'; }
    else if (mins <= 360) { tier='Dedicated (4-6 hrs)';  tasks=6;  note='Maa proud hai!'; }
    else if (mins <= 480) { tier='Aspirant (6-8 hrs)';   tasks=7;  note='Topper level!'; }
    else if (mins <= 600) { tier='Topper (8-10 hrs)';    tasks=8;  note='Rank 1 material!'; }
    else                  { tier='IAS Officer (10-12h)'; tasks=10; note='FULL MODE! 🏆'; }
    var el = document.getElementById('tasksPreview');
    if (!el) return;
    el.innerHTML =
      '<h4>📋 Your Adaptive Plan</h4>' +
      '<div class="tp-item"><span class="tp-lbl">Mode</span><span class="tp-val">'+tier+'</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Daily tasks</span><span class="tp-val">'+tasks+' tasks</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Avg per task</span><span class="tp-val">~'+Math.floor(mins/tasks)+' min</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Maa says</span><span class="tp-val" style="color:var(--sf)">'+note+'</span></div>';
  },

  toggleAlarm: function() {
    STATE.alarms.active = !STATE.alarms.active;
    document.getElementById('alTog').classList.toggle('on', STATE.alarms.active);
    saveState();
  },

  save: function() {
    STATE.alarms.morning   = document.getElementById('alM').value;
    STATE.alarms.afternoon = document.getElementById('alA').value;
    STATE.alarms.night     = document.getElementById('alN').value;
    saveState();
    Auth.updateUser({ alarms: STATE.alarms });
    API.updateProfile({ alarms: STATE.alarms });
    App.toast('✅ Settings saved! Maa will remind you! 💛');
  },

  restore: function() {
    var hs = document.getElementById('hourSlider');
    var hv = document.getElementById('hourSV');
    if (hs) hs.value = STATE.hoursPerDay || 2;
    if (hv) hv.textContent = (STATE.hoursPerDay || 2) + 'h';

    var td  = STATE.targetDays || 365;
    var tds = document.getElementById('targetDaysSlider');
    var tdv = document.getElementById('targetDaysSV');
    if (tds) tds.value = td;
    if (tdv) tdv.textContent = td + ' days';
    Settings.updateTargetInfo(td);

    var alM = document.getElementById('alM');
    var alA = document.getElementById('alA');
    var alN = document.getElementById('alN');
    var alT = document.getElementById('alTog');
    if (alM) alM.value = STATE.alarms.morning   || '06:00';
    if (alA) alA.value = STATE.alarms.afternoon || '14:00';
    if (alN) alN.value = STATE.alarms.night     || '21:00';
    if (alT) alT.classList.toggle('on', STATE.alarms.active !== false);

    Settings.buildPreview(STATE.hoursPerDay || 2);
  }
};
