/* notifications.js — Mobile PWA compatible notifications */
var Notifications = {
  swReg: null,

  // Register Service Worker for background notifications
  registerSW: async function() {
    if (!('serviceWorker' in navigator)) return null;
    try {
      // Inline SW as blob — works without external sw.js file
      var swCode = [
        "self.addEventListener('install', function(e){ self.skipWaiting(); });",
        "self.addEventListener('activate', function(e){ self.clients.claim(); });",
        "self.addEventListener('notificationclick', function(e){",
        "  e.notification.close();",
        "  e.waitUntil(clients.matchAll({type:'window'}).then(function(list){",
        "    if(list.length) return list[0].focus();",
        "    return clients.openWindow('/');",
        "  }));",
        "});"
      ].join('\n');

      var blob = new Blob([swCode], { type: 'application/javascript' });
      var swUrl = URL.createObjectURL(blob);
      Notifications.swReg = await navigator.serviceWorker.register(swUrl);
      console.log('SW registered');
      return Notifications.swReg;
    } catch(e) {
      console.log('SW failed:', e.message);
      return null;
    }
  },

  request: async function() {
    // Check if notifications supported
    if (!('Notification' in window)) {
      App.toast('⚠️ Open app in Chrome browser for notifications');
      return;
    }

    var perm = await Notification.requestPermission();

    if (perm === 'granted') {
      App.toast('✅ Notifications ON! Maa will remind you! 🔔');
      // Register SW for background support
      await Notifications.registerSW();
      // Send test notification
      Notifications.send('🔔 UPSC Maa Active!',
        'Beta, Maa will now remind you to study every day! ❤️');
    } else if (perm === 'denied') {
      App.toast('❌ Notifications blocked. Go to: Chrome menu → Site Settings → Notifications → Allow');
    } else {
      App.toast('⚠️ Please tap Allow when prompted');
    }
  },

  send: function(title, body) {
    if (Notification.permission !== 'granted') return;
    try {
      if (Notifications.swReg && Notifications.swReg.showNotification) {
        // Use SW notification (works when app is in background on mobile)
        Notifications.swReg.showNotification(title, {
          body: body,
          icon: '/icons/icon-192.png',
          badge: '/icons/icon-192.png',
          vibrate: [200, 100, 200],
          requireInteraction: false
        });
      } else {
        // Fallback to basic notification
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
      { key: 'morning',   emoji: '🌅', title: 'Uthho Beta! 🔔',       msg: 'Good morning! Day ' + STATE.dayInPlan + '. Padhai shuru karo! ❤️' },
      { key: 'afternoon', emoji: '☀️', title: 'Dopahar Study Time! ☀️', msg: 'Khana hogaya? Ab books ki taraf jao! 💪' },
      { key: 'night',     emoji: '🌙', title: 'Revision Time! 🌙',      msg: 'Aaj ka padha revise karo. 30 min = better marks! 📖' }
    ];

    alarms.forEach(function(a) {
      if (STATE.alarms[a.key] === hhmm) {
        // Show in-app popup
        App.showNotif(a.emoji, a.title, a.msg);
        // Send phone notification
        Notifications.send(a.title, a.msg);
      }
    });

    // Good night at 22:30
    if (hhmm === '22:30') {
      App.showNotif('🌟', 'Good Night Beta! ❤️', 'Maa proud hai. So jao, kal aur padho! 😴');
      Notifications.send('🌟 Good Night Beta!', 'Maa proud hai. So jao, kal aur padho! 😴');
    }
  },

  // Init on app start
  init: async function() {
    // Auto-register SW if permission already granted
    if (Notification.permission === 'granted') {
      await Notifications.registerSW();
    }
  }
};
