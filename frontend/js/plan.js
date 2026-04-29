/* plan.js — 365-day plan rendering */
const PHASES = [
  { name:'Foundation', days:'1–90',   desc:'All NCERTs' },
  { name:'Core Study',  days:'91–210', desc:'Standard books' },
  { name:'Revision',    days:'211–300',desc:'Notes + Writing' },
  { name:'Mock Tests',  days:'301–365',desc:'PYQs + Final' },
];
let activePlan = 'All';

const Plan = {
  renderTabs() {
    document.getElementById('planTabs').innerHTML =
      ['All', ...PHASES.map(p=>p.name)].map(p =>
        `<button class="ptab ${activePlan===p?'active':''}" onclick="Plan.setPhase('${p}')">${p}</button>`
      ).join('');
  },

  setPhase(p) { activePlan = p; this.renderTabs(); this.renderContent(); },

  buildDays() {
    const days = [];
    for (let d = 1; d <= 365; d++) {
      const t = SYLLABUS[(d-1) % SYLLABUS.length];
      const h = STATE.hoursPerDay;
      const dur = h<=0.5?'20 min':h<=1?'35 min':h<=2?'60 min':h<=4?'90 min':h<=6?'120 min':h<=8?'150 min':'180 min';
      days.push({ day:d, topic:t, dur, isDone:d<STATE.dayInPlan, isToday:d===STATE.dayInPlan });
    }
    return days;
  },

  renderContent() {
    const all = this.buildDays();
    let filtered = all;
    if (activePlan !== 'All') {
      const ph = PHASES.find(p => p.name === activePlan);
      if (ph) { const [s,e]=ph.days.split('–').map(Number); filtered=all.filter(d=>d.day>=s&&d.day<=e); }
    }
    let html = '';
    for (let i = 0; i < filtered.length; i += 7) {
      const chunk = filtered.slice(i, i+7);
      const s = chunk[0].day, e = chunk[chunk.length-1].day;
      const phase = PHASES.find(p=>{const[a,b]=p.days.split('–').map(Number);return s>=a&&s<=b;})||PHASES[0];
      html += `<div class="wg"><div class="wg-ttl">Days ${s}–${e} · ${phase.name} · ${chunk[0].topic.sub}</div>`;
      chunk.forEach(d => {
        const cls = d.isToday?'today-row':d.isDone?'done-row':'';
        html += `<div class="dr ${cls}" onclick="App.openDayLesson(${d.day})">
          <div class="dnum">${d.day}</div>
          <div class="dinfo">
            <div class="dsub">${d.topic.icon} ${d.topic.topic} ${d.isToday?'<span style="color:var(--sf);font-size:8px;">← TODAY</span>':''}</div>
            <div class="dtop">${d.topic.details.slice(0,55)}${d.topic.details.length>55?'…':''}</div>
            <div class="ddur">⏱️ ${d.dur}</div>
          </div>
          <div class="dsts">${d.isDone?'✅':d.isToday?'📖':'⭕'}</div>
        </div>`;
      });
      html += '</div>';
    }
    document.getElementById('planContent').innerHTML = html;
  }
};
