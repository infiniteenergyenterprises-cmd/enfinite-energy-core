import express, { Request, Response } from 'express';
import { fetchLiveNews, RSS_FEEDS } from '../services/newsService';

const router = express.Router();

// GET /api/rss/solar  — returns latest solar news from all feeds
router.get('/solar', async (_req: Request, res: Response) => {
  try {
    const force = _req.query.refresh === '1';
    const articles = await fetchLiveNews(force);
    return res.json({
      status:  'success',
      count:   articles.length,
      cached:  !force,
      data:    articles,
    });
  } catch (err: any) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
});

// GET /api/rss/feeds  — returns the list of configured RSS feeds
router.get('/feeds', (_req: Request, res: Response) => {
  return res.json({ status: 'success', data: RSS_FEEDS });
});

export default router;
