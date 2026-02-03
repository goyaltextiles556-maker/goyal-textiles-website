
import express from 'express';
import { createOrder } from '../controllers/orderController.js';

const router = express.Router();

// This will handle POST requests to /api/create-order
router.route('/create-order').post(createOrder);

export default router;
