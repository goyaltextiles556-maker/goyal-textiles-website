import dns from "dns";
// Set explicit DNS servers to bypass local DNS issues
dns.setServers(["1.1.1.1", "8.8.8.8"]);
dns.setDefaultResultOrder("ipv4first");
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import * as dotenv from 'dotenv';
import { getMongoClient } from './lib/mongodb';
import type { Order } from './types';

// Load environment variables from .env file
dotenv.config();

const app = new Hono();

// Configure CORS to allow requests from the frontend - MUST be before routes
app.use('*', cors({
  origin: '*',
  allowMethods: ['POST', 'GET', 'OPTIONS', 'HEAD', 'PUT', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization'],
}));

// API route to create an order
app.post('/api/create-order', async (c) => {
  try {
    const { amount, cartItems, customerDetails } = await c.req.json();

    if (!cartItems || cartItems.length === 0) {
      return c.json({ error: 'Cart is empty' }, 400);
    }

    const mongo = await getMongoClient(process.env.MONGODB_URI!);
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
console.log(`Backend server running on port ${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
