
import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { CartItem } from '../types/types.js';

// @desc    Create a new order
// @route   POST /api/create-order
// @access  Public
// FIX: Use explicit `express.Request` and `express.Response` types to avoid conflicts.
const createOrder = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { cartItems, customerDetails }: { cartItems: CartItem[], customerDetails: any } = req.body;

  if (!cartItems || cartItems.length === 0) {
    res.status(400);
    throw new Error('No order items in cart');
  }

  // --- SERVER-SIDE PRICE CALCULATION ---
  // 1. Get product IDs from the frontend cart
  const productIds = cartItems.map((item: CartItem) => item.product.id);

  // 2. Fetch those products from our database to get the real prices
  const productsFromDB = await Product.find({ id: { $in: productIds } });

  // 3. Create a map for easy lookup
  const dbProductsMap = new Map(productsFromDB.map(p => [p.id, p]));

  // 4. Calculate the total price on the server
  let itemsPrice = 0;
  const orderItems = cartItems.map((item: CartItem) => {
    const dbProduct = dbProductsMap.get(item.product.id);
    if (!dbProduct) {
      res.status(404);
      throw new Error(`Product not found: ${item.product.name}`);
    }

    const itemPrice = dbProduct.price * item.quantity;
    itemsPrice += itemPrice;

    return {
      productId: dbProduct.id,
      name: dbProduct.name,
      image: dbProduct.images[0],
      price: dbProduct.price,
      quantity: item.quantity,
      unit: dbProduct.unit,
    };
  });
  
  // Mock shipping and tax, as in frontend
  const shippingPrice = itemsPrice > 0 ? 100 : 0;
  const taxPrice = itemsPrice * 0.05;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const order = new Order({
    orderItems,
    customer: customerDetails,
    paymentMethod: 'COD', // Hardcoded as per requirements
    shippingPrice,
    taxPrice,
    totalPrice,
    status: 'Pending',
  });

  const createdOrder = await order.save();
  
  res.status(201).json({ success: true, orderId: createdOrder._id });
});

export { createOrder };