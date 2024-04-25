import { db } from '../index.js';
import { Cart } from '../models/cart.model.js';
import { CartItem } from '../models/cartItem.model.js';
import type { CartEntity, CartItemEntityToDb } from '../types/cart.entity.js';

const transformCartToDto = (cart: Cart): CartEntity => {
  return {
    id: cart.id,
    userId: cart.user.id,
    isDeleted: cart.isDeleted,
    items:
      cart.items.map(({ count, product }) => ({
        count,
        product: product.getEntity(),
      })) || [],
  };
};

export const getCartByUserId = async (
  userId: string
): Promise<CartEntity | null> => {
  const cart = await db.carts.findOne(
    { userId, isDeleted: false },
    { populate: ['items', 'items.product'] }
  );
  if (!cart) {
    return null;
  }

  return transformCartToDto(cart);
};

export const addCart = async (userId: string): Promise<CartEntity | null> => {
  const cart = new Cart(userId);

  await db.em.persistAndFlush(cart);

  return transformCartToDto(cart);
};

export const updateCart = async (
  userId: string,
  updatedItems: CartItemEntityToDb
): Promise<CartEntity | null> => {
  const cart = await db.carts.findOne(
    { userId, isDeleted: false },
    { populate: ['items', 'items.product'] }
  );

  if (!cart) {
    return null;
  }

  const item = cart.items.find(
    (item) => item.product?.id === updatedItems.productId
  );

  if (item && updatedItems.count > 0) {
    item.count = updatedItems.count;
  } else if (item && updatedItems.count <= 0) {
    cart.items.remove(item);
  } else if (!item && updatedItems.count > 0) {
    cart.items.add(new CartItem(updatedItems.productId, updatedItems.count));
  }

  await db.em.flush();

  return transformCartToDto(cart);
};

export const deleteCart = async (
  userId: string
): Promise<CartEntity | null> => {
  const cart = await db.carts.findOne(
    { userId, isDeleted: false },
    { populate: ['items', 'items.product'] }
  );

  if (!cart) {
    return null;
  }

  cart.isDeleted = true;
  await db.em.flush();

  return transformCartToDto(cart);
};
