import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { connectDB } from './config/db.js';
import contactRoutes from './routes/contactRoutes.js';
import portfolioRoutes from './routes/portfolioRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Connect Database
connectDB();

// Security Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { success: false, message: 'Too many requests from this IP, please try again later.' }
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit contact submissions to 10 per hour per IP
  message: { success: false, message: 'Contact limit reached. Please wait a bit before sending another message.' }
});

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to API routes
app.use('/api', apiLimiter);

// API Routes
app.use('/api/contact', contactLimiter, contactRoutes);
app.use('/api/portfolio', portfolioRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Prabodh Badimi Portfolio API is running smoothly.',
    timestamp: new Date()
  });
});

// 404 Route handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'API Route not found.' });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error('[Server Error]:', err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`==================================================`);
  console.log(`  🚀 Prabodh Badimi Portfolio Backend API Active`);
  console.log(`  📡 Server Running on: http://localhost:${PORT}`);
  console.log(`  Endpoint: POST http://localhost:${PORT}/api/contact`);
  console.log(`  Endpoint: GET  http://localhost:${PORT}/api/portfolio/projects`);
  console.log(`==================================================`);
});
