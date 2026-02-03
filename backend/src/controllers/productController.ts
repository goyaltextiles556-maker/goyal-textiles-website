
import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

const getProducts = asyncHandler(async (req: express.Request, res: express.Response) => {
  const products = await Product.find({});
  res.json(products);
});

export { getProducts };