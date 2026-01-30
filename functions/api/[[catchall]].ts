
import { Hono } from 'hono';
import Razorpay from 'razorpay';
import { getMongoClient } from '../lib/mongodb';
import type { Order } from '../../types';

// Define the bindings from Cloudflare's environment
type Bindings = {
  MONGODB_URI: string;
  RAZORPAY_KEY_ID: string;
  RAZORPAY_KEY_SECRET: string;
}

const app = new Hono<{ Bindings: Bindings }>();

// Endpoint to create a Razorpay order
app.post('/api/create-order', async (c) => {
  const { amount, cartItems, customerDetails } = await c.req.json();
  
  const razorpay = new Razorpay({
    key_id: c.env.RAZORPAY_KEY_ID,
    key_secret: c.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: Math.round(amount * 100), // amount in the smallest currency unit (paise)
    currency: 'INR',
    receipt: `receipt_order_${Date.now()}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    
    // Also store a temporary order in DB
    const mongo = await getMongoClient(c.env.MONGODB_URI);
    const db = mongo.db('goyaltextiles');
    const ordersCollection = db.collection<Order>('orders');
    
    const newOrder: Order = {
      razorpay_order_id: order.id,
      razorpay_payment_id: '', // To be filled upon successful payment
      amount: amount,
      status: 'created',
      items: cartItems,
      customer: customerDetails,
      createdAt: new Date(),
    };
    await ordersCollection.insertOne(newOrder);

    return c.json({
      id: order.id,
      amount: order.amount,
      keyId: c.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return c.json({ error: 'Failed to create order' }, 500);
  }
});

// Endpoint to verify payment and finalize order
app.post('/api/verify-payment', async (c) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = await c.req.json();
  
  const body = `${razorpay_order_id}|${razorpay_payment_id}`;

  // Verify the signature using Web Crypto API (available in Workers)
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(c.env.RAZORPAY_KEY_SECRET),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signatureBuffer = await crypto.subtle.sign(
    'HMAC',
    key,
    new TextEncoder().encode(body)
  );
  const expectedSignature = Array.from(new Uint8Array(signatureBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

  if (expectedSignature === razorpay_signature) {
    // Payment is authentic, update the order in the database
    try {
      const mongo = await getMongoClient(c.env.MONGODB_URI);
      const db = mongo.db('goyaltextiles');
      const ordersCollection = db.collection<Order>('orders');

      await ordersCollection.updateOne(
        { razorpay_order_id: razorpay_order_id },
        { $set: { 
            status: 'paid',
            razorpay_payment_id: razorpay_payment_id 
          } 
        }
      );

      return c.json({ status: 'success' });
    } catch(dbError) {
      console.error("Database update error:", dbError);
      return c.json({ error: 'Database error' }, 500);
    }
  } else {
    return c.json({ error: 'Invalid signature' }, 400);
  }
});


export default app;
