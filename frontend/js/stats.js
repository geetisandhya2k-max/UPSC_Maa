/* stats.js */
const StatsPage = {
  async render() {
    // Try backend first
    const data = await API.dashboard();
    if (data) {
      const { streak, quiz, syllabus, exam } = data;
      document.getElementById('ss-str').textContent = streak.current;
      document.getElementById('ss-hrs').textContent = streak.totalHours + 'h';
      document.getElementById('ss-tsk').textContent = STATE.tasksComp.length;
      document.getElementById('ss-qz').textContent  = quiz.average ? quiz.average+'%' : '—';
      document.getElementById('syllFill').style.width = syllabus.percent + '%';
      document.getElementById('syllDone').textContent  = `${syllabus.topicsDone} topics done`;
      document.getElementById('dLeft').textContent = exam.daysLeft;
      this.renderChart(streak.weeklyHours);
    } else {
      // Fallback to local state
      document.getElementById('ss-str').textContent = STATE.streak;
      document.getElementById('ss-hrs').textContent = Math.floor(STATE.totalSec/3600) + 'h';
      document.getElementById('ss-tsk').textContent = STATE.tasksComp.length;
      const avg = STATE.qScores.length ? Math.round(STATE.qScores.reduce((a,b)=>a+b,0)/STATE.qScores.length) : 0;
      document.getElementById('ss-qz').textContent  = STATE.qScores.length ? avg+'%' : '—';
      const covered = Math.min(STATE.topicsDone||0, 420);
      document.getElementById('syllFill').style.width = Math.round(covered/420*100)+'%';
      document.getElementById('syllDone').textContent = covered + ' topics done';
      const days = Math.max(0, Math.ceil((new Date('2026-05-24') - new Date()) / 864e5));
      document.getElementById('dLeft').textContent = days;
      this.renderChart(STATE.weekH);
    }
  },

  renderChart(weekH) {
    const days = ['S','M','T','W','T','F','S'];
    const mx = Math.max(...(weekH||[0,0,0,0,0,0,0]), 1);
    document.getElementById('barC').innerHTML = (weekH||[0,0,0,0,0,0,0]).map((h,i) =>
      `<div class="bw"><div class="bc" style="height:${Math.max(h/mx*100,3)}%;opacity:${h>0?1:0.2};"></div><div class="bd">${days[i]}</div></div>`
    ).join('');
  }
};
