import express from 'express';
import { DataStore } from '../utils/dataStore.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/services
router.get('/', async (req, res) => {
  try {
    const services = await DataStore.getServices();
    return res.json(services);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve services' });
  }
});

// POST /api/services (protected)
router.post('/', protect, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const created = await DataStore.createService(req.body);
    return res.status(201).json({ message: 'Service created successfully', data: created });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create service' });
  }
});

// PUT /api/services/:id (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await DataStore.updateService(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Service not found' });
    }
    return res.json({ message: 'Service updated successfully', data: updated });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to update service' });
  }
});

// DELETE /api/services/:id (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await DataStore.deleteService(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }
    return res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    return res.status(500).json({ error: 'Failed to delete service' });
  }
});

export default router;
