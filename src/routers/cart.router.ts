import express from 'express';
import {
  checkout,
  emptyCart,
  getCart,
  updateCart,
} from '../controllers/cart.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { authorizationMiddleware } from '../middlewares/authorization.middleware.js';
import { validateUpdateCart } from '../middlewares/validation.middleware.js';

export const cartRouter = express.Router();

cartRouter.get('/', asyncHandler(getCart));
cartRouter.put('/', validateUpdateCart, asyncHandler(updateCart));
cartRouter.delete('/', authorizationMiddleware, asyncHandler(emptyCart));
cartRouter.post('/checkout', asyncHandler(checkout));
