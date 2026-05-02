const express = require('express');
const router  = express.Router();
const ChatHistory = require('../models/ChatHistory');
const { protect } = require('../middleware/auth');

const MAA_SYSTEM = `You are UPSC Maa — an expert AI tutor who speaks like a caring strict Indian mother helping students crack UPSC IAS Civil Services exam.

Personality: Warm, loving, Hinglish (Hindi+English mix), call user "beta", strict about discipline, knows everything about UPSC. Maximum 3-4 sentences. Always encourage but push firmly.

UPSC Knowledge:
- Exam: Prelims (GS+CSAT) → Mains (9 papers) → Interview (275 marks). Total 2025 marks.
- Books: Laxmikanth (Polity), Spectrum (History), Ramesh Singh (Economy), Shankar IAS (Environment), Lexicon (Ethics)
- Strategy: NCERTs → standard books → current affairs → PYQs → mock tests → answer writing
- Current Affairs: The Hindu + PIB daily
- Prelims 2026: May 24, 2026
- Always reply in Hinglish, be like a loving strict Indian mother`;

// ── Groq API (FREE — llama3 model) ───────────────────────
async function askGroq(messages, userCtx) {
  const GROQ_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_KEY) throw new Error('GROQ_API_KEY not set');

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + GROQ_KEY
    },
    body: JSON.stringify({
      model: 'llama3-8b-8192',   // FREE model on Groq
      max_tokens: 512,
      temperature: 0.8,
      messages: [
        { role: 'system', content: MAA_SYSTEM + '\n\n' + userCtx },
        ...messages
      ]
    })
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.error?.message || 'Groq error');
  return data.choices?.[0]?.message?.content || null;
}

// ── Fallback: rule-based Maa replies (if no API key) ─────
function fallbackMaa(message) {
  const msg = message.toLowerCase();
  if (msg.includes('syllabus'))
    return 'Beta, UPSC syllabus mein 4 GS papers hain! GS1: History+Geography, GS2: Polity+IR, GS3: Economy+Environment+S&T, GS4: Ethics. Pehle NCERT padho! 📚';
  if (msg.includes('book') || msg.includes('books'))
    return 'Beta, ye padho: Laxmikanth (Polity), Spectrum (Modern History), Ramesh Singh (Economy), Shankar IAS (Environment), Lexicon (Ethics). NCERTs pehle! 💪';
  if (msg.includes('history'))
    return 'Beta, History ke liye Spectrum + NCERTs (6th-12th) padho. Ancient, Medieval, Modern India + Art & Culture — sab cover karo! 🏺';
  if (msg.includes('polity') || msg.includes('constitution'))
    return 'Beta, Polity ke liye Laxmikanth — ek baar nahi, teen baar padho! Constitution ka har article samajhna zaroori hai. Chal shuru karo! ⚖️';
  if (msg.includes('geography'))
    return 'Beta, Geography ke liye NCERT 11th & 12th pehle. Blank map practice daily karo — 3-4 marks seedhe milenge Prelims mein! 🗺️';
  if (msg.includes('economy') || msg.includes('economics'))
    return 'Beta, Economy ke liye Ramesh Singh + Economic Survey padho. GDP, inflation, RBI policies — sab links samajhne padenge! 💰';
  if (msg.includes('environment'))
    return 'Beta, Environment ke liye Shankar IAS ka book best hai. International conventions, biodiversity hotspots — PYQ pattern dekho! 🌿';
  if (msg.includes('ethics'))
    return 'Beta, Ethics (GS4) ke liye Lexicon padho. Case studies mein IDEAL method use karo. Emotional intelligence — Goleman ke 5 components yaad karo! 🧠';
  if (msg.includes('current affairs') || msg.includes('newspaper'))
    return 'Beta, roz The Hindu padho — sirf editorial + national + international. PIB.gov.in bhi daily check karo. 45 min subah + 20 min shaam! 📰';
  if (msg.includes('strategy') || msg.includes('how to') || msg.includes('plan'))
    return 'Beta, strategy simple hai: Month 1-3 NCERTs, Month 4-6 standard books, Month 7-9 revision + CA, Month 10-11 mock tests, Month 12 rapid revision. Consistent raho! 🎯';
  if (msg.includes('prelim') || msg.includes('csat'))
    return 'Beta, Prelims mein 100 MCQs in 120 min = 72 sec per question. Elimination technique use karo. CSAT qualifying hai — 33% marks chahiye. Practice karo! 📝';
  if (msg.includes('mains') || msg.includes('answer writing'))
    return 'Beta, Mains answer writing daily practice karo! Structure: Intro + Body (multiple dimensions) + Conclusion. 150 words = 7-8 min. Diagrams use karo! ✍️';
  if (msg.includes('motivat') || msg.includes('tired') || msg.includes('demotivat') || msg.includes('thak'))
    return 'Beta, Maa jaanti hai kitna mushkil hai. But yaad rakh — UPSC ek marathon hai sprint nahi. Ek din mein nahi hoga, ek ek din consistent raho. Maa tere saath hai! ❤️';
  if (msg.includes('time') || msg.includes('hours') || msg.includes('schedule'))
    return 'Beta, 6-8 hours daily best hai. Subah: NCERTs/standard books. Dopahar: current affairs. Shaam: revision + answer writing. Raat: flashcards. Consistency > intensity! ⏰';
  if (msg.includes('rank') || msg.includes('topper'))
    return 'Beta, rank 1 ka secret hai: consistent study + smart strategy + answer writing practice + current affairs. Koi shortcut nahi. Ek ek din mehnat karo! 🏆';
  if (msg.includes('hello') || msg.includes('hi') || msg.includes('hii') || msg.includes('namaste'))
    return 'Namaste beta! Maa yahan hai — UPSC ke baare mein kuch bhi poocho. Syllabus, books, strategy, motivation — sab bataungi! Ab bolo kya poochna hai? 🤗';
  // Default
  return 'Beta, yeh bahut achha question hai! UPSC ki preparation mein consistency sabse zaroori hai. The Hindu daily padho, NCERTs complete karo, aur mock tests dete raho. Maa hamesha saath hai! 💛';
}

// POST /api/chat/message
router.post('/message', protect, async (req, res) => {
  const { message, conversationHistory } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const today   = new Date().toISOString().slice(0, 10);
  const userCtx = `User: ${req.user.name}. Study target: ${req.user.hoursPerDay}h/day.`;

  const messages = [
    ...(conversationHistory || []).slice(-6),
    { role: 'user', content: message }
  ];

  let reply;

  // Try Groq first (free), then fallback
  try {
    reply = await askGroq(messages, userCtx);
    if (!reply) reply = fallbackMaa(message);
  } catch(err) {
    console.log('Groq failed, using fallback:', err.message);
    reply = fallbackMaa(message);
  }

  // Save to DB
  try {
    await ChatHistory.findOneAndUpdate(
      { user: req.user._id, sessionDate: today },
      { $push: { messages: [
          { role: 'user',      content: message },
          { role: 'assistant', content: reply   }
      ]}},
      { upsert: true }
    );
  } catch(e) {}

  res.json({ reply });
});

// GET /api/chat/history
router.get('/history', protect, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const chat = await ChatHistory.findOne({ user: req.user._id, sessionDate: today });
    res.json({ messages: chat?.messages || [] });
  } catch(err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
