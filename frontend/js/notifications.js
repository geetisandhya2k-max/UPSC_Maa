/* notifications.js — Browser push notifications */
const Notifications = {
  async request() {
    if (!('Notification' in window)) { App.toast('Browser does not support notifications'); return; }
    const perm = await Notification.requestPermission();
    if (perm === 'granted') {
      App.toast('✅ Notifications ON! Maa will ring you! 🔔');
      new Notification('🔔 UPSC Maa Active!', { body: 'Beta, Maa will now remind you to study every day! ❤️' });
      // Try to register push subscription with backend
      this.subscribePush();
    } else {
      App.toast('❌ Go to browser Settings → Notifications → Allow');
    }
  },

  async subscribePush() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    try {
      const keyData = await API.vapidKey();
      if (!keyData?.publicKey) return;
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: keyData.publicKey
      });
      await API.savePush(sub.toJSON());
    } catch(e) { console.log('Push sub failed:', e.message); }
  },

  tick() {
    const now  = new Date();
    const hhmm = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    if (hhmm === STATE.lastAlarmChk) return;
    STATE.lastAlarmChk = hhmm;

    const defs = {
      morning:   { emoji:'🌅', title:'Uthho Beta! 🔔',         msg:`Good morning! Day ${STATE.dayInPlan}. Padhai shuru karo. Maa wait kar rahi hai! ❤️` },
      afternoon: { emoji:'☀️', title:'Dopahar Study Time!',    msg:'Khana hogaya? Ab books ki taraf! Consistency = success! 💪' },
      night:     { emoji:'🌙', title:'Hey Buddy – Revision!',  msg:'Aaj ka padha revise karo. 30 min = better marks! 📖' }
    };
    Object.entries(defs).forEach(([k, v]) => {
      if (STATE.alarms[k] === hhmm && STATE.alarms.active) {
        App.showNotif(v.emoji, v.title, v.msg);
        if (Notification.permission === 'granted') new Notification(v.title, { body: v.msg });
      }
    });
    if (hhmm === '22:30') {
      App.showNotif('🌟', 'Good Night Beta! ❤️', 'Maa proud hai. So jao, fresh mind tomorrow! 😴');
    }
  }
};
