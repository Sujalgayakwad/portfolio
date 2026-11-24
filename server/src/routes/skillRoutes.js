import express from 'express';
import { DataStore } from '../utils/dataStore.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/skills
router.get('/', async (req, res) => {
  try {
    const skills = await DataStore.getSkills();
    return res.json(skills);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve skills' });
  }
});

// POST /api/skills (protected)
router.post('/', protect, async (req, res) => {
  try {
    const { name, category, level } = req.body;
    if (!name) {
      return res.status(400).json({ error: 'Skill name is required' });
    }
    const created = await DataStore.createSkill(req.body);
    return res.status(201).json({ message: 'Skill created successfully', data: created });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create skill' });
  }
});

// PUT /api/skills/:id (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await DataStore.updateSkill(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    return res.json({ message: 'Skill updated successfully', data: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update skill' });
  }
});

// DELETE /api/skills/:id (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await DataStore.deleteSkill(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    return res.json({ message: 'Skill deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete skill' });
  }
});

export default router;
