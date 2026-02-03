
import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { CartItem } from '../types/types.js';

const createOrder = asyncHandler(async (req: express.Request, res: express.Response) => {
  const { cartItems, customerDetails }: { cartItems: CartItem[], customerDetails: any } = req.body;

  if (!cartItems || cartItems.length === 0) {
    res.status(400);
    throw new Error('No order items in cart');
  }

  const productIds = cartItems.map((item: CartItem) => item.product.id);
  const productsFromDB = await Product.find({ id: { $in: productIds } });
  const dbProductsMap = new Map(productsFromDB.map(p => [p.id, p]));

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
  
  const shippingPrice = itemsPrice > 0 ? 100 : 0;
  const taxPrice = itemsPrice * 0.05;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  const order = new Order({
    orderItems,
    customer: customerDetails,
    paymentMethod: 'COD',
    shippingPrice,
    taxPrice,
    totalPrice,
    status: 'Pending',
  });

  const createdOrder = await order.save();
  res.status(201).json({ success: true, orderId: createdOrder._id });
});

export { createOrder };