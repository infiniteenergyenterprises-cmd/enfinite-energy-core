import { Router } from 'express';
import prisma from '../utils/prisma';
import { fetchLiveNews } from '../services/newsService';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const news = await prisma.news.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: 'desc' },
      take: 8 // Limit to 8
    });
    res.status(200).json({ success: true, news });
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Get live RSS news
router.get('/live', async (req, res) => {
  try {
    const liveNews = await fetchLiveNews();
    res.status(200).json({ success: true, news: liveNews });
  } catch (error) {
    console.error('Error fetching live news:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch live news' });
  }
});

export default router;
