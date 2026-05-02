/* app.js — Main orchestrator */
var MAA_QUOTES = [
  "Uthh beta! Roz subah ek naya mauka milta hai. Aaj ki mehnat = kal ka IAS badge! 💛",
  "Beta, UPSC ek marathon hai, sprint nahi. Consistent raho — yahi winners ka raaz hai. 🔥",
  "Thaka hai? Maa bhi thak jaati hai. Lekin sapna nahi thakta. Uthh aur padh! 💪",
  "Aaj ki current affairs padh li? Kal ka topper wahi hoga jo aaj ki news samajhta hai! 📰",
  "Answer writing daily karo. Rank 1 aur Rank 500 ka fark sirf writing quality hai! ✍️",
  "Jab lage 'chhod doon' — yaad karo kyun shuru kiya tha. Maa hamesha saath hai! 🌟",
];

var dIP = null;
window.addEventListener('beforeinstallprompt', function(e) {
  e.preventDefault(); dIP = e;
  var ib = document.getElementById('installBtn');
  if (ib) ib.style.display = 'block';
});

var App = {
  init: function() {
    var now = new Date();
    if (!STATE.firstLaunch) { STATE.firstLaunch = now.toISOString(); saveState(); }
    var targetDays = STATE.targetDays || 365;
    STATE.dayInPlan = Math.min(targetDays, Math.floor((now - new Date(STATE.firstLaunch)) / 864e5) + 1);

    document.getElementById('hDate').textContent =
      now.toLocaleDateString('en-IN', { weekday:'long', day:'numeric', month:'long' });
    document.getElementById('todayDate').textContent =
      now.toLocaleDateString('en-IN', { day:'numeric', month:'short' });
    document.getElementById('streakN').textContent = STATE.streak;

    var qIdx = Math.floor(Math.random() * MAA_QUOTES.length);
    document.getElementById('maaMsg').textContent = MAA_QUOTES[qIdx];

    if (Auth.user && Auth.user.name) {
      document.getElementById('hDate').textContent =
        'Namaste ' + Auth.user.name + '! ' +
        now.toLocaleDateString('en-IN', { weekday:'short', day:'numeric', month:'short' });
    }

    Settings.restore();
    Tasks.render();
    Flashcards.render();
    App.renderSubjects();
    Timer.updateDisplay();
    Timer.updateHourBar();
    App.updateAdaptBanner();

    setInterval(function() { Notifications.tick(); }, 30000);
    Notifications.tick();

    setTimeout(function() {
      var name = (Auth.user && Auth.user.name) ? Auth.user.name : 'Beta';
      App.showNotif('🌅',
        'Welcome ' + name + '! Day ' + STATE.dayInPlan + ' 🕉️',
        STATE.dayInPlan === 1
          ? 'Aaj pehla din hai! Maa tere saath hai. Chal shuru karte hain! ❤️'
          : 'Day ' + STATE.dayInPlan + ' of ' + (STATE.targetDays||365) + '. Streak: ' + STATE.streak + ' days. Keep going beta! 💪'
      );
    }, 1500);
  },

  goNav: function(page, el) {
    document.querySelectorAll('.page').forEach(function(p) { p.classList.remove('active'); });
    document.getElementById('pg-' + page).classList.add('active');
    document.querySelectorAll('.ni').forEach(function(n) { n.classList.remove('active'); });
    el.classList.add('active');
    if (page === 'stats') StatsPage.render();
    if (page === 'plan') { Plan.renderTabs(); Plan.renderContent(); }
  },

  updateAdaptBanner: function() {
    var h = STATE.hoursPerDay;
    var tasks = Tasks.get(h, STATE.dayInPlan);
    var mode = h<=1?'Beginner':h<=2?'Regular':h<=4?'Serious':h<=6?'Dedicated':h<=8?'Aspirant':'IAS Topper';
    document.getElementById('abTitle').textContent = 'Today: ' + tasks.length + ' tasks · ' + mode + ' Mode';
    document.getElementById('abSub').textContent = h + 'h daily target · Adaptive plan active';
  },

  renderSubjects: function() {
    var SUBJ = [
      { n:'Polity',      icon:'⚖️', col:'#FF6B00', key:'polity' },
      { n:'History',     icon:'🏺', col:'#FFB300', key:'history' },
      { n:'Geography',   icon:'🗺️', col:'#52B788', key:'geography' },
      { n:'Economy',     icon:'💰', col:'#2176FF', key:'economy' },
      { n:'Environment', icon:'🌿', col:'#40916C', key:'environment' },
      { n:'Science',     icon:'🔬', col:'#7B2FBE', key:'science' },
      { n:'Governance',  icon:'🏛️', col:'#E63946', key:'governance' },
      { n:'Ethics',      icon:'🧠', col:'#FF6B6B', key:'ethics' },
    ];
    var dayF = Math.min(100, Math.floor((STATE.dayInPlan / 365) * 100));
    document.getElementById('subjG').innerHTML = SUBJ.map(function(s) {
      var p = Math.min(100, Math.floor(dayF * 0.9));
      return '<div class="subj-card" onclick="App.openLesson(\'' + s.key + '\')">' +
        '<div class="sico">' + s.icon + '</div>' +
        '<div class="snam">' + s.n + '</div>' +
        '<div class="sbar"><div class="sfil" style="width:' + p + '%;background:' + s.col + ';"></div></div>' +
        '<div class="spct">' + p + '% covered</div>' +
        '</div>';
    }).join('');
  },

  openLesson: function(key) {
    var l = LESSONS[key] || LESSONS.general;
    document.getElementById('lTtl').textContent = l.title;
    document.getElementById('lSub').textContent = l.sub;
    document.getElementById('lBody').innerHTML  = l.html;
    renderQuiz(l.quiz || []);
    document.getElementById('lessonMod').classList.add('show');
  },

  openDayLesson: function(day) {
    var t   = SYLLABUS[(day - 1) % SYLLABUS.length];
    var key = _tc(t);
    var l   = LESSONS[key] || LESSONS.general;
    document.getElementById('lTtl').textContent = 'Day ' + day + ': ' + t.topic;
    document.getElementById('lSub').textContent = t.sub + ' · ' + t.details;
    document.getElementById('lBody').innerHTML  = l.html;
    renderQuiz(l.quiz || []);
    document.getElementById('lessonMod').classList.add('show');
  },

  closeMod: function() { document.getElementById('lessonMod').classList.remove('show'); },

  showNotif: function(emoji, title, msg) {
    document.getElementById('nEmi').textContent = emoji;
    document.getElementById('nTtl').textContent = title;
    document.getElementById('nMsg').textContent = msg;
    document.getElementById('notifOv').classList.add('show');
  },

  dismissNotif: function() { document.getElementById('notifOv').classList.remove('show'); },

  celebrate: function(emoji, title, msg) {
    document.getElementById('cEmi').textContent = emoji;
    document.getElementById('cTtl').textContent = title;
    document.getElementById('cMsg').textContent = msg;
    document.getElementById('celebOv').classList.add('show');
    confetti();
  },

  closeCeleb: function() {
    document.getElementById('celebOv').classList.remove('show');
    document.getElementById('confC').innerHTML = '';
  },

  installPWA: function() {
    if (dIP) dIP.prompt();
    else App.toast('Chrome ⋮ → Add to Home Screen\nor Safari Share → Add to Home Screen 📲');
  },

  recalcDay: function() {
    var now = new Date();
    var targetDays = STATE.targetDays || 365;
    STATE.dayInPlan = Math.min(targetDays, Math.floor((now - new Date(STATE.firstLaunch)) / 864e5) + 1);
    Tasks.render();
    App.updateAdaptBanner();
    Plan.renderTabs();
    Plan.renderContent();
  },

  toast: function(msg) {
    var old = document.querySelector('.toast');
    if (old) old.remove();
    var t = document.createElement('div');
    t.className   = 'toast';
    t.textContent = msg;
    document.body.appendChild(t);
    setTimeout(function() { if (t.parentNode) t.remove(); }, 3600);
  }
};

