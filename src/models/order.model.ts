import mongoose, { Schema } from 'mongoose';
import type { OrderEntity } from '../types/order.entity.js';
import { Product } from './product.model.js';
import { User } from './user.model.js';
import { Cart } from './cart.model.js';

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true, ref: User },
  cartId: { type: Schema.Types.ObjectId, required: true, ref: Cart },
  items: [
    {
      product: { type: Schema.Types.ObjectId, ref: Product, required: true },
      count: { type: Number, required: true, default: 0 },
    },
  ],
  payment: {
    type: { type: String, required: true },
    address: { type: String },
    creditCard: { type: String },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String, required: true },
  },
  comments: { type: String, required: true },
  status: { type: String, required: true, enum: ['created', 'completed'] },
  total: { type: Number, required: true, default: 0 },
});

export const Order = mongoose.model<OrderEntity>('Order', OrderSchema);
