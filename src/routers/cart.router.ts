import express from 'express';
import {
  getCart,
  updateCart,
  emptyCart,
  checkout,
} from '../controllers/cart.controller.js';
import { validateUpdateCart } from '../middlewares/updateCart.validation.js';

export const cartRouter = express.Router();

cartRouter.get('/', getCart);
cartRouter.put('/', validateUpdateCart, updateCart);
cartRouter.delete('/', emptyCart);
cartRouter.post('/checkout', checkout);
