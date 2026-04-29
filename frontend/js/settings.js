/* settings.js */
const Settings = {
  async onHourChange(v) {
    const h = parseFloat(v);
    STATE.hoursPerDay = h;
    document.getElementById('hourSV').textContent = (h % 1 === 0 ? h : h) + 'h';
    this.buildPreview(h);
    Tasks.render();
    App.updateAdaptBanner();
    Timer.updateHourBar();
    saveState();
    await API.updateHours(h);
  },

  buildPreview(h) {
    const mins = h * 60;
    let tier, tasks, desc;
    if (mins<=30)  { tier='Beginner (≤30 min)'; tasks=2;  desc='1 topic + quick revision'; }
    else if (mins<=60)  { tier='Starter (30–60 min)'; tasks=3; desc='Topic + revision + CA'; }
    else if (mins<=120) { tier='Regular (1–2 hrs)'; tasks=4; desc='Topic + Quiz + Revision + CA'; }
    else if (mins<=240) { tier='Serious (2–4 hrs)'; tasks=5; desc:'Deep study + PYQ + Writing + Revision + CA'; }
    else if (mins<=360) { tier='Dedicated (4–6 hrs)'; tasks=6; desc:'Full day + mock quiz'; }
    else if (mins<=480) { tier='Aspirant (6–8 hrs)'; tasks=7; desc:'Topper + map practice'; }
    else if (mins<=600) { tier='Topper (8–10 hrs)'; tasks=8; desc:'2 subjects + full practice'; }
    else               { tier='IAS Officer Mode (10–12h)'; tasks=10; desc:'3 subjects + marathon'; }
    const minPerTask = Math.floor(mins/tasks);
    document.getElementById('tasksPreview').innerHTML =
      `<h4>📋 Your Plan</h4>
      <div class="tp-item"><span class="tp-lbl">Mode</span><span class="tp-val">${tier}</span></div>
      <div class="tp-item"><span class="tp-lbl">Daily tasks</span><span class="tp-val">${tasks} tasks</span></div>
      <div class="tp-item"><span class="tp-lbl">Avg per task</span><span class="tp-val">~${minPerTask} min</span></div>
      <div class="tp-item"><span class="tp-lbl">Syllabus in</span><span class="tp-val">${Math.ceil(420/tasks)} days</span></div>
      <div class="tp-item"><span class="tp-lbl">Maa says</span><span class="tp-val" style="color:var(--sf)">${h<=1?'Build the habit first!':h<=4?'Keep adding more hours!':h<=8?'Dedicated student!':'FULL IAS MODE! 🏆'}</span></div>`;
  },

  toggleAlarm() {
    STATE.alarms.active = !STATE.alarms.active;
    document.getElementById('alTog').classList.toggle('on', STATE.alarms.active);
    saveState();
  },

  async save() {
    STATE.alarms.morning   = document.getElementById('alM').value;
    STATE.alarms.afternoon = document.getElementById('alA').value;
    STATE.alarms.night     = document.getElementById('alN').value;
    saveState();
    await API.put('/users/profile', { alarms: STATE.alarms });
    App.toast('✅ Settings saved! Maa will remind you! 💛');
  },

  restore() {
    document.getElementById('hourSlider').value = STATE.hoursPerDay;
    document.getElementById('hourSV').textContent = STATE.hoursPerDay + 'h';
    document.getElementById('alM').value = STATE.alarms.morning  || '06:00';
    document.getElementById('alA').value = STATE.alarms.afternoon || '14:00';
    document.getElementById('alN').value = STATE.alarms.night    || '21:00';
    document.getElementById('alTog').classList.toggle('on', STATE.alarms.active !== false);
    this.buildPreview(STATE.hoursPerDay);
  }
};
