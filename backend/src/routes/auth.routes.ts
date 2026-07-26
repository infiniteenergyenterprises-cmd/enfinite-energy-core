import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';
import { protect, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);

// Example protected route
router.get('/me', protect, (req, res) => {
  res.json({ user: (req as any).user });
});

export default router;
