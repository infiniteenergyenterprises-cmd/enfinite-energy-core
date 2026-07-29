import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Get all section images
router.get('/', async (req, res) => {
  try {
    const sections = await prisma.sectionImage.findMany();
    // Convert to a map for easy frontend usage { [sectionKey]: imageUrl }
    const sectionMap = sections.reduce((acc, sec) => {
      acc[sec.sectionKey] = sec.imageUrl;
      return acc;
    }, {} as Record<string, string>);
    
    res.status(200).json({ status: 'success', data: sections, map: sectionMap });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Upsert a section image (update if exists, create if not)
router.put('/', async (req, res) => {
  try {
    const { sectionKey, sectionName, imageUrl } = req.body;

    if (!sectionKey || !imageUrl) {
      return res.status(400).json({ status: 'error', message: 'Missing sectionKey or imageUrl' });
    }

    const section = await prisma.sectionImage.upsert({
      where: { sectionKey },
      update: {
        imageUrl,
        sectionName: sectionName || undefined // only update if provided
      },
      create: {
        sectionKey,
        sectionName: sectionName || sectionKey,
        imageUrl
      }
    });

    res.status(200).json({ status: 'success', data: section });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
