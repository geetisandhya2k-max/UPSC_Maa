const express = require('express');
const router  = express.Router();
const Note    = require('../models/Note');
const { protect } = require('../middleware/auth');

router.get('/', protect, async (req, res) => {
  const filter = { user: req.user._id };
  if (req.query.subject) filter.subject = req.query.subject;
  if (req.query.pinned === 'true') filter.isPinned = true;
  try {
    const notes = await Note.find(filter).sort({ updatedAt:-1 });
    res.json({ notes });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', protect, async (req, res) => {
  const { taskId, content, subject, topicId, dayInPlan, tags } = req.body;
  if (!taskId) return res.status(400).json({ error: 'taskId required' });
  try {
    const note = await Note.findOneAndUpdate(
      { user: req.user._id, taskId },
      { content, subject, topicId, dayInPlan, tags: tags||[] },
      { upsert: true, new: true }
    );
    res.json({ note });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.put('/:id/pin', protect, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      [{ $set: { isPinned: { $not: '$isPinned' } } }],
      { new: true }
    );
    res.json({ note });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    await Note.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
