/* notifications.js */
var Notifications = {
  request: async function() {
    if (!('Notification' in window)) { App.toast('Browser does not support notifications'); return; }
    var perm = await Notification.requestPermission();
    if (perm === 'granted') {
      App.toast('✅ Notifications ON! Maa will ring you! 🔔');
      new Notification('🔔 UPSC Maa Active!', { body: 'Beta, Maa will now remind you to study every day! ❤️' });
    } else {
      App.toast('❌ Go to browser Settings → Notifications → Allow');
    }
  },

  tick: function() {
    var now  = new Date();
    var h    = String(now.getHours()).padStart(2,'0');
    var m    = String(now.getMinutes()).padStart(2,'0');
    var hhmm = h + ':' + m;
    if (hhmm === STATE.lastAlarmChk) return;
    STATE.lastAlarmChk = hhmm;

    var defs = {
      morning:   { emoji:'🌅', title:'Uthho Beta! 🔔',      msg:'Good morning! Day '+STATE.dayInPlan+'. Padhai shuru karo! ❤️' },
      afternoon: { emoji:'☀️', title:'Dopahar Study Time!', msg:'Khana hogaya? Ab books ki taraf! 💪' },
      night:     { emoji:'🌙', title:'Revision Time!',      msg:'Aaj ka padha revise karo. 30 min = better marks! 📖' }
    };
    var self = this;
    Object.keys(defs).forEach(function(k) {
      if (STATE.alarms[k] === hhmm && STATE.alarms.active) {
        var v = defs[k];
        App.showNotif(v.emoji, v.title, v.msg);
        if (Notification.permission === 'granted') new Notification(v.title, { body: v.msg });
      }
    });
    if (hhmm === '22:30') {
      App.showNotif('🌟', 'Good Night Beta! ❤️', 'Maa proud hai. So jao, kal aur padho! 😴');
    }
  }
};
