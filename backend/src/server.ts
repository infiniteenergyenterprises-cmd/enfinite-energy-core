import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import leadRoutes from './routes/lead.routes';
import projectRoutes from './routes/project.routes';
import newsRoutes from './routes/news.routes';
import careerRoutes from './routes/career.routes';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/careers', careerRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Enfinite Energy API is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
