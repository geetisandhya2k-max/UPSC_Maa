/* tasks.js — Adaptive task generation with per-day tracking */
function _tc(t) {
  if (!t) return 'general';
  var s = t.sub.toLowerCase();
  if (s.indexOf('history') >= 0)  return 'history';
  if (s.indexOf('polity') >= 0)   return 'polity';
  if (s.indexOf('geog') >= 0)     return 'geography';
  if (s.indexOf('econ') >= 0)     return 'economy';
  if (s.indexOf('envir') >= 0)    return 'environment';
  if (s.indexOf('science') >= 0)  return 'science';
  if (s.indexOf('govern') >= 0 || s.indexOf('ir') >= 0) return 'governance';
  if (s.indexOf('ethics') >= 0)   return 'ethics';
  if (s.indexOf('csat') >= 0)     return 'csat';
  return 'general';
}

var Tasks = {
  todayList: [],

  get: function(hoursPerDay, dayInPlan) {
    var mins = hoursPerDay * 60;
    var idx  = (dayInPlan - 1) % SYLLABUS.length;
    var t    = SYLLABUS[idx];
    var t2   = SYLLABUS[(idx + 10) % SYLLABUS.length];
    var rv   = SYLLABUS[Math.max(0, idx - 3)];

    if (mins <= 30) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic, sub:t.sub, desc:'Focus: '+t.details+'. Even 20 min daily = 120 hrs/year!', dur:'20 min', content:_tc(t) },
      { id:'t2', icon:'🔄', title:'Quick Revision – Flashcard', sub:'Revise tab', desc:'Flip 2 flashcards. 5 minutes = powerful habit!', dur:'10 min', content:'revision' },
    ];
    if (mins <= 60) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic, sub:t.sub, desc:'Study: '+t.details, dur:'30 min', content:_tc(t) },
      { id:'t2', icon:'🔄', title:'Revision – 3 Flashcards', sub:'Revise tab', desc:'3 cards, tap to flip.', dur:'15 min', content:'revision' },
      { id:'t3', icon:'📰', title:'Current Affairs – 5 headlines', sub:'The Hindu / PIB', desc:'Read top 5 news. Tag each with GS paper.', dur:'15 min', content:'current' },
    ];
    if (mins <= 120) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic, sub:t.sub, desc:'Deep study: '+t.details+'. Read lesson + take notes.', dur:'45 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'Topic Quiz', sub:"5 MCQs on today's lesson", desc:'Open lesson → attempt quiz. Aim 4/5!', dur:'15 min', content:_tc(t) },
      { id:'t3', icon:'🔄', title:'Revision – 5 Flashcards', sub:'Mixed subjects', desc:'5 cards from Revise tab.', dur:'20 min', content:'revision' },
      { id:'t4', icon:'📰', title:'Current Affairs', sub:'The Hindu + PIB', desc:'One editorial + PIB. Note 3 items.', dur:'20 min', content:'current' },
    ];
    if (mins <= 240) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic+' – Full Study', sub:t.sub, desc:'Complete: '+t.details, dur:'60 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'PYQ Practice', sub:'10 topic questions', desc:'10 past year questions. Analyse wrong ones.', dur:'30 min', content:'pyq' },
      { id:'t3', icon:'✍️', title:'Answer Writing – 1 Question', sub:'150 words', desc:'Write 1 UPSC-style answer. Intro-Body-Conclusion.', dur:'15 min', content:'writing' },
      { id:'t4', icon:'🔄', title:'Revision', sub:'Revise: '+rv.topic, desc:'Revise: '+rv.details, dur:'30 min', content:'revision' },
      { id:'t5', icon:'📰', title:'Current Affairs', sub:'Full newspaper', desc:'Hindu + National + International. 5 items.', dur:'45 min', content:'current' },
    ];
    if (mins <= 360) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic+' – Deep Dive', sub:t.sub, desc:'Deep study + mind map.', dur:'90 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'Quiz + PYQ', sub:'20 questions', desc:'10 quiz + 10 PYQs. 70%+ target.', dur:'30 min', content:'pyq' },
      { id:'t3', icon:'✍️', title:'Answer Writing – 2 Questions', sub:'150 words each', desc:'2 answers: today + previous topic.', dur:'30 min', content:'writing' },
      { id:'t4', icon:'🔄', title:'Spaced Revision', sub:'Last 3 days', desc:'Review last 3 days notes + flashcards.', dur:'45 min', content:'revision' },
      { id:'t5', icon:'📰', title:'Current Affairs', sub:'Hindu + PIB + Yojana', desc:'Full CA + tag every item.', dur:'45 min', content:'current' },
      { id:'t6', icon:'📋', title:'Weekly Mock Quiz', sub:'20 MCQs timed', desc:'20 MCQs from this week. Min 60%!', dur:'20 min', content:'quiz' },
    ];
    return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic+' – Topper Level', sub:t.sub, desc:'NCERT + Book + Notes + Diagram.', dur:'120 min', content:_tc(t) },
      { id:'t2', icon:'📖', title:t2.icon+' '+t2.topic, sub:t2.sub, desc:'Second subject: '+t2.details, dur:'60 min', content:_tc(t2) },
      { id:'t3', icon:'🧠', title:'PYQ Deep Practice', sub:'25 questions', desc:'25 PYQs. Analyse every wrong one.', dur:'45 min', content:'pyq' },
      { id:'t4', icon:'✍️', title:'Answer Writing – 3 Questions', sub:'Timed session', desc:'3 answers timed. Self-evaluate after.', dur:'45 min', content:'writing' },
      { id:'t5', icon:'🔄', title:'Comprehensive Revision', sub:'Last 5 days', desc:'Revise all topics from last 5 days.', dur:'60 min', content:'revision' },
      { id:'t6', icon:'📰', title:'Current Affairs', sub:'All sources', desc:'Hindu + PIB + editorial analysis.', dur:'60 min', content:'current' },
      { id:'t7', icon:'📋', title:'Full Mock Quiz', sub:'30 MCQs timed', desc:'30 MCQs exam conditions!', dur:'30 min', content:'quiz' },
    ];
  },

  // Render today's tasks (uses STATE.dayInPlan)
  render: function() {
    Tasks.renderDay(STATE.dayInPlan, 'tasksC', true);
    Tasks.updateProgress();
    Tasks.renderPendingBadge();
  },

  // Render tasks for any specific day
  renderDay: function(dayNum, containerId, isToday) {
    var taskList  = Tasks.get(STATE.hoursPerDay, dayNum);
    var completed = isToday
      ? (getDayTasks(dayNum).length > 0 ? getDayTasks(dayNum) : (STATE.tasksComp || []))
      : getDayTasks(dayNum);

    if (isToday) Tasks.todayList = taskList;

    var container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = taskList.map(function(t) {
      var isDone = completed.indexOf(t.id) >= 0;
      return '<div class="task-card '+(isDone?'done':'')+'" id="card-'+dayNum+'-'+t.id+'">' +
        '<div class="th" onclick="Tasks.toggle('+dayNum+',\''+t.id+'\')">'+
          '<div class="ti">'+t.icon+'</div>'+
          '<div class="tinfo">'+
            '<div class="tt">'+t.title+'</div>'+
            '<div class="ts">'+t.sub+'</div>'+
            '<div class="tdur">⏱️ '+t.dur+'</div>'+
          '</div>'+
          '<div class="tchk" onclick="event.stopPropagation();Tasks.markDone('+dayNum+',\''+t.id+'\','+isToday+')">'+
            (isDone ? '✓' : '')+
          '</div>'+
        '</div>'+
        '<div class="tbody">'+
          '<p>'+t.desc+'</p>'+
          '<button class="sbtn sbtn-study" onclick="App.openLesson(\''+t.content+'\')">📖 Open Lesson →</button>'+
          (isToday ? '<textarea class="notes-ta" placeholder="Your notes..." id="note-'+t.id+'" '+
            'onchange="Tasks.saveNote(\''+t.id+'\',this.value)">'+(STATE.notes&&STATE.notes[t.id]?STATE.notes[t.id]:'')+'</textarea>' : '') +
          '<button class="sbtn sbtn-done" onclick="Tasks.markDone('+dayNum+',\''+t.id+'\','+isToday+')">'+
            (isDone ? '✅ Done!' : '✅ Mark Complete')+
          '</button>'+
        '</div>'+
      '</div>';
    }).join('');
  },

  updateProgress: function() {
    var taskList  = Tasks.get(STATE.hoursPerDay, STATE.dayInPlan);
    var completed = getDayTasks(STATE.dayInPlan).length > 0
      ? getDayTasks(STATE.dayInPlan)
      : (STATE.tasksComp || []);
    var total = taskList.length;
    var done  = taskList.filter(function(t){ return completed.indexOf(t.id) >= 0; }).length;

    // Add pending tasks to totals
    var pending = STATE.pendingDays || [];
    var pendingTotal = 0, pendingDone = 0;
    pending.forEach(function(d) {
      var pt = Tasks.get(STATE.hoursPerDay, d);
      var pc = getDayTasks(d);
      pendingTotal += pt.length;
      pendingDone  += pt.filter(function(t){ return pc.indexOf(t.id) >= 0; }).length;
    });

    var grandTotal = total + pendingTotal;
    var grandDone  = done  + pendingDone;
    var pct = grandTotal > 0 ? Math.round(grandDone / grandTotal * 100) : 0;

    var sTasks = document.getElementById('sTasks');
    var sTarget= document.getElementById('sTarget');
    var rpct   = document.getElementById('rpct');
    var rdn    = document.getElementById('rdn');
    var ring   = document.getElementById('ring');

    if (sTasks)  sTasks.textContent  = done+'/'+total + (pendingTotal > 0 ? ' (+'+( pendingTotal - pendingDone)+' pending)' : '');
    if (sTarget) sTarget.textContent = STATE.hoursPerDay+'h';
    if (rpct)    rpct.textContent    = pct+'%';
    if (rdn)     rdn.textContent     = grandDone+'/'+grandTotal;
    if (ring)    ring.style.strokeDashoffset = 201 - 201 * (pct / 100);
  },

  renderPendingBadge: function() {
    var pending = updatePendingDays();
    var badge   = document.getElementById('pendingBadge');
    if (!badge) return;
    if (pending.length === 0) {
      badge.style.display = 'none';
      return;
    }
    badge.style.display = 'block';
    badge.innerHTML = '<div class="st" style="color:var(--pink)">⚠️ Pending Tasks</div>' +
      pending.map(function(d) {
        var pt = Tasks.get(STATE.hoursPerDay, d);
        var pc = getDayTasks(d);
        var remaining = pt.filter(function(t){ return pc.indexOf(t.id) < 0; }).length;
        return '<div class="pending-day-card" onclick="Tasks.showPendingDay('+d+')">' +
          '<span class="pd-day">Day '+d+'</span>' +
          '<span class="pd-count">'+remaining+' tasks left</span>' +
          '<span class="pd-arrow">→</span>' +
          '</div>';
      }).join('');
  },

  showPendingDay: function(dayNum) {
    // Show pending day tasks in a modal
    var topic = SYLLABUS[(dayNum-1) % SYLLABUS.length];
    document.getElementById('lTtl').textContent = 'Day '+dayNum+' – Pending Tasks';
    document.getElementById('lSub').textContent = topic.sub+' · '+topic.topic+' · Complete these to clear pending';
    document.getElementById('lBody').innerHTML  = '<div id="pendingDayTasks"></div>';
    document.getElementById('lQuiz').innerHTML  = '';
    document.getElementById('lessonMod').classList.add('show');
    Tasks.renderDay(dayNum, 'pendingDayTasks', false);
  },

  toggle: function(dayNum, id) {
    var cardId = 'card-'+dayNum+'-'+id;
    var card   = document.getElementById(cardId);
    if (card) card.classList.toggle('open');
  },

  markDone: async function(dayNum, id, isToday) {
    markDayTask(dayNum, id);

    // Also update legacy tasksComp for today
    if (isToday) {
      if (!STATE.tasksComp) STATE.tasksComp = [];
      if (STATE.tasksComp.indexOf(id) < 0) {
        STATE.tasksComp.push(id);
        STATE.topicsDone = (STATE.topicsDone || 0) + 1;
        var today = new Date().toDateString();
        if (STATE.lastStudyDate !== today) {
          STATE.streak++;
          STATE.lastStudyDate = today;
          STATE.hourGoalCelebrated = false;
          var sn = document.getElementById('streakN');
          if (sn) sn.textContent = STATE.streak;
        }
        API.taskDone({ taskId: id, dayInPlan: dayNum, tasksTotal: Tasks.todayList.length });
      }
    }

    saveState();
    updatePendingDays();

    // Re-render
    if (isToday) {
      Tasks.render();
      var taskList  = Tasks.todayList;
      var completed = getDayTasks(dayNum).length > 0 ? getDayTasks(dayNum) : (STATE.tasksComp||[]);
      var done      = taskList.filter(function(t){ return completed.indexOf(t.id) >= 0; }).length;
      var total     = taskList.length;
      if (done >= total) {
        setTimeout(function() {
          App.celebrate('🎉','Wah Beta Wah! 🏆','Aaj ke SAARE tasks complete! Maa proud hai! ❤️');
        }, 400);
      } else if (done === Math.floor(total/2)) {
        App.toast('🔥 Halfway! Maa smiling at you! 💛');
      } else {
        App.toast('✅ Done! '+(total-done)+' more today. Keep going! 💪');
      }
    } else {
      Tasks.renderDay(dayNum, 'pendingDayTasks', false);
      Tasks.renderPendingBadge();
      Tasks.updateProgress();
      App.toast('✅ Pending task done! Keep clearing! 💪');
    }
  },

  saveNote: async function(id, value) {
    if (!STATE.notes) STATE.notes = {};
    STATE.notes[id] = value;
    saveState();
    API.saveNote({ taskId: id, content: value, dayInPlan: STATE.dayInPlan });
  }
};
