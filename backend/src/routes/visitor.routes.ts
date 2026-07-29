import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

// Track a visitor
router.post('/track', async (req, res) => {
  try {
    const { path, userAgent } = req.body;
    // Get IP address
    const ipAddress = (req.headers['x-forwarded-for'] || req.socket.remoteAddress || '') as string;

    const visitor = await prisma.siteVisitor.create({
      data: {
        ipAddress: ipAddress,
        userAgent: userAgent || req.headers['user-agent'],
        path: path,
      }
    });

    res.status(200).json({ status: 'success', data: visitor });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

// Get visitor stats (for admin dashboard)
router.get('/stats', async (req, res) => {
  try {
    const totalVisits = await prisma.siteVisitor.count();
    
    // Get visits from last 24 hours
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    const todayVisits = await prisma.siteVisitor.count({
      where: {
        visitedAt: {
          gte: yesterday
        }
      }
    });

    // Get recent 10 visits
    const recentVisits = await prisma.siteVisitor.findMany({
      orderBy: { visitedAt: 'desc' },
      take: 10
    });

    res.status(200).json({ 
      status: 'success', 
      data: {
        totalVisits,
        todayVisits,
        recentVisits
      } 
    });
  } catch (error: any) {
    res.status(500).json({ status: 'error', message: error.message });
  }
});

export default router;
