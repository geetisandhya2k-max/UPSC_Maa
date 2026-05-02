/* plan.js */
function getPhases() {
  var t = STATE.targetDays || 365;
  var p1 = Math.round(t * 0.25);
  var p2 = Math.round(t * 0.57);
  var p3 = Math.round(t * 0.82);
  return [
    { name:'Foundation', days:'1-'+p1,          desc:'All NCERTs' },
    { name:'Core Study', days:(p1+1)+'-'+p2,    desc:'Standard books' },
    { name:'Revision',   days:(p2+1)+'-'+p3,    desc:'Notes + Writing' },
    { name:'Mock Tests', days:(p3+1)+'-'+t,     desc:'PYQs + Final' },
  ];
}
var PHASES = getPhases();
var activePlan = 'All';

var Plan = {
  renderTabs: function() {
    PHASES = getPhases();  // refresh based on current targetDays
    var tabs = ['All'].concat(PHASES.map(function(p){return p.name;}));
    document.getElementById('planTabs').innerHTML = tabs.map(function(p) {
      return '<button class="ptab '+(activePlan===p?'active':'')+'" onclick="Plan.setPhase(\''+p+'\')">'+p+'</button>';
    }).join('');
  },

  setPhase: function(p) { activePlan = p; Plan.renderTabs(); Plan.renderContent(); },

  buildDays: function() {
    var days = [];
    var totalDays = STATE.targetDays || 365;
    for (var d = 1; d <= totalDays; d++) {
      var t   = SYLLABUS[(d-1) % SYLLABUS.length];
      var h   = STATE.hoursPerDay;
      var dur = h<=0.5?'20 min':h<=1?'35 min':h<=2?'60 min':h<=4?'90 min':h<=6?'120 min':'150 min';
      days.push({ day:d, topic:t, dur:dur, isDone:d<STATE.dayInPlan, isToday:d===STATE.dayInPlan });
    }
    return days;
  },

  renderContent: function() {
    var all      = Plan.buildDays();
    var filtered = all;
    if (activePlan !== 'All') {
      var ph = PHASES.filter(function(p){return p.name===activePlan;})[0];
      if (ph) {
        var parts = ph.days.split('-');
        var s = parseInt(parts[0]), e = parseInt(parts[1]);
        filtered = all.filter(function(d){return d.day>=s && d.day<=e;});
      }
    }
    var html = '';
    for (var i = 0; i < filtered.length; i += 7) {
      var chunk = filtered.slice(i, i+7);
      var start = chunk[0].day;
      var end   = chunk[chunk.length-1].day;
      var phase = PHASES.filter(function(p){
        var parts=p.days.split('-'); return start>=parseInt(parts[0])&&start<=parseInt(parts[1]);
      })[0] || PHASES[0];
      html += '<div class="wg"><div class="wg-ttl">Days '+start+'–'+end+' · '+phase.name+' · '+chunk[0].topic.sub+'</div>';
      chunk.forEach(function(d) {
        var cls = d.isToday?'today-row':d.isDone?'done-row':'';
        var todayBadge = d.isToday ? ' <span style="color:var(--sf);font-size:8px;">← TODAY</span>' : '';
        html += '<div class="dr '+cls+'" onclick="App.openDayLesson('+d.day+')">' +
          '<div class="dnum">'+d.day+'</div>' +
          '<div class="dinfo">' +
            '<div class="dsub">'+d.topic.icon+' '+d.topic.topic+todayBadge+'</div>' +
            '<div class="dtop">'+d.topic.details.slice(0,55)+(d.topic.details.length>55?'…':'')+'</div>' +
            '<div class="ddur">⏱️ '+d.dur+'</div>' +
          '</div>' +
          '<div class="dsts">'+(d.isDone?'✅':d.isToday?'📖':'⭕')+'</div>' +
        '</div>';
      });
      html += '</div>';
    }
    document.getElementById('planContent').innerHTML = html;
  }
};
