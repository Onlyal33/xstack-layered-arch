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

export const getCartService = (userId: string): CartEntity => {
  let cart = getCartByUserId(userId);
  if (!cart) {
    const cartWithoutId = {
      userId,
      isDeleted: false,
      items: [],
    };
    cart = addCart(cartWithoutId);
  }

  return cart;
};

export const updateCartService = (
  userId: string,
  updatedItems: { productId: string; count: number }
): CartEntity => {
  const product = getProductById(updatedItems.productId);
  if (!product) {
    throw new AppError('Products are not valid', 400);
  }

  const cart = getCartService(userId);
  const index = cart.items.findIndex(
    (item) => item.product.id === updatedItems.productId
  );
  if (index >= 0 && updatedItems.count > 0) {
    cart.items[index].count = updatedItems.count;
  } else if (index >= 0 && updatedItems.count <= 0) {
    cart.items.splice(index, 1);
  } else if (index < 0 && updatedItems.count > 0) {
    cart.items.push({ product, count: updatedItems.count });
  }

  updateCart(cart);
  return cart;
};

export const emptyCartService = (userId: string): void => {
  deleteCart(userId);
};

export const checkoutService = (userId: string): OrderEntity => {
  const cart = getCartByUserId(userId);
  if (!cart) {
    throw new AppError('Cart was not found', 404);
  }

  if (cart.items.length === 0) {
    throw new AppError('Cart is empty', 400);
  }

  const order = createOrderService(userId, cart);
  deleteCart(userId);
  return order;
};
