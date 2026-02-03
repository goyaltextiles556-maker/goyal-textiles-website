import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import * as dotenv from 'dotenv';
import { getMongoClient } from './lib/mongodb';
import type { Order } from './types';
// FIX: Import `exit` from `process` to resolve TypeScript type error for `process.exit`.
import { exit } from 'process';

// Load environment variables from .env file
dotenv.config();

const app = new Hono();

// Configure CORS to allow requests from the frontend
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
app.use('/api/*', cors({
  origin: frontendUrl,
  allowMethods: ['POST', 'GET', 'OPTIONS'],
}));

// API route to create an order
app.post('/api/create-order', async (c) => {
  try {
    const { amount, cartItems, customerDetails } = await c.req.json();

    if (!cartItems || cartItems.length === 0) {
      return c.json({ error: 'Cart is empty' }, 400);
    }

    const mongo = await getMongoClient(); // No need to pass URI here anymore
    const db = mongo.db('goyaltextiles');
    const ordersCollection = db.collection<Order>('orders');

    const newOrder: Order = {
      amount,
      status: 'placed',
      items: cartItems,
      customer: customerDetails,
      createdAt: new Date(),
    };

    const result = await ordersCollection.insertOne(newOrder);

    return c.json({ success: true, orderId: result.insertedId });
  } catch (error) {
    console.error('Error creating order:', error);
    return c.json({ error: 'Failed to create order' }, 500);
  }
});

const port = parseInt(process.env.PORT || '3001', 10);

// --- START OF NEW CONNECTION LOGIC ---
// Connect to MongoDB on startup to ensure the connection is valid.
getMongoClient(process.env.MONGODB_URI)
  .then(() => {
    // Once the database connection is successful, start the server.
    serve({
      fetch: app.fetch,
      port: port,
    });
    console.log(`Backend server running on port ${port}`);
  })
  .catch(err => {
    console.error("FATAL: Could not connect to MongoDB. Server will not start.", err);
    // FIX: Use the imported `exit` function to correct the type error.
    exit(1); // Exit the process with an error code
  });
// --- END OF NEW CONNECTION LOGIC ---