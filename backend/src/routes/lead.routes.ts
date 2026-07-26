import { Router } from 'express';
import prisma from '../utils/prisma';

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, type } = req.body;
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        phone,
        message,
        type: type || 'CONTACT'
      }
    });
    res.status(201).json({ success: true, lead });
  } catch (error) {
    console.error('Error creating lead:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

export default router;
