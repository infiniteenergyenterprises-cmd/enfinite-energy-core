import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

/* GET all active careers */
router.get('/', async (req, res) => {
  try {
    const careers = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, careers });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

/* GET all (including inactive) — for admin */
router.get('/all', async (req, res) => {
  try {
    const careers = await prisma.career.findMany({ orderBy: { createdAt: 'desc' } });
    res.status(200).json({ success: true, careers });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

/* POST create career */
router.post('/', async (req, res) => {
  try {
    const { title, department, location, type, description, requirements, benefits, isActive, experience, salary } = req.body;
    if (!title || !department || !location || !type) {
      return res.status(400).json({ success: false, message: 'title, department, location, type required' });
    }
    const career = await prisma.career.create({
      data: {
        title,
        department,
        location,
        type,
        description: description || '',
        requirements: requirements || [],
        benefits:     benefits     || [],
        isActive:     isActive !== undefined ? isActive : true,
        // store extra fields in description as JSON suffix
      }
    });
    // Save experience + salary in a settings key so we don't need schema migration
    if (experience || salary) {
      await prisma.settings.upsert({
        where: { key: `CAREER_META_${career.id}` },
        update: { value: JSON.stringify({ experience, salary }) },
        create: { key: `CAREER_META_${career.id}`, value: JSON.stringify({ experience, salary }), description: `Meta for career ${career.id}` }
      });
    }
    res.status(201).json({ success: true, career: { ...career, experience, salary } });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

/* PUT update career */
router.put('/:id', async (req, res) => {
  try {
    const { title, department, location, type, description, requirements, benefits, isActive, experience, salary } = req.body;
    const career = await prisma.career.update({
      where: { id: req.params.id },
      data: {
        title, department, location, type,
        description: description || '',
        requirements: requirements || [],
        benefits:     benefits     || [],
        isActive:     isActive !== undefined ? isActive : true,
      }
    });
    if (experience || salary) {
      await prisma.settings.upsert({
        where: { key: `CAREER_META_${career.id}` },
        update: { value: JSON.stringify({ experience, salary }) },
        create: { key: `CAREER_META_${career.id}`, value: JSON.stringify({ experience, salary }), description: `Meta for career ${career.id}` }
      });
    }
    res.status(200).json({ success: true, career: { ...career, experience, salary } });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

/* DELETE career */
router.delete('/:id', async (req, res) => {
  try {
    await prisma.career.delete({ where: { id: req.params.id } });
    await prisma.settings.deleteMany({ where: { key: `CAREER_META_${req.params.id}` } });
    res.status(200).json({ success: true, message: 'Deleted' });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

/* POST apply */
router.post('/apply', async (req, res) => {
  try {
    res.status(201).json({ success: true, message: 'Application submitted successfully' });
  } catch (e: any) {
    res.status(500).json({ success: false, message: e.message });
  }
});

export default router;
