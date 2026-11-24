import express from 'express';
import { DataStore } from '../utils/dataStore.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/portfolio
router.get('/', async (req, res) => {
  try {
    const info = await DataStore.getPortfolioInfo();
    return res.json(info);
  } catch (err) {
    console.error('Error fetching portfolio info:', err);
    return res.status(500).json({ error: 'Failed to retrieve portfolio details' });
  }
});

// PUT /api/portfolio (protected)
router.put('/', protect, async (req, res) => {
  try {
    const updated = await DataStore.updatePortfolioInfo(req.body);
    return res.json({
      message: 'Portfolio details updated successfully',
      data: updated
    });
  } catch (err) {
    console.error('Error updating portfolio info:', err);
    return res.status(500).json({ error: 'Failed to update portfolio details' });
  }
});

// POST /api/portfolio/reset (protected Factory Reset!)
router.post('/reset', protect, async (req, res) => {
  try {
    await DataStore.factoryReset();
    const fresh = await DataStore.getPortfolioInfo();
    return res.json({
      message: 'Factory Reset complete. Portfolio content restored to original default state.',
      data: fresh
    });
  } catch (err) {
    console.error('Error during factory reset:', err);
    return res.status(500).json({ error: 'Failed to execute factory reset' });
  }
});

// GET /api/portfolio/stats (protected or public dashboard stats)
router.get('/stats', async (req, res) => {
  try {
    const stats = await DataStore.getStats();
    return res.json(stats);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve statistics' });
  }
});

export default router;
