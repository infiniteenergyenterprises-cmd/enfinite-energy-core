import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

/* Events stored as Settings with key prefix EVT_* */

router.get('/', async (req, res) => {
  try {
    const entries = await prisma.settings.findMany({
      where: { key: { startsWith: 'EVT_' } },
      orderBy: { createdAt: 'desc' },
    });
    const events = entries.map(e => {
      try { return { id: e.id, key: e.key, ...JSON.parse(e.value) }; }
      catch { return { id: e.id, key: e.key }; }
    });
    res.json({ status: 'success', data: events });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { title, desc, location, day, month, year, time, image } = req.body;
    if (!title) return res.status(400).json({ status: 'error', message: 'title required' });
    const key = `EVT_${Date.now()}`;
    const entry = await prisma.settings.create({
      data: {
        key,
        value: JSON.stringify({ title, desc, location, day, month, year, time, image }),
        description: `Event: ${title}`
      }
    });
    res.json({ status: 'success', data: { id: entry.id, key, title, desc, location, day, month, year, time, image } });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { title, desc, location, day, month, year, time, image } = req.body;
    const entry = await prisma.settings.update({
      where: { id: req.params.id },
      data: { value: JSON.stringify({ title, desc, location, day, month, year, time, image }), description: `Event: ${title}` }
    });
    res.json({ status: 'success', data: { id: entry.id, title, desc, location, day, month, year, time, image } });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await prisma.settings.delete({ where: { id: req.params.id } });
    res.json({ status: 'success', message: 'Deleted' });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

export default router;
