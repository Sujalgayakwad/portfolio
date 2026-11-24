import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ extended: true, limit: '15mb' }));

// Static file serving for uploads and assets
const uploadsDir = path.join(rootDir, 'public/uploads');
const assetsDir = path.join(rootDir, 'public/assets');

if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir, { recursive: true });
if (!fs.existsSync(assetsDir)) fs.mkdirSync(assetsDir, { recursive: true });

app.use('/uploads', express.static(uploadsDir));
app.use('/assets', express.static(assetsDir));

// Route Imports
import authRoutes from './routes/authRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import messageRoutes from './routes/messageRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Mount API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    dbState: mongoose.connection.readyState === 1 ? 'mongodb_connected' : 'local_persistence_active'
  });
});

// Optional MongoDB connection attempt (non-blocking)
const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/portfolio_cms';
mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 })
  .then(() => {
    console.log('✅ MongoDB connected successfully to', mongoUri);
  })
  .catch(() => {
    console.log('ℹ️  MongoDB not running locally — Using unified local JSON persistence engine (store.json). All data will persist smoothly.');
  });

app.listen(PORT, () => {
  console.log(`🚀 Cyber.Sujal Backend CMS API running on http://localhost:${PORT}`);
  console.log(`🛡️  Admin API ready with token authentication`);
});
