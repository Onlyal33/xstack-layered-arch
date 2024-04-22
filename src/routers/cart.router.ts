import express from 'express';
import {
  getCart,
  updateCart,
  emptyCart,
  checkout,
} from '../controllers/cart.controller.js';
import { validateUpdateCart } from '../middlewares/validation.middleware.js';
import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';

export const cartRouter = express.Router();

cartRouter.get('/', asyncHandler(getCart));
cartRouter.put('/', validateUpdateCart, asyncHandler(updateCart));
cartRouter.delete('/', asyncHandler(emptyCart));
cartRouter.post('/checkout', asyncHandler(checkout));
