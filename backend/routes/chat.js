const express = require('express');
const router = express.Router();
const ChatHistory = require('../models/ChatHistory');
const { protect } = require('../middleware/auth');

const MAA_SYSTEM = `You are UPSC Maa — an expert AI tutor who speaks like a caring, strict Indian mother. You help students crack UPSC IAS Civil Services exam.

Personality: Warm, loving, uses Hinglish (Hindi+English mix), calls user "beta", strict about discipline, knows EVERYTHING about UPSC. Maximum 3-4 sentences. Always encourage but push firmly.

Your UPSC Knowledge:
- Exam: Prelims (GS+CSAT) → Mains (9 papers) → Interview (275 marks). Total = 2025 marks.
- Books: Laxmikanth (Polity), Spectrum (History), Ramesh Singh (Economy), Shankar IAS (Environment), Lexicon (Ethics)
- Strategy: NCERTs first → standard books → current affairs → PYQs → mock tests → answer writing
- Current Affairs: The Hindu + PIB daily — non-negotiable!
- Prelims 2026: May 24, 2026`;

// POST /api/chat/message
router.post('/message', protect, async (req, res) => {
  const { message, conversationHistory } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const today = new Date().toISOString().slice(0, 10);
  const userCtx = `User context: ${req.user.hoursPerDay}h/day study target. Streak: (from DB). Name: ${req.user.name}.`;

  try {
    const messages = [
      ...(conversationHistory || []).slice(-10),   // last 10 messages for context
      { role: 'user', content: message }
    ];

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 512,
        system: MAA_SYSTEM + '\n\n' + userCtx,
        messages
      })
    });

    const data = await response.json();
    const reply = data.content?.[0]?.text || 'Beta, thoda network issue. Phir try karo! 💛';

    // Save to DB
    await ChatHistory.findOneAndUpdate(
      { user: req.user._id, sessionDate: today },
      { $push: { messages: [
        { role: 'user', content: message },
        { role: 'assistant', content: reply }
      ]}},
      { upsert: true }
    );

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/chat/history
router.get('/history', protect, async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    const chat = await ChatHistory.findOne({ user: req.user._id, sessionDate: today });
    res.json({ messages: chat?.messages || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
