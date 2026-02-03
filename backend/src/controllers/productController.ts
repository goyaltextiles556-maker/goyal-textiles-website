
import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// FIX: Use explicit `express.Request` and `express.Response` types to avoid conflicts.
const getProducts = asyncHandler(async (req: express.Request, res: express.Response) => {
  const products = await Product.find({});
  res.json(products);
});

export { getProducts };