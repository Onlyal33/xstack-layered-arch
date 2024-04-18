import type { Request, Response } from 'express';
import {
  getCartService,
  updateCartService,
  emptyCartService,
  checkoutService,
} from '../services/cart.service.js';

export const getCart = (req: Request, res: Response) => {
  const cart = getCartService(req.user.id);
  res.status(200).json({ data: cart, error: null });
};

export const updateCart = (req: Request, res: Response) => {
  const updatedCart = updateCartService(req.user.id, req.body);
  res.status(200).json({ data: updatedCart, error: null });
};

export const emptyCart = (req: Request, res: Response) => {
  emptyCartService(req.user.id);
  res.status(200).json({ data: { success: true }, error: null });
};

export const checkout = (req: Request, res: Response) => {
  const order = checkoutService(req.user.id);
  res.status(200).json({ data: { order }, error: null });
};
