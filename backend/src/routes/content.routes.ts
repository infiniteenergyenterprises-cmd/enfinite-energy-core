import { Router } from 'express';
import prisma from '../utils/prisma';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

// Get all page content
router.get('/', async (req, res) => {
  try {
    const contents = await prisma.pageContent.findMany();
    
    // Group by tabGroup for easy admin rendering
    const grouped = contents.reduce((acc: any, item: any) => {
      if (!acc[item.tabGroup]) acc[item.tabGroup] = [];
      acc[item.tabGroup].push(item);
      return acc;
    }, {});

    // Create a flat map for easy frontend component usage
    const flatMap = contents.reduce((acc: any, item: any) => {
      acc[item.sectionKey] = item;
      return acc;
    }, {});
    
    res.status(200).json({ status: 'success', data: contents, grouped, map: flatMap });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Upsert page content
router.put('/', protect, authorize('ADMIN'), async (req, res) => {
  try {
    const { tabGroup, sectionKey, sectionName, imageUrl, title, description } = req.body;

    if (!sectionKey || !tabGroup) {
      return res.status(400).json({ status: 'error', message: 'Missing sectionKey or tabGroup' });
    }

    const content = await prisma.pageContent.upsert({
      where: { sectionKey },
      update: {
        imageUrl: (imageUrl !== undefined && imageUrl !== '') ? imageUrl : undefined,
        title: (title !== undefined && title !== '') ? title : undefined,
        description: (description !== undefined && description !== '') ? description : undefined,
      },
      create: {
        tabGroup,
        sectionKey,
        sectionName: sectionName || sectionKey,
        imageUrl: imageUrl || null,
        title: title || null,
        description: description || null
      }
    });

    res.status(200).json({ status: 'success', data: content });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
