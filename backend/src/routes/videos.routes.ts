import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// GET all video blog entries (stored as Settings with key prefix VIDEO_*)
router.get('/', async (req, res) => {
  try {
    const entries = await prisma.settings.findMany({
      where: { key: { startsWith: 'VIDEO_' } },
      orderBy: { createdAt: 'desc' },
    });
    const videos = entries.map(e => {
      try { return { id: e.id, key: e.key, ...JSON.parse(e.value) }; }
      catch { return { id: e.id, key: e.key }; }
    });
    res.json({ status: 'success', data: videos });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// POST create video blog entry
router.post('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { title, description, duration, thumbnail, category, videoUrl } = req.body;
    if (!title) return res.status(400).json({ status: 'error', message: 'title required' });
    const key = `VIDEO_${Date.now()}`;
    const entry = await prisma.settings.create({
      data: {
        key,
        value: JSON.stringify({ title, description, duration, thumbnail, category, videoUrl }),
        description: `Video: ${title}`
      }
    });
    res.json({ status: 'success', data: { id: entry.id, key, title, description, duration, thumbnail, category, videoUrl } });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// DELETE video blog entry
router.delete('/:id', protect, authorize('ADMIN'), async (req, res) => {
  try {
    await prisma.settings.delete({ where: { id: req.params.id as string } });
    res.json({ status: 'success', message: 'Deleted' });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// PUT update video blog entry
router.put('/:id', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { title, description, duration, thumbnail, category, videoUrl } = req.body;
    const entry = await prisma.settings.update({
      where: { id: req.params.id as string },
      data: {
        value: JSON.stringify({ title, description, duration, thumbnail, category, videoUrl }),
        description: `Video: ${title}`
      }
    });
    res.json({ status: 'success', data: { id: entry.id, title, description, duration, thumbnail, category, videoUrl } });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

export default router;
