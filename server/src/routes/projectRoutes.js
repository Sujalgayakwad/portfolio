import express from 'express';
import { DataStore } from '../utils/dataStore.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await DataStore.getProjects();
    return res.json(projects);
  } catch (err) {
    console.error('Error fetching projects:', err);
    return res.status(500).json({ error: 'Failed to retrieve projects' });
  }
});

// GET /api/projects/:id (public)
router.get('/:id', async (req, res) => {
  try {
    const project = await DataStore.getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json(project);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to retrieve project' });
  }
});

// POST /api/projects (protected)
router.post('/', protect, async (req, res) => {
  try {
    const { title, desc, category } = req.body;
    if (!title || !desc) {
      return res.status(400).json({ error: 'Title and description are required' });
    }

    const created = await DataStore.createProject(req.body);
    return res.status(201).json({
      message: 'Project created successfully',
      data: created
    });
  } catch (err) {
    console.error('Error creating project:', err);
    return res.status(500).json({ error: 'Failed to create project' });
  }
});

// PUT /api/projects/:id (protected)
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await DataStore.updateProject(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json({
      message: 'Project updated successfully',
      data: updated
    });
  } catch (err) {
    console.error('Error updating project:', err);
    return res.status(500).json({ error: 'Failed to update project' });
  }
});

// DELETE /api/projects/:id (protected)
router.delete('/:id', protect, async (req, res) => {
  try {
    const deleted = await DataStore.deleteProject(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Project not found' });
    }
    return res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    console.error('Error deleting project:', err);
    return res.status(500).json({ error: 'Failed to delete project' });
  }
});

export default router;
