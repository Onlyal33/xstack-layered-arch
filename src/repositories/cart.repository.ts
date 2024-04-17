import { v4 as uuidv4 } from 'uuid';
import type { CartEntity } from '../types/cart.entity.js';
import { AppError } from '../middlewares/errorHandler.middleware.js';

const carts: CartEntity[] = [];

export const getCarts = (): CartEntity[] => {
  return carts;
};

export const addCart = (cartWithoutId: Omit<CartEntity, 'id'>): CartEntity => {
  const cart = { ...cartWithoutId, id: uuidv4() };
  carts.push(cart);
  return cart;
};

export const getCartById = (id: string): CartEntity | undefined => {
  return carts.find((cart) => cart.id === id);
};

export const getCartByUserId = (userId: string): CartEntity | undefined => {
  return carts.find((cart) => cart.userId === userId);
};

export const updateCart = (cart: CartEntity) => {
  const index = carts.findIndex((c) => c.id === cart.id);
  if (index >= 0) {
    carts[index] = cart;
  } else {
    throw new AppError('Cart was not found', 404);
  }
};

export const deleteCart = (id: string) => {
  const index = carts.findIndex((cart) => cart.userId === id);
  if (index >= 0) {
    carts.splice(index, 1);
  } else {
    throw new AppError('Cart was not found', 404);
  }
};
