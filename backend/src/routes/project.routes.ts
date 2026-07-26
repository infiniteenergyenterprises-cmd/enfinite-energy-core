import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const projects = await prisma.project.findMany({
      include: {
        images: true,
        category: true
      },
      orderBy: { createdAt: 'desc' },
      take: 8 // Limit to 8 for the showcase
    });
    res.status(200).json({ success: true, projects });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
