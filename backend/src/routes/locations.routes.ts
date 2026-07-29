import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// GET all locations (from Settings model using key prefix LOC_*)
// We store locations as Settings entries: key=LOC_<city>, value=JSON
router.get('/', async (req, res) => {
  try {
    const entries = await prisma.settings.findMany({
      where: { key: { startsWith: 'LOC_' } },
      orderBy: { createdAt: 'asc' },
    });
    const locations = entries.map(e => {
      try { return { id: e.id, key: e.key, ...JSON.parse(e.value) }; }
      catch { return { id: e.id, key: e.key, city: e.key, state: '', activeProjects: 0, status: 'Active' }; }
    });
    res.json({ status: 'success', data: locations });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// POST create location
router.post('/', async (req, res) => {
  try {
    const { city, state, activeProjects, status } = req.body;
    if (!city) return res.status(400).json({ status: 'error', message: 'city required' });
    const key = `LOC_${city.toUpperCase().replace(/\s+/g, '_')}_${Date.now()}`;
    const entry = await prisma.settings.create({
      data: {
        key,
        value: JSON.stringify({ city, state: state || '', activeProjects: activeProjects || 0, status: status || 'Active' }),
        description: `Location: ${city}`
      }
    });
    res.json({ status: 'success', data: { id: entry.id, key, city, state, activeProjects, status } });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// DELETE location
router.delete('/:id', async (req, res) => {
  try {
    await prisma.settings.delete({ where: { id: req.params.id } });
    res.json({ status: 'success', message: 'Deleted' });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// PUT update location
router.put('/:id', async (req, res) => {
  try {
    const { city, state, activeProjects, status } = req.body;
    const entry = await prisma.settings.update({
      where: { id: req.params.id },
      data: {
        value: JSON.stringify({ city, state, activeProjects, status }),
        description: `Location: ${city}`
      }
    });
    res.json({ status: 'success', data: { id: entry.id, city, state, activeProjects, status } });
  } catch (e: any) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

export default router;
