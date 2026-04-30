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

  buildPreview: function(h) {
    var mins = h * 60;
    var tier, tasks, note;
    if (mins<=30)       { tier='Beginner (30 min)';    tasks=2;  note='Build the habit first!'; }
    else if (mins<=60)  { tier='Starter (1 hr)';       tasks=3;  note='Adding more helps daily!'; }
    else if (mins<=120) { tier='Regular (1-2 hrs)';    tasks=4;  note='Consistent = winner!'; }
    else if (mins<=240) { tier='Serious (2-4 hrs)';    tasks=5;  note='Solid aspirant mode!'; }
    else if (mins<=360) { tier='Dedicated (4-6 hrs)';  tasks=6;  note='Maa proud hai!'; }
    else if (mins<=480) { tier='Aspirant (6-8 hrs)';   tasks=7;  note='Topper level!'; }
    else if (mins<=600) { tier='Topper (8-10 hrs)';    tasks=8;  note='Rank 1 material!'; }
    else                { tier='IAS Officer (10-12h)'; tasks=10; note='FULL MODE! 🏆'; }
    document.getElementById('tasksPreview').innerHTML =
      '<h4>📋 Your Adaptive Plan</h4>' +
      '<div class="tp-item"><span class="tp-lbl">Mode</span><span class="tp-val">'+tier+'</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Daily tasks</span><span class="tp-val">'+tasks+' tasks</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Avg per task</span><span class="tp-val">~'+Math.floor(mins/tasks)+' min</span></div>' +
      '<div class="tp-item"><span class="tp-lbl">Syllabus in</span><span class="tp-val">'+Math.ceil(420/tasks)+' days</span></div>' +
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
    document.getElementById('hourSlider').value   = STATE.hoursPerDay;
    document.getElementById('hourSV').textContent = STATE.hoursPerDay + 'h';
    document.getElementById('alM').value          = STATE.alarms.morning   || '06:00';
    document.getElementById('alA').value          = STATE.alarms.afternoon || '14:00';
    document.getElementById('alN').value          = STATE.alarms.night     || '21:00';
    document.getElementById('alTog').classList.toggle('on', STATE.alarms.active !== false);
    Settings.buildPreview(STATE.hoursPerDay);
  }
};
