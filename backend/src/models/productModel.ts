
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // Corresponds to the frontend product ID
  name: { type: String, required: true },
  brand: { type: String },
  description: { type: String, required: true },
  longDescription: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  unit: { type: String, required: true, enum: ['meter', 'set'] },
  category: { type: String, required: true },
  images: [{ type: String }],
  intendedUse: { type: String, required: true },
  materialDetails: { type: String, required: true },
}, {
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
