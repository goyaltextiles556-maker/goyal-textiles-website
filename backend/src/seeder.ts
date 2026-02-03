import dns from 'node:dns';

// Fix DNS resolution issue for MongoDB connections
dns.setServers(["1.1.1.1"]);

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { products } from './data/products.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();

    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
