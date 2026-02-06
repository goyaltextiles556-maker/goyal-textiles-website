
// FIX: Import explicit types from express to resolve type conflicts
import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
// FIX: Use explicit Request and Response types to avoid conflicts.
const getProducts = asyncHandler(async (req: Request, res: Response) => {
  const products = await Product.find({});
  res.json(products);
});

export { getProducts };