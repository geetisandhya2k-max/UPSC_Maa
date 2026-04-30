/* tasks.js — Adaptive task generation */
function _tc(t) {
  if (!t) return 'general';
  var s = t.sub.toLowerCase();
  if (s.indexOf('history') >= 0) return 'history';
  if (s.indexOf('polity') >= 0) return 'polity';
  if (s.indexOf('geog') >= 0) return 'geography';
  if (s.indexOf('econ') >= 0) return 'economy';
  if (s.indexOf('envir') >= 0) return 'environment';
  if (s.indexOf('science') >= 0) return 'science';
  if (s.indexOf('govern') >= 0 || s.indexOf('ir') >= 0) return 'governance';
  if (s.indexOf('ethics') >= 0) return 'ethics';
  if (s.indexOf('csat') >= 0) return 'csat';
  return 'general';
}

var Tasks = {
  todayList: [],

  get: function(hoursPerDay, dayInPlan) {
    var mins = hoursPerDay * 60;
    var t  = SYLLABUS[dayInPlan % SYLLABUS.length];
    var t2 = SYLLABUS[(dayInPlan + 10) % SYLLABUS.length];
    var rv = SYLLABUS[Math.max(0, dayInPlan - 3) % SYLLABUS.length];

    if (mins <= 30) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic, sub:t.sub, desc:'Focus: '+t.details+'. Even 20 min daily = 120 hrs/year!', dur:'20 min', content:_tc(t) },
      { id:'t2', icon:'🔄', title:'Quick Revision – 1 Flashcard', sub:'Revise tab', desc:'Flip one flashcard. 5 minutes = powerful habit!', dur:'10 min', content:'revision' },
    ];
    if (mins <= 60) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic, sub:t.sub, desc:'Study: '+t.details, dur:'30 min', content:_tc(t) },
      { id:'t2', icon:'🔄', title:'Revision – 3 Flashcards', sub:'Revise tab', desc:'3 cards, tap to flip, honest self-check.', dur:'15 min', content:'revision' },
      { id:'t3', icon:'📰', title:'Current Affairs – 5 headlines', sub:'The Hindu / PIB', desc:'Read top 5 news. Tag each with GS paper.', dur:'15 min', content:'current' },
    ];
    if (mins <= 120) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic, sub:t.sub, desc:'Deep study: '+t.details+'. Read lesson + take notes.', dur:'45 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'Topic Quiz', sub:"5 MCQs on today's lesson", desc:'Open lesson → attempt quiz. Aim 4/5!', dur:'15 min', content:_tc(t) },
      { id:'t3', icon:'🔄', title:'Revision – 5 Flashcards', sub:'Mixed subjects', desc:'5 cards from Revise tab.', dur:'20 min', content:'revision' },
      { id:'t4', icon:'📰', title:'Current Affairs', sub:'The Hindu + PIB', desc:'One editorial + PIB. Note 3 items.', dur:'20 min', content:'current' },
    ];
    if (mins <= 240) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic+' – Full Study', sub:t.sub, desc:'Complete: '+t.details+'. Lesson + notes.', dur:'60 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'PYQ Practice', sub:'10 topic questions', desc:'10 past year questions. Analyse wrong ones.', dur:'30 min', content:'pyq' },
      { id:'t3', icon:'✍️', title:'Answer Writing – 1 Question', sub:'150 words', desc:'Write 1 UPSC-style answer. Intro-Body-Conclusion.', dur:'15 min', content:'writing' },
      { id:'t4', icon:'🔄', title:'Revision', sub:'Revise: '+rv.topic, desc:'Revise: '+rv.details, dur:'30 min', content:'revision' },
      { id:'t5', icon:'📰', title:'Current Affairs', sub:'Full newspaper', desc:'Hindu Editorial + National + International. 5 items.', dur:'45 min', content:'current' },
    ];
    if (mins <= 360) return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic+' – Deep Dive', sub:t.sub, desc:'Deep study: '+t.details+'. Mind map + comparison.', dur:'90 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'Quiz + PYQ', sub:'20 questions', desc:'10 quiz + 10 PYQs. 70%+ target.', dur:'30 min', content:'pyq' },
      { id:'t3', icon:'✍️', title:'Answer Writing – 2 Questions', sub:'150 words each', desc:'2 answers: today + previous topic.', dur:'30 min', content:'writing' },
      { id:'t4', icon:'🔄', title:'Spaced Revision', sub:'Last 3 days', desc:'Review last 3 days notes + flashcards.', dur:'45 min', content:'revision' },
      { id:'t5', icon:'📰', title:'Current Affairs', sub:'Hindu + PIB + Yojana', desc:'Full CA + tag every item.', dur:'45 min', content:'current' },
      { id:'t6', icon:'📋', title:'Weekly Mock Quiz', sub:'20 MCQs timed', desc:'20 MCQs from this week. Min 60%!', dur:'20 min', content:'quiz' },
    ];
    // 6h+
    return [
      { id:'t1', icon:'📖', title:t.icon+' '+t.topic+' – Topper Level', sub:t.sub, desc:'Topper study: '+t.details+'. NCERT + Book + Notes + Diagram.', dur:'120 min', content:_tc(t) },
      { id:'t2', icon:'📖', title:t2.icon+' '+t2.topic, sub:t2.sub, desc:'Second subject: '+t2.details, dur:'60 min', content:_tc(t2) },
      { id:'t3', icon:'🧠', title:'PYQ Deep Practice', sub:'25 questions', desc:'25 PYQs. For every wrong: find source, write answer.', dur:'45 min', content:'pyq' },
      { id:'t4', icon:'✍️', title:'Answer Writing – 3 Questions', sub:'Timed session', desc:'3 answers timed. Self-evaluate after.', dur:'45 min', content:'writing' },
      { id:'t5', icon:'🔄', title:'Comprehensive Revision', sub:'Last 5 days', desc:'Revise all topics last 5 days.', dur:'60 min', content:'revision' },
      { id:'t6', icon:'📰', title:'Current Affairs', sub:'All sources', desc:'Hindu + PIB + editorial analysis.', dur:'60 min', content:'current' },
      { id:'t7', icon:'📋', title:'Full Mock Quiz', sub:'30 MCQs timed', desc:'30 MCQs exam conditions!', dur:'30 min', content:'quiz' },
    ];
  },

  render: function() {
    Tasks.todayList = Tasks.get(STATE.hoursPerDay, STATE.dayInPlan);
    var total = Tasks.todayList.length;
    var done  = Tasks.todayList.filter(function(t){return STATE.tasksComp.indexOf(t.id)>=0;}).length;

    document.getElementById('sTasks').textContent  = done+'/'+total;
    document.getElementById('sTarget').textContent = STATE.hoursPerDay < 1 ? Math.round(STATE.hoursPerDay*60)+'min' : STATE.hoursPerDay+'h';
    document.getElementById('rpct').textContent    = Math.round(done/total*100)+'%';
    document.getElementById('rdn').textContent     = done+'/'+total;
    document.getElementById('ring').style.strokeDashoffset = 201 - 201*(done/total);

    document.getElementById('tasksC').innerHTML = Tasks.todayList.map(function(t) {
      var isDone = STATE.tasksComp.indexOf(t.id) >= 0;
      return '<div class="task-card '+(isDone?'done':'')+'" id="card-'+t.id+'">' +
        '<div class="th" onclick="Tasks.toggle(\''+t.id+'\')">'+
          '<div class="ti">'+t.icon+'</div>'+
          '<div class="tinfo">'+
            '<div class="tt">'+t.title+'</div>'+
            '<div class="ts">'+t.sub+'</div>'+
            '<div class="tdur">⏱️ '+t.dur+'</div>'+
          '</div>'+
          '<div class="tchk" onclick="event.stopPropagation();Tasks.markDone(\''+t.id+'\')">'+
            (isDone?'✓':'')+
          '</div>'+
        '</div>'+
        '<div class="tbody">'+
          '<p>'+t.desc+'</p>'+
          '<button class="sbtn sbtn-study" onclick="App.openLesson(\''+t.content+'\')">📖 Open Lesson →</button>'+
          '<textarea class="notes-ta" placeholder="Your notes..." id="note-'+t.id+'" '+
            'onchange="Tasks.saveNote(\''+t.id+'\',this.value)">'+((STATE.notes||{})[t.id]||'')+'</textarea>'+
          '<button class="sbtn sbtn-done" onclick="Tasks.markDone(\''+t.id+'\')">'+
            (isDone?'✅ Done!':'✅ Mark Complete')+
          '</button>'+
        '</div>'+
      '</div>';
    }).join('');
  },

  toggle: function(id) {
    document.getElementById('card-'+id).classList.toggle('open');
  },

  markDone: async function(id) {
    if (STATE.tasksComp.indexOf(id) >= 0) return;
    STATE.tasksComp.push(id);
    STATE.topicsDone = (STATE.topicsDone || 0) + 1;

    var today = new Date().toDateString();
    if (STATE.lastStudyDate !== today) {
      STATE.streak++;
      STATE.lastStudyDate = today;
      STATE.hourGoalCelebrated = false;
      document.getElementById('streakN').textContent = STATE.streak;
    }
    saveState();
    API.taskDone({ taskId: id, dayInPlan: STATE.dayInPlan, tasksTotal: Tasks.todayList.length });
    Tasks.render();

    var done  = Tasks.todayList.filter(function(t){return STATE.tasksComp.indexOf(t.id)>=0;}).length;
    var total = Tasks.todayList.length;
    if (done >= total) {
      setTimeout(function() {
        App.celebrate('🎉','Wah Beta Wah! 🏆','Aaj ke SAARE tasks complete! Maa proud hai! ❤️');
      }, 400);
    } else if (done === Math.floor(total/2)) {
      setTimeout(function() { App.toast('🔥 Halfway! Maa smiling at you! 💛'); }, 200);
    } else {
      App.toast('✅ Done! '+(total-done)+' more. Keep going beta! 💪');
    }
  },

  saveNote: async function(id, value) {
    if (!STATE.notes) STATE.notes = {};
    STATE.notes[id] = value;
    saveState();
    API.saveNote({ taskId: id, content: value, dayInPlan: STATE.dayInPlan });
  }
};
