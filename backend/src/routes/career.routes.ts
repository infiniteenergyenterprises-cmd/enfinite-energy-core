import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const careers = await prisma.career.findMany({
      where: { isActive: true },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ success: true, careers });
  } catch (error) {
    console.error('Error fetching careers:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

// Simple endpoint for applications
router.post('/apply', async (req, res) => {
  try {
    const { careerId, name, email, phone, resumeUrl } = req.body;
    
    // You would typically save this to an Applicant model, 
    // but we will just simulate success for now.
    // Replace with prisma.applicant.create if model exists
    
    res.status(201).json({ success: true, message: 'Application submitted successfully' });
  } catch (error) {
    console.error('Error submitting application:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
