import { Router, Request, Response } from 'express';
import prisma from '../utils/prisma';
import { sendAdminNotification, sendUserEventConfirmation, sendAdminAIConfirmation, sendUserSurveyConfirmation, sendUserGeneralConfirmation } from '../utils/mailer';
import { protect, authorize } from '../middlewares/auth.middleware';
import admin from '../utils/firebase';

const router = Router();

// ── POST /api/leads — Create a new lead ──────────────────────────────────────
router.post('/', async (req: Request, res: Response) => {
  try {
    const { name, email, phone, message, type } = req.body;

    if (!name) {
      return res.status(400).json({ success: false, message: 'Name is required.' });
    }

    if (phone && !/^[0-9]{10}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid 10-digit mobile number.' });
    }

    if (email || phone) {
      const existingLead = await prisma.lead.findFirst({
        where: {
          OR: [
            ...(email ? [{ email }] : []),
            ...(phone ? [{ phone }] : []),
          ],
          type: type || 'CONTACT'
        }
      });

      if (existingLead) {
        return res.status(400).json({ 
          success: false, 
          message: 'We have already received a request from you. Our team will get in touch with you shortly.' 
        });
      }
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

    console.log('✅ Lead created in DB:', lead.id, lead.type);

    // ── FIREBASE INTEGRATION FOR EVENTS ────────────────────────
    if (type === 'EVENT_REGISTRATION' && admin?.apps?.length > 0) {
      admin.firestore().collection('event_registrations').add({
        id: lead.id,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: lead.message,
        status: 'NEW',
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      }).catch(err => console.error('🔥 Firebase error:', err));
    }

    // Fire email asynchronously — don't block the API response
    console.log('📨 Sending admin notification...');
    sendAdminNotification(lead).then(res => console.log('Admin notification result:', res)).catch(err =>
      console.error('📧 Email notification failed:', err)
    );
    
    // Also send an automated email to the user if it's an event registration
    if (type === 'EVENT_REGISTRATION') {
      sendUserEventConfirmation(lead).catch(err =>
        console.error('📧 User email notification failed:', err)
      );
    }
    // Also send an automated email to the user if it's a survey request
    else if (type === 'SURVEY') {
      sendUserSurveyConfirmation(lead).catch(err =>
        console.error('📧 User survey email notification failed:', err)
      );
    } 
    // Fallback general confirmation for all other forms
    else {
      sendUserGeneralConfirmation(lead).catch(err =>
        console.error('📧 User general email notification failed:', err)
      );
    }

    return res.status(201).json({ success: true, lead });
  } catch (error) {
    console.error('❌ Error creating lead:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
});

// ── POST /api/leads/:id/confirm-email — Send AI Confirmation ─────────────────
router.post('/:id/confirm-email', protect, authorize('ADMIN'), async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;
    const lead = await prisma.lead.findUnique({ where: { id } });

    if (!lead) {
      return res.status(404).json({ success: false, message: 'Lead not found.' });
    }
    if (!lead.email) {
      return res.status(400).json({ success: false, message: 'Lead has no email address.' });
    }

    const emailSent = await sendAdminAIConfirmation(lead);

    if (emailSent) {
      // Update status to Contacted automatically
      await prisma.lead.update({ where: { id }, data: { status: 'CONTACTED' } });
      return res.json({ success: true, message: 'Confirmation email sent successfully.' });
    } else {
      return res.status(500).json({ success: false, message: 'Failed to send confirmation email.' });
    }
  } catch (error) {
    console.error('❌ Error sending confirmation email:', error);
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
    const id = req.params.id as string;
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
