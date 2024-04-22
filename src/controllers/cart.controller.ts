import type { Request, Response } from 'express';
import {
  getCartService,
  updateCartService,
  emptyCartService,
  checkoutService,
} from '../services/cart.service.js';

export const getCart = async (req: Request, res: Response) => {
  const cart = await getCartService(req.user.id);
  res.status(200).json({ data: cart, error: null });
};

export const updateCart = async (req: Request, res: Response) => {
  const updatedCart = await updateCartService(req.user.id, req.body);
  res.status(200).json({ data: updatedCart, error: null });
};

export const emptyCart = async (req: Request, res: Response) => {
  await emptyCartService(req.user.id);
  res.status(200).json({ data: { success: true }, error: null });
};

export const checkout = async (req: Request, res: Response) => {
  const order = await checkoutService(req.user.id);
  res.status(200).json({ data: { order }, error: null });
};
