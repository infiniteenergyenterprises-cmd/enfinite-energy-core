import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();
const prisma = new PrismaClient();

// GET all gallery items
router.get('/', async (req, res) => {
  try {
    const items = await prisma.gallery.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json({ status: 'success', data: items });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// POST add new gallery item
router.post('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { title, type, url, category } = req.body;
    if (!url || !type) return res.status(400).json({ status: 'error', message: 'url and type required' });
    const item = await prisma.gallery.create({
      data: { title, type: type || 'IMAGE', url, category }
    });
    res.json({ status: 'success', data: item });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// DELETE gallery item
router.delete('/:id', protect, authorize('ADMIN'), async (req, res) => {
  try {
    await prisma.gallery.delete({ where: { id: req.params.id } });
    res.json({ status: 'success', message: 'Deleted' });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// PATCH update gallery item
router.patch('/:id', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { title, category } = req.body;
    const item = await prisma.gallery.update({
      where: { id: req.params.id },
      data: { title, category }
    });
    res.json({ status: 'success', data: item });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

export default router;
