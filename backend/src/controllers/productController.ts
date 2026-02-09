
// FIX: Import the default express module and use namespaced types to avoid conflicts.
import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// FIX: Use namespaced express types to avoid conflicts with global types.
const getProducts = asyncHandler(async (req: express.Request, res: express.Response) => {
  const products = await Product.find({});
  res.json(products);
});

export { getProducts };