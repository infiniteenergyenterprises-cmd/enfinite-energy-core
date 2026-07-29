import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { sendAdminNotification } from '../utils/mailer';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

// ── POST /api/leads — Create a new lead ──────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message, type } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }

    const lead = await prisma.lead.create({
      data: {
        name:    name    || 'Unknown',
        email:   email   || '',
        phone:   phone   || '',
        message: message || '',
        type:    type    || 'CONTACT',
        status: 'NEW',
      },
    });

    // Fire email asynchronously — don't block the API response
    sendAdminNotification(lead).catch(err =>
      console.error('📧 Email notification failed:', err)
    );

    return res.status(201).json({ success: true, lead });
  } catch (error) {
    console.error('❌ Error creating lead:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// ── GET /api/leads — Fetch all leads (admin only) ────────────────────────────
router.get('/', protect, authorize('ADMIN'), async (_req: Request, res: Response) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return res.json({ success: true, leads });
  } catch (error) {
    console.error('❌ Error fetching leads:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// ── PATCH /api/leads/:id — Update lead status ────────────────────────────────
router.patch('/:id', protect, authorize('ADMIN'), async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const lead = await prisma.lead.update({
      where: { id },
      data: { status },
    });
    return res.json({ success: true, lead });
  } catch (error) {
    console.error('❌ Error updating lead:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

export default router;
