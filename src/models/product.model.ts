import mongoose, { Schema } from 'mongoose';
import type { ProductEntity } from '../types/product.entity.js';

const ProductSchema: Schema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Product = mongoose.model<ProductEntity>('Product', ProductSchema);
