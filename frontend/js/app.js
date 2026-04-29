/* app.js — Main orchestrator */
const MAA_QUOTES = [
  "Uthh beta! Roz subah ek naya mauka milta hai. Aaj ki mehnat = kal ka IAS badge! 💛",
  "Beta, UPSC ek marathon hai, sprint nahi. Consistent raho — yahi winners ka raaz hai. 🔥",
  "Thaka hai? Maa bhi thak jaati hai. Lekin sapna nahi thakta. Uthh aur padh! 💪",
  "Aaj ki current affairs padh li? Kal ka topper wahi hoga jo aaj ki news samajhta hai! 📰",
  "Answer writing daily karo. Rank 1 aur Rank 500 ka fark sirf writing quality hai! ✍️",
  "Jab lage 'chhod doon' — yaad karo kyun shuru kiya tha. Maa hamesha saath hai! 🌟",
];

let dIP = null;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault(); dIP = e;
  document.getElementById('installBtn').style.display = 'block';
});

const App = {
  async init() {
    if (!Auth.init()) return;  // show login if no token

    const now = new Date();
    if (!STATE.firstLaunch) { STATE.firstLaunch = now.toISOString(); saveState(); }
    STATE.dayInPlan = Math.min(365, Math.floor((now - new Date(STATE.firstLaunch)) / 864e5) + 1);

    document.getElementById('hDate').textContent = now.toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'});
    document.getElementById('todayDate').textContent = now.toLocaleDateString('en-IN',{day:'numeric',month:'short'});
    document.getElementById('streakN').textContent = STATE.streak;
    document.getElementById('maaMsg').textContent = MAA_QUOTES[Math.floor(Math.random()*MAA_QUOTES.length)];

    Settings.restore();
    Tasks.render();
    Flashcards.render();
    this.renderSubjects();
    Timer.updateDisplay();
    Timer.updateHourBar();
    this.updateAdaptBanner();

    // Alarm tick every 30s
    setInterval(() => Notifications.tick(), 30000);
    Notifications.tick();

    // Load server progress and merge
    const todayData = await API.today();
    if (todayData?.progress) {
      const sp = todayData.progress;
      if (sp.tasksCompleted?.length) {
        sp.tasksCompleted.forEach(id => {
          if (!STATE.tasksComp.includes(id)) STATE.tasksComp.push(id);
        });
        saveState();
        Tasks.render();
      }
    }
    if (todayData?.streak) {
      STATE.streak = Math.max(STATE.streak, todayData.streak.current || 0);
      document.getElementById('streakN').textContent = STATE.streak;
    }

    setTimeout(() => this.showNotif('🌅', `Day ${STATE.dayInPlan} of Your IAS Journey!`,
      STATE.dayInPlan === 1
        ? 'Beta, aaj pehla din hai! Maa tere saath hai. Chal shuru karte hain! ❤️'
        : `Day ${STATE.dayInPlan} of 365. Streak: ${STATE.streak} days. ${STATE.streak>7?'Fantastic!':'Keep going beta!'} 💪`
    ), 1500);
  },

  goNav(page, el) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('pg-'+page).classList.add('active');
    document.querySelectorAll('.ni').forEach(n => n.classList.remove('active'));
    el.classList.add('active');
    if (page === 'stats')  StatsPage.render();
    if (page === 'plan')  { Plan.renderTabs(); Plan.renderContent(); }
  },

  updateAdaptBanner() {
    const h = STATE.hoursPerDay;
    const tasks = Tasks.get(h, STATE.dayInPlan);
    document.getElementById('abTitle').textContent = `Today: ${tasks.length} tasks · ${h<=1?'Beginner':h<=4?'Regular':h<=8?'Serious':'IAS Topper'} Mode`;
    document.getElementById('abSub').textContent   = `${h<1?Math.round(h*60)+'min':h+'h'} daily target · Adaptive plan active`;
  },

  renderSubjects() {
    const SUBJ = [
      {n:'Polity',icon:'⚖️',col:'#FF6B00'},{n:'History',icon:'🏺',col:'#FFB300'},
      {n:'Geography',icon:'🗺️',col:'#52B788'},{n:'Economy',icon:'💰',col:'#2176FF'},
      {n:'Environment',icon:'🌿',col:'#40916C'},{n:'Science',icon:'🔬',col:'#7B2FBE'},
      {n:'Governance',icon:'🏛️',col:'#E63946'},{n:'Ethics',icon:'🧠',col:'#FF6B6B'},
    ];
    const dayF = Math.min(100, Math.floor((STATE.dayInPlan/365)*100));
    document.getElementById('subjG').innerHTML = SUBJ.map(s => {
      const p = Math.min(100, Math.floor(dayF * 0.85));
      return `<div class="subj-card" onclick="App.openLesson('${s.n.toLowerCase().slice(0,6)}')">
        <div class="sico">${s.icon}</div>
        <div class="snam">${s.n}</div>
        <div class="sbar"><div class="sfil" style="width:${p}%;background:${s.col};"></div></div>
        <div class="spct">${p}% covered</div>
      </div>`;
    }).join('');
  },

  openLesson(key) {
    const l = LESSONS[key] || LESSONS.general;
    document.getElementById('lTtl').textContent  = l.title;
    document.getElementById('lSub').textContent  = l.sub;
    document.getElementById('lBody').innerHTML   = l.html;
    renderQuiz(l.quiz || []);
    document.getElementById('lessonMod').classList.add('show');
  },

  openDayLesson(day) {
    const t = SYLLABUS[(day-1) % SYLLABUS.length];
    const key = _tc(t);
    const l = LESSONS[key] || LESSONS.general;
    document.getElementById('lTtl').textContent = `Day ${day}: ${t.topic}`;
    document.getElementById('lSub').textContent = `${t.sub} · ${t.details}`;
    document.getElementById('lBody').innerHTML  = l.html;
    renderQuiz(l.quiz || []);
    document.getElementById('lessonMod').classList.add('show');
  },

  closeMod()     { document.getElementById('lessonMod').classList.remove('show'); },
  showNotif(e,t,m){ document.getElementById('nEmi').textContent=e; document.getElementById('nTtl').textContent=t; document.getElementById('nMsg').textContent=m; document.getElementById('notifOv').classList.add('show'); },
  dismissNotif() { document.getElementById('notifOv').classList.remove('show'); },
  celebrate(e,t,m){ document.getElementById('cEmi').textContent=e; document.getElementById('cTtl').textContent=t; document.getElementById('cMsg').textContent=m; document.getElementById('celebOv').classList.add('show'); confetti(); },
  closeCeleb()   { document.getElementById('celebOv').classList.remove('show'); document.getElementById('confC').innerHTML=''; },
  installPWA()   { if(dIP) dIP.prompt(); else App.toast('Chrome ⋮ → Add to Home Screen\nor Safari Share → Add to Home Screen 📲'); },

  toast(msg) {
    const e = document.querySelector('.toast'); if(e) e.remove();
    const t = document.createElement('div'); t.className='toast'; t.textContent=msg;
    document.body.appendChild(t); setTimeout(()=>t.remove(), 3600);
  }
};

