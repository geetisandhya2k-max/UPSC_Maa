const express = require('express');
const router  = express.Router();
const cron    = require('node-cron');
const webpush = require('web-push');
const User    = require('../models/User');
const Notification = require('../models/Notification');
const { protect } = require('../middleware/auth');

// Setup VAPID
if (process.env.VAPID_PUBLIC_KEY && process.env.VAPID_PRIVATE_KEY) {
  webpush.setVapidDetails(
    process.env.VAPID_EMAIL || 'mailto:admin@upsemaa.com',
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY
  );
}

const sendPush = async (user, title, body) => {
  if (!user.pushSubscription) return;
  try {
    await webpush.sendNotification(user.pushSubscription, JSON.stringify({ title, body }));
    await Notification.create({ user: user._id, title, body, type: 'alarm' });
  } catch (err) {
    if (err.statusCode === 410)
      await User.findByIdAndUpdate(user._id, { pushSubscription: null });
  }
};

// Cron: every minute — check alarms for all users
cron.schedule('* * * * *', async () => {
  const now  = new Date();
  const hhmm = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
  try {
    const users = await User.find({ 'alarms.active': true, pushSubscription: { $ne: null } });
    for (const user of users) {
      if (user.alarms.morning   === hhmm) await sendPush(user, '🌅 Uthho Beta!', 'Good morning! Padhai shuru karo. Maa wait kar rahi hai! ❤️');
      if (user.alarms.afternoon === hhmm) await sendPush(user, '☀️ Study Time!', 'Dopahar ho gayi. Ab books ki taraf jao! 💪');
      if (user.alarms.night     === hhmm) await sendPush(user, '🌙 Revision!',   'Aaj ka padha revise karo. 30 min = better marks! 📖');
      if (hhmm === '22:30')               await sendPush(user, '🌟 Good Night!', 'Maa proud hai. So jao, kal aur padho! 😴');
    }
  } catch (err) { console.error('Alarm cron error:', err.message); }
});

router.get('/',        protect, async (req, res) => {
  const notifs = await Notification.find({ user: req.user._id }).sort({ sentAt:-1 }).limit(20);
  res.json({ notifications: notifs });
});
router.put('/read-all', protect, async (req, res) => {
  await Notification.updateMany({ user: req.user._id, isRead: false }, { isRead: true });
  res.json({ success: true });
});
router.get('/vapid-key', (_req, res) =>
  res.json({ publicKey: process.env.VAPID_PUBLIC_KEY || '' })
);

module.exports = router;
