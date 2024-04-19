import mongoose, { Schema } from 'mongoose';
import type { CartEntity } from '../types/cart.entity.js';
import { Product } from './product.model.js';

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  isDeleted: { type: Boolean, required: true },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: Product, required: true },
      count: { type: Number, required: true, default: 0 },
    },
  ],
});

export const Cart = mongoose.model<CartEntity>('Cart', CartSchema);
