/* notifications.js — Works on browser and phone PWA */
var Notifications = {
  swReg: null,

  registerSW: async function() {
    if (!('serviceWorker' in navigator)) return null;
    try {
      Notifications.swReg = await navigator.serviceWorker.register('/sw.js');
      console.log('SW registered:', Notifications.swReg.scope);
      return Notifications.swReg;
    } catch(e) {
      console.log('SW failed:', e.message);
      return null;
    }
  },

  request: async function() {
    if (!('Notification' in window)) {
      App.toast('⚠️ Use Chrome browser for notifications');
      return;
    }

    // Register SW first
    await Notifications.registerSW();

    var perm = await Notification.requestPermission();
    if (perm === 'granted') {
      App.toast('✅ Notifications ON! Maa will remind you daily! 🔔');
      // Send test notification
      setTimeout(function() {
        Notifications.send('🔔 UPSC Maa Active!', 'Beta, Maa will now remind you to study every day! ❤️');
      }, 500);
    } else if (perm === 'denied') {
      App.toast('❌ Notifications blocked. Settings → Site Settings → Notifications → Allow');
    } else {
      App.toast('⚠️ Please tap Allow when Android asks');
    }
  },

  send: function(title, body) {
    if (Notification.permission !== 'granted') return;
    try {
      if (Notifications.swReg) {
        Notifications.swReg.showNotification(title, {
          body: body,
          icon: '/icons/icon-192.png',
          vibrate: [200, 100, 200],
          requireInteraction: false,
          tag: 'upsc-maa'
        });
      } else {
        new Notification(title, { body: body });
      }
    } catch(e) {
      try { new Notification(title, { body: body }); } catch(e2) {}
    }
  },

  tick: function() {
    var now  = new Date();
    var h    = String(now.getHours()).padStart(2, '0');
    var m    = String(now.getMinutes()).padStart(2, '0');
    var hhmm = h + ':' + m;
    if (hhmm === STATE.lastAlarmChk) return;
    STATE.lastAlarmChk = hhmm;
    if (!STATE.alarms || !STATE.alarms.active) return;

    var alarms = [
      { key:'morning',   emoji:'🌅', title:'Uthho Beta! 🔔',        msg:'Good morning! Day '+STATE.dayInPlan+'. Padhai shuru karo! ❤️' },
      { key:'afternoon', emoji:'☀️', title:'Dopahar Study Time! ☀️', msg:'Khana hogaya? Ab books ki taraf jao! 💪' },
      { key:'night',     emoji:'🌙', title:'Revision Time! 🌙',       msg:'Aaj ka padha revise karo. 30 min = better marks! 📖' }
    ];

    alarms.forEach(function(a) {
      if (STATE.alarms[a.key] === hhmm) {
        App.showNotif(a.emoji, a.title, a.msg);
        Notifications.send(a.title, a.msg);
      }
    });

    if (hhmm === '22:30') {
      App.showNotif('🌟', 'Good Night Beta! ❤️', 'Maa proud hai. So jao, kal aur padho! 😴');
      Notifications.send('🌟 Good Night Beta!', 'Maa proud hai. So jao, kal aur padho! 😴');
    }
  },

  init: async function() {
    await Notifications.registerSW();
  }
};
