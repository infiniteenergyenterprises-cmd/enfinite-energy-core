import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import projectRoutes from './routes/project.routes';
import newsRoutes from './routes/news.routes';
import careerRoutes from './routes/career.routes';
import uploadRoutes from './routes/upload.routes';
import contentRoutes from './routes/content.routes';
import aiRoutes from './routes/ai.routes';
import visitorRoutes from './routes/visitor.routes';
import rssRoutes from './routes/rss.routes';
import galleryRoutes from './routes/gallery.routes';
import locationsRoutes from './routes/locations.routes';
import videosRoutes from './routes/videos.routes';

import companyNewsRoutes from './routes/company-news.routes';
import eventsRoutes from './routes/events.routes';

dotenv.config();

// Initialize Firebase
import './utils/firebase';

const app = express();

app.disable('x-powered-by'); // Hide Express header

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}));

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // limit each IP to 20 requests per windowMs
  message: { message: 'Too many login attempts, please try again later.' }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authLimiter, authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/careers', careerRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/rss', rssRoutes);
app.use('/api/gallery', galleryRoutes);
app.use('/api/locations', locationsRoutes);
app.use('/api/videos', videosRoutes);
app.use('/api/company-news', companyNewsRoutes);
app.use('/api/events', eventsRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Enfinite Energy API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
