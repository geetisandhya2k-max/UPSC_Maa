/* tasks.js — Adaptive task generation and rendering */
const Tasks = {
  todayList: [],

  get(hoursPerDay, dayInPlan) {
    const mins = hoursPerDay * 60;
    const t  = SYLLABUS[dayInPlan % SYLLABUS.length];
    const t2 = SYLLABUS[(dayInPlan + 10) % SYLLABUS.length];
    const t3 = SYLLABUS[(dayInPlan + 25) % SYLLABUS.length];
    const rv = SYLLABUS[Math.max(0, dayInPlan - 3) % SYLLABUS.length];
    const dur = (h) => h < 1 ? Math.round(h*60)+'min' : h+'h';

    if (mins <= 30) return [
      { id:'t1', icon:'📖', title:`${t.icon} ${t.topic}`, sub:`${t.sub}`, desc:`Focus on: ${t.details}. Even 20 min daily = 120 hrs/year!`, dur:'20 min', content: _tc(t) },
      { id:'t2', icon:'🔄', title:'Quick Revision – 1 Flashcard', sub:'Revise tab', desc:'Flip one flashcard. 5 minutes = powerful habit!', dur:'10 min', content:'revision' },
    ];

    if (mins <= 60) return [
      { id:'t1', icon:'📖', title:`${t.icon} ${t.topic}`, sub:t.sub, desc:`Study: ${t.details}`, dur:'30 min', content:_tc(t) },
      { id:'t2', icon:'🔄', title:'Revision – 3 Flashcards', sub:'Revise tab', desc:'3 cards, tap to flip, honest self-check.', dur:'15 min', content:'revision' },
      { id:'t3', icon:'📰', title:'Current Affairs – 5 headlines', sub:'The Hindu / PIB', desc:'Read top 5 news. Tag each with GS paper.', dur:'15 min', content:'current' },
    ];

    if (mins <= 120) return [
      { id:'t1', icon:'📖', title:`${t.icon} ${t.topic}`, sub:t.sub, desc:`Deep study: ${t.details}. Read lesson fully, take notes below.`, dur:'45 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'Topic Quiz', sub:"5 MCQs on today's lesson", desc:'Attempt quiz inside the lesson. Aim 4/5!', dur:'15 min', content:_tc(t) },
      { id:'t3', icon:'🔄', title:'Revision – 5 Flashcards', sub:'Mixed subjects', desc:'5 cards from Revise tab.', dur:'20 min', content:'revision' },
      { id:'t4', icon:'📰', title:'Current Affairs', sub:'The Hindu editorial + PIB', desc:'One editorial + scan PIB. Note 3 items.', dur:'20 min', content:'current' },
    ];

    if (mins <= 240) return [
      { id:'t1', icon:'📖', title:`${t.icon} ${t.topic} – Full Study`, sub:t.sub, desc:`Complete: ${t.details}. Lesson + make notes.`, dur:'60 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'PYQ Practice', sub:'10 topic questions', desc:'10 past year questions. Analyse wrong ones.', dur:'30 min', content:'pyq' },
      { id:'t3', icon:'✍️', title:'Answer Writing – 1 Question', sub:'150 words', desc:'Write 1 UPSC-style answer. Intro-Body-Conclusion.', dur:'15 min', content:'writing' },
      { id:'t4', icon:'🔄', title:'Revision', sub:`Revise: ${rv.topic}`, desc:`Revise: ${rv.details}`, dur:'30 min', content:'revision' },
      { id:'t5', icon:'📰', title:'Current Affairs', sub:'Full newspaper', desc:'The Hindu: Editorial + National + International. 5 items tagged.', dur:'45 min', content:'current' },
    ];

    if (mins <= 360) return [
      { id:'t1', icon:'📖', title:`${t.icon} ${t.topic} – Deep Dive`, sub:t.sub, desc:`Deep study: ${t.details}. Mind map + comparison.`, dur:'90 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'Quiz + PYQ', sub:'20 questions', desc:'10 quiz + 10 PYQs. 70%+ target.', dur:'30 min', content:'pyq' },
      { id:'t3', icon:'✍️', title:'Answer Writing – 2 Questions', sub:'150 words each', desc:'2 answers: today + previous topic.', dur:'30 min', content:'writing' },
      { id:'t4', icon:'🔄', title:'Spaced Revision', sub:'Last 3 days', desc:'Review last 3 days notes + flashcards.', dur:'45 min', content:'revision' },
      { id:'t5', icon:'📰', title:'Current Affairs', sub:'Hindu + PIB + Yojana', desc:'Full CA + tag every item.', dur:'45 min', content:'current' },
      { id:'t6', icon:'📋', title:'Weekly Mock Quiz', sub:'20 MCQs timed', desc:'20 MCQs from this week. Min 60%!', dur:'20 min', content:'quiz' },
    ];

    if (mins <= 480) return [
      { id:'t1', icon:'📖', title:`${t.icon} ${t.topic} – Topper Level`, sub:t.sub, desc:`Topper study: ${t.details}. NCERT → Book → Notes → Diagram.`, dur:'120 min', content:_tc(t) },
      { id:'t2', icon:'🧠', title:'PYQ Deep Practice', sub:'25 questions + analysis', desc:'25 PYQs. For every wrong: find source, write answer.', dur:'45 min', content:'pyq' },
      { id:'t3', icon:'✍️', title:'Answer Writing – 3 Questions', sub:'2×150 + 1×250 words', desc:'3 answers timed. Self-evaluate after.', dur:'45 min', content:'writing' },
      { id:'t4', icon:'🔄', title:'Comprehensive Revision', sub:'Last 5 days', desc:'Revise all topics last 5 days. Fill gaps.', dur:'60 min', content:'revision' },
      { id:'t5', icon:'📰', title:'Current Affairs – Comprehensive', sub:'All sources', desc:'Hindu + PIB + PRS + write 100w editorial summary.', dur:'60 min', content:'current' },
      { id:'t6', icon:'📋', title:'Full Mock Quiz', sub:'30 MCQs timed', desc:'30 MCQs exam conditions. No cheating!', dur:'30 min', content:'quiz' },
      { id:'t7', icon:'🗺️', title:'Map Practice', sub:'Blank India map', desc:'Mark geography points. For non-geo: 5 important sites.', dur:'20 min', content:'geography' },
    ];

    if (mins <= 600) return [
      { id:'t1', icon:'📖', title:`${t.icon} ${t.topic} – IAS Topper Mode`, sub:t.sub, desc:`Full command: ${t.details}. 3 sources + notes + mind map.`, dur:'150 min', content:_tc(t) },
      { id:'t2', icon:'📖', title:`${t2.icon} ${t2.topic} – Second Subject`, sub:t2.sub, desc:`Study: ${t2.details}. Full notes.`, dur:'60 min', content:_tc(t2) },
      { id:'t3', icon:'🧠', title:'PYQ Marathon', sub:'35 questions + error log', desc:'35 PYQs. Maintain error log. Review after 1 week.', dur:'50 min', content:'pyq' },
      { id:'t4', icon:'✍️', title:'Answer Writing – 4 Questions', sub:'Timed 50 min', desc:'4 answers in 50 min. Actual mains conditions!', dur:'50 min', content:'writing' },
      { id:'t5', icon:'🔄', title:'Full Week Revision', sub:'All 7-day topics', desc:'1-page summary per topic. Flag weak ones.', dur:'60 min', content:'revision' },
      { id:'t6', icon:'📰', title:'Current Affairs – Master', sub:'All sources + editorial analysis', desc:'Deep editorial read. Write arguments + counter-arguments.', dur:'60 min', content:'current' },
      { id:'t7', icon:'📋', title:'Full Mock Test', sub:'50 MCQs timed', desc:'50 MCQs all subjects. Calculate, find weak subject.', dur:'45 min', content:'quiz' },
      { id:'t8', icon:'🗺️', title:'Map + Diagram Practice', sub:'Geography + Polity diagrams', desc:'India map + 2 constitutional diagrams.', dur:'25 min', content:'geography' },
    ];

    // 10-12 hours: IAS Officer Mode
    return [
      { id:'t1', icon:'📖', title:`${t.icon} ${t.topic} – Command Level`, sub:t.sub, desc:`Full mastery: 3 sources + notes + mind map.`, dur:'180 min', content:_tc(t) },
      { id:'t2', icon:'📖', title:`${t2.icon} ${t2.topic} – Second Subject`, sub:t2.sub, desc:`Full notes + lesson study.`, dur:'90 min', content:_tc(t2) },
      { id:'t3', icon:'📖', title:`${t3.icon} ${t3.topic} – Light Read`, sub:t3.sub, desc:`Concept overview only. Deep next time.`, dur:'45 min', content:_tc(t3) },
      { id:'t4', icon:'🧠', title:'PYQ + Test Practice', sub:'50 questions', desc:'50 PYQs across subjects. Target: 35+ correct.', dur:'60 min', content:'pyq' },
      { id:'t5', icon:'✍️', title:'Mains Answer Writing – 5 Questions', sub:'Full session', desc:'3×150w + 2×250w. Self-evaluate after.', dur:'75 min', content:'writing' },
      { id:'t6', icon:'🔄', title:'Monthly Revision Sweep', sub:'All completed topics', desc:'1-line cues for all topics. Flag forgotten ones.', dur:'75 min', content:'revision' },
      { id:'t7', icon:'📰', title:'Current Affairs – Super Round', sub:'All sources + editorial writing', desc:'Full read + write your own 200w editorial.', dur:'60 min', content:'current' },
      { id:'t8', icon:'📋', title:'Full Length Mock Test', sub:'100 MCQs in 2 hours', desc:'Simulate actual Prelims. No breaks. Score and analyse.', dur:'120 min', content:'quiz' },
      { id:'t9', icon:'🗺️', title:'Map + Diagrams + Flowcharts', sub:'Visual session', desc:'India + World map + 3 flowcharts from today.', dur:'30 min', content:'geography' },
      { id:'t10', icon:'💬', title:'Discuss with Maa (AI)', sub:'Ask unclear things', desc:'Go to Settings tab. Ask Maa everything you are unsure of!', dur:'15 min', content:'chat' },
    ];
  },

  render() {
    this.todayList = this.get(STATE.hoursPerDay, STATE.dayInPlan);
    const total = this.todayList.length;
    const done  = this.todayList.filter(t => STATE.tasksComp.includes(t.id)).length;

    document.getElementById('sTasks').textContent  = `${done}/${total}`;
    document.getElementById('sTarget').textContent = STATE.hoursPerDay < 1 ? Math.round(STATE.hoursPerDay*60)+'min' : STATE.hoursPerDay+'h';
    document.getElementById('rpct').textContent    = Math.round(done/total*100) + '%';
    document.getElementById('rdn').textContent     = `${done}/${total}`;
    document.getElementById('ring').style.strokeDashoffset = 201 - 201 * (done/total);

    document.getElementById('tasksC').innerHTML = this.todayList.map(t => `
      <div class="task-card ${STATE.tasksComp.includes(t.id) ? 'done' : ''}" id="card-${t.id}">
        <div class="th" onclick="Tasks.toggle('${t.id}')">
          <div class="ti">${t.icon}</div>
          <div class="tinfo">
            <div class="tt">${t.title}</div>
            <div class="ts">${t.sub}</div>
            <div class="tdur">⏱️ ${t.dur}</div>
          </div>
          <div class="tchk" onclick="event.stopPropagation();Tasks.markDone('${t.id}')">${STATE.tasksComp.includes(t.id)?'✓':''}</div>
        </div>
        <div class="tbody">
          <p>${t.desc}</p>
          <button class="sbtn sbtn-study" onclick="App.openLesson('${t.content}')">📖 Open Lesson →</button>
          <textarea class="notes-ta" placeholder="Your notes (Maa will check! ✍️)" id="note-${t.id}" onchange="Tasks.saveNote('${t.id}',this.value)">${(STATE.notes||{})[t.id]||''}</textarea>
          <button class="sbtn sbtn-done" onclick="Tasks.markDone('${t.id}')">${STATE.tasksComp.includes(t.id)?'✅ Done!':'✅ Mark Complete'}</button>
        </div>
      </div>`).join('');
  },

  toggle(id) {
    document.getElementById('card-'+id).classList.toggle('open');
  },

  async markDone(id) {
    if (STATE.tasksComp.includes(id)) return;
    STATE.tasksComp.push(id);
    STATE.topicsDone = (STATE.topicsDone || 0) + 1;

    const today = new Date().toDateString();
    if (STATE.lastStudyDate !== today) {
      STATE.streak++;
      STATE.lastStudyDate = today;
      STATE.hourGoalCelebrated = false;
      document.getElementById('streakN').textContent = STATE.streak;
    }
    saveState();

    // Sync to backend
    await API.taskDone({
      taskId: id,
      dayInPlan: STATE.dayInPlan,
      tasksTotal: this.todayList.length
    });

    this.render();

    const done  = this.todayList.filter(t => STATE.tasksComp.includes(t.id)).length;
    const total = this.todayList.length;
    if (done >= total) {
      setTimeout(() => App.celebrate('🎉','Wah Beta Wah! 🏆',
        'Aaj ke SAARE tasks complete! Maa ki aankhon mein aansu aa gaye! I love you so much! ❤️'), 400);
    } else if (done === Math.floor(total/2)) {
      setTimeout(() => App.toast('🔥 Halfway! Maa smiling at you right now! 💛'), 200);
    } else {
      App.toast(`✅ Done! ${total-done} more. You are doing great beta! 💪`);
    }
  },

  async saveNote(id, value) {
    if (!STATE.notes) STATE.notes = {};
    STATE.notes[id] = value;
    saveState();
    await API.saveNote({
      taskId: id, content: value,
      subject: (this.todayList.find(t=>t.id===id)||{}).sub,
      dayInPlan: STATE.dayInPlan
    });
  }
};

function _tc(t) {
  if (!t) return 'general';
  const s = t.sub.toLowerCase();
  if (s.includes('history')) return 'history';
  if (s.includes('polity')) return 'polity';
  if (s.includes('geog')) return 'geography';
  if (s.includes('econ')) return 'economy';
  if (s.includes('envir')) return 'environment';
  if (s.includes('science')) return 'science';
  if (s.includes('govern') || s.includes('ir')) return 'governance';
  if (s.includes('ethics')) return 'ethics';
  if (s.includes('csat')) return 'csat';
  return 'general';
}