// Quiz rendering (used in lessons)
let qAns = {};
function renderQuiz(qs) {
  if (!qs.length) { document.getElementById('lQuiz').innerHTML=''; return; }
  qAns = {};
  let h = `<div class="quiz-w"><h4>🧠 Maa's Quiz — aim for 70%+!</h4>`;
  qs.forEach((q,qi) => {
    h += `<div class="qq">Q${qi+1}: ${q.q}</div>`;
    h += q.opts.map((o,oi) =>
      `<div class="qo" id="qo${qi}_${oi}" onclick="ansQ(${qi},${oi},${q.ans})">${o}</div>`
    ).join('');
  });
  h += '</div>';
  document.getElementById('lQuiz').innerHTML = h;
}
async function ansQ(qi, sel, ans) {
  if (qAns[qi] !== undefined) return;
  qAns[qi] = sel === ans;
  document.querySelectorAll(`[id^="qo${qi}_"]`).forEach((el,i) => {
    if (i===ans) el.classList.add('correct');
    else if (i===sel && sel!==ans) el.classList.add('wrong');
  });
  if (sel===ans) App.toast('✅ Bilkul sahi! Maa proud hai! 🌟');
  else App.toast('❌ Galat beta! Study harder!');
  STATE.qScores.push(sel===ans?100:0);
  const avg = Math.round(STATE.qScores.reduce((a,b)=>a+b,0)/STATE.qScores.length);
  document.getElementById('sQuiz').textContent = avg + '%';
  saveState();
  await API.submitQuiz({ lessonKey:'mixed', subject:'Mixed', questions:[{selected:sel,correct:ans,isCorrect:sel===ans}], totalQ:1, correctQ:sel===ans?1:0, score:sel===ans?100:0 });
}

function confetti() {
  const cols=['#FF6B00','#FFB300','#52B788','#2176FF','#FF6B6B','#FFF','#FFD700'];
  const c=document.getElementById('confC'); c.innerHTML='';
  for(let i=0;i<110;i++){
    const p=document.createElement('div'); p.className='cp';
    p.style.cssText=`left:${Math.random()*100}%;top:-10px;background:${cols[Math.floor(Math.random()*cols.length)]};animation-delay:${Math.random()*2.5}s;animation-duration:${2.5+Math.random()*2}s;width:${5+Math.random()*10}px;height:${5+Math.random()*10}px;border-radius:${Math.random()>.5?'50%':'2px'};`;
    c.appendChild(p);
  }
}

// Boot
App.init();
