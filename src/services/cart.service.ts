import type { CartEntity } from '../types/cart.entity.js';
import type { OrderEntity } from '../types/order.entity.js';
import {
  addCart,
  getCartByUserId,
  updateCart,
  deleteCart,
} from '../repositories/cart.repository.js';
import { createOrderService } from './order.service.js';
import { getProductById } from '../repositories/product.repository.js';
import { AppError } from '../middlewares/errorHandler.middleware.js';

export const getCartService = async (userId: string): Promise<CartEntity> => {
  let cart = await getCartByUserId(userId);
  if (!cart) {
    cart = await addCart(userId);
    if (!cart) {
      throw new AppError('Cart was not created', 400);
    }
  }

  return cart;
};

export const updateCartService = async (
  userId: string,
  updatedItems: { productId: string; count: number }
): Promise<CartEntity> => {
  const product = await getProductById(updatedItems.productId);
  if (!product) {
    throw new AppError('Products are not valid', 400);
  }

  const updatedCart = await updateCart(userId, updatedItems);
  if (!updatedCart) {
    throw new AppError('Cart was not updated', 400);
  }

  return updatedCart;
};

export const emptyCartService = async (userId: string): Promise<void> => {
  const deletedCart = await deleteCart(userId);
  if (!deletedCart) {
    throw new AppError('Cart was not found', 404);
  }
};

export const checkoutService = async (
  userId: string
): Promise<OrderEntity | null> => {
  const cart = await getCartByUserId(userId);
  if (!cart) {
    throw new AppError('Cart was not found', 404);
  }

  if (cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  const order = await createOrderService(userId, cart);
  await deleteCart(userId);
  return order;
};
