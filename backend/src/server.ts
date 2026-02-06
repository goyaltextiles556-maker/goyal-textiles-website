
import express, { Application } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { exit } from 'process';

// Load environment variables from .env file
dotenv.config();

const port = process.env.PORT || 3001;

const startServer = async () => {
  try {
    // Await the database connection before starting the server
    await connectDB();

    // FIX: Explicitly type `app` as `Application` to resolve type ambiguities.
    const app: Application = express();

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
    app.use('/api', orderRoutes); // Matches /api/create-order from frontend

    // Error handling middleware
    // FIX: Errors for the following lines are resolved by correctly typing the handlers in errorMiddleware.ts
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