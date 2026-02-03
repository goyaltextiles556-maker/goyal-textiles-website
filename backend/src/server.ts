import dns from 'node:dns';
dns.setServers(["1.1.1.1"]);

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { exit } from 'process';

dotenv.config();

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    await connectDB();

    const app: express.Application = express();

    // Enable CORS
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    app.use(cors({
      origin: frontendUrl,
      methods: ['POST', 'GET', 'OPTIONS'],
    }));

    // Body parser middleware
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get('/', (req, res) => {
      res.send('API is running...');
    });

    // API Routes
    app.use('/api/products', productRoutes);
    app.use('/api', orderRoutes);

    // Error handling middleware
    app.use(notFound);
    app.use(errorHandler);

    app.listen(port, () => {
      console.log(`Backend server running on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to start server due to database connection error.");
    exit(1);
  }
}

startServer();
