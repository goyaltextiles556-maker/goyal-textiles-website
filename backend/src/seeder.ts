import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { products } from './data/products.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
import connectDB from './config/db.js';
import { argv, exit } from 'process';

dotenv.config();

await connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();

    await Product.insertMany(products);

    console.log('Data Imported!');
    // FIX: Use the imported `exit` function.
    exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    // FIX: Use the imported `exit` function.
    exit(1);
  }
};

const destroyData = async () => {
  try {
    await Product.deleteMany();
    await Order.deleteMany();

    console.log('Data Destroyed!');
    // FIX: Use the imported `exit` function.
    exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    // FIX: Use the imported `exit` function.
    exit(1);
  }
};

// FIX: Use the imported `argv` object.
if (argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