/* Quiz rendering */
var qAns = {};
function renderQuiz(qs) {
  if (!qs.length) { document.getElementById('lQuiz').innerHTML = ''; return; }
  qAns = {};
  var h = '<div class="quiz-w"><h4>🧠 Maa\'s Quiz — aim for 70%+!</h4>';
  qs.forEach(function(q, qi) {
    h += '<div class="qq">Q' + (qi+1) + ': ' + q.q + '</div>';
    q.opts.forEach(function(o, oi) {
      h += '<div class="qo" id="qo' + qi + '_' + oi + '" onclick="ansQ(' + qi + ',' + oi + ',' + q.ans + ')">' + o + '</div>';
    });
  });
  h += '</div>';
  document.getElementById('lQuiz').innerHTML = h;
}

function ansQ(qi, sel, ans) {
  if (qAns[qi] !== undefined) return;
  qAns[qi] = sel === ans;
  document.querySelectorAll('[id^="qo' + qi + '_"]').forEach(function(el, i) {
    if (i === ans) el.classList.add('correct');
    else if (i === sel && sel !== ans) el.classList.add('wrong');
  });
  App.toast(sel === ans ? '✅ Bilkul sahi! Maa proud hai! 🌟' : '❌ Galat beta! Study harder!');
  STATE.qScores.push(sel === ans ? 100 : 0);
  var avg = Math.round(STATE.qScores.reduce(function(a,b){return a+b;},0) / STATE.qScores.length);
  document.getElementById('sQuiz').textContent = avg + '%';
  saveState();
}

function confetti() {
  var cols = ['#FF6B00','#FFB300','#52B788','#2176FF','#FF6B6B','#FFF','#FFD700'];
  var c = document.getElementById('confC');
  c.innerHTML = '';
  for (var i = 0; i < 100; i++) {
    var p = document.createElement('div');
    p.className = 'cp';
    p.style.cssText = 'left:' + (Math.random()*100) + '%;top:-10px;' +
      'background:' + cols[Math.floor(Math.random()*cols.length)] + ';' +
      'animation-delay:' + (Math.random()*2.5) + 's;' +
      'animation-duration:' + (2.5+Math.random()*2) + 's;' +
      'width:' + (5+Math.random()*10) + 'px;' +
      'height:' + (5+Math.random()*10) + 'px;' +
      'border-radius:' + (Math.random()>0.5?'50%':'2px') + ';';
    c.appendChild(p);
  }
}

// ── Boot ──────────────────────────────────────────────────
Auth.init();
