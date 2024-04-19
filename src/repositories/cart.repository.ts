import type { CartEntity, CartEntityToDb } from '../types/cart.entity.js';
import { Cart } from '../models/cart.model.js';
import type { WithMongoId, WithoutId } from '../types/utility.js';
import { transformProductToDto } from './product.repository.js';
import type { ProductEntity } from '../types/product.entity.js';

const transformCartToDto = (
  cart:
    | (WithMongoId<CartEntity> & {
        items: { count: number; product: WithMongoId<ProductEntity> }[];
      })
    | null
): CartEntity | null => {
  if (cart === null) {
    return null;
  }

  return {
    id: cart._id.toString(),
    userId: cart.userId,
    isDeleted: cart.isDeleted,
    items:
      cart.items.map(
        ({
          count,
          product,
        }: {
          count: number;
          product: WithMongoId<ProductEntity>;
        }) => ({
          count,
          product: transformProductToDto(product),
        })
      ) || [],
  };
};

export const getCartById = async (id: string): Promise<CartEntity | null> => {
  return transformCartToDto(
    await Cart.findById(id)
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          model: 'Product',
        },
      })
      .lean()
  );
};

export const getCartByUserId = async (
  userId: string
): Promise<CartEntity | null> => {
  return transformCartToDto(
    await Cart.findOne({ userId })
      .populate({
        path: 'items',
        populate: {
          path: 'product',
          model: 'Product',
        },
      })
      .lean()
  );
};

export const addCart = async (
  cartWithoutId: WithoutId<CartEntity>
): Promise<CartEntity | null> => {
  return transformCartToDto(
    await (
      await Cart.create(cartWithoutId)
    ).populate({
      path: 'items',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
  );
};

export const updateCart = async (
  cart: CartEntityToDb
): Promise<CartEntity | null> => {
  return transformCartToDto(
    await Cart.findByIdAndUpdate(cart.id, cart, {
      new: true,
    }).populate({
      path: 'items',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
  );
};

export const deleteCart = async (
  userId: string
): Promise<CartEntity | null> => {
  return transformCartToDto(await Cart.findOneAndDelete({ userId }));
};
