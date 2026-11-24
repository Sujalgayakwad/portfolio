import express from 'express';
import { DataStore } from '../utils/dataStore.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/messages (protected admin view)
router.get('/', protect, async (req, res) => {
  try {
    const messages = await DataStore.getMessages();
    return res.json(messages);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve messages' });
  }
});

// POST /api/messages (public contact transmission form)
router.post('/', async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message body are required' });
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    const created = await DataStore.createMessage({
      name: name.trim(),
      email: email.trim(),
      subject: (subject || 'Portfolio Direct Transmission').trim(),
      message: message.trim()
    });

    return res.status(201).json({
      message: 'Transmission successfully encrypted and dispatched to Sujal\'s inbox.',
      data: created
    });
  } catch (err) {
    console.error('Error creating message:', err);
    return res.status(500).json({ error: 'Failed to dispatch transmission' });
  }
});

// PATCH /api/messages/:id/read (protected toggle read/unread)
router.patch('/:id/read', protect, async (req, res) => {
  try {
    const updated = await DataStore.toggleMessageRead(req.params.id);
    if (!updated) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.json({ message: 'Message status updated', data: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update message status' });
  }
});

// DELETE /api/messages/:id (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await DataStore.deleteMessage(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Message not found' });
    }
    return res.json({ message: 'Message permanently purged' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete message' });
  }
});

export default router;
