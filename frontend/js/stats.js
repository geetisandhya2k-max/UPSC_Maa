/* stats.js */
var StatsPage = {
  render: async function() {
    var data = await API.dashboard();
    var targetDays = STATE.targetDays || 365;
    var daysStudied = STATE.dayInPlan || 1;
    var daysLeft = Math.max(0, targetDays - daysStudied);

    if (data) {
      document.getElementById('ss-str').textContent = data.streak.current;
      document.getElementById('ss-hrs').textContent = data.streak.totalHours + 'h';
      document.getElementById('ss-tsk').textContent = STATE.tasksComp.length;
      document.getElementById('ss-qz').textContent  = data.quiz.average ? data.quiz.average+'%' : '—';
      document.getElementById('syllFill').style.width  = data.syllabus.percent + '%';
      document.getElementById('syllDone').textContent  = data.syllabus.topicsDone+' topics done';
      document.getElementById('dLeft').textContent     = daysLeft;
      StatsPage._renderChart(data.streak.weeklyHours);
    } else {
      document.getElementById('ss-str').textContent = STATE.streak;
      document.getElementById('ss-hrs').textContent = Math.floor((STATE.totalSec||0)/3600)+'h';
      document.getElementById('ss-tsk').textContent = STATE.tasksComp.length;
      var avg = STATE.qScores && STATE.qScores.length
        ? Math.round(STATE.qScores.reduce(function(a,b){return a+b;},0)/STATE.qScores.length) : 0;
      document.getElementById('ss-qz').textContent  = (STATE.qScores && STATE.qScores.length) ? avg+'%' : '—';
      var covered = Math.min(STATE.topicsDone||0, 420);
      document.getElementById('syllFill').style.width  = Math.round(covered/420*100)+'%';
      document.getElementById('syllDone').textContent  = covered+' topics done';
      document.getElementById('dLeft').textContent     = daysLeft;
      StatsPage._renderChart(STATE.weekH);
    }

    // Update days label to show target
    var dlLabel = document.getElementById('dLeftLabel');
    if (dlLabel) dlLabel.textContent = 'Days remaining in your '+targetDays+'-day plan';
  },

  _renderChart: function(weekH) {
    var days = ['S','M','T','W','T','F','S'];
    var arr  = weekH || [0,0,0,0,0,0,0];
    var mx   = Math.max.apply(null, arr.concat([1]));
    document.getElementById('barC').innerHTML = arr.map(function(h,i) {
      return '<div class="bw">' +
        '<div class="bc" style="height:'+Math.max(h/mx*100,3)+'%;opacity:'+(h>0?1:0.2)+';"></div>' +
        '<div class="bd">'+days[i]+'</div></div>';
    }).join('');
  }
};
