import type { OrderEntity, OrderEntityToDb } from '../types/order.entity.js';
import { Order } from '../models/order.model.js';
import type { WithMongoId, WithoutId } from '../types/utility.js';
import type { ProductEntity } from '../types/product.entity.js';
import { transformProductToDto } from './product.repository.js';

const transformOrderToDto = (
  order:
    | (WithMongoId<OrderEntity> & {
        items: { count: number; product: WithMongoId<ProductEntity> }[];
      })
    | null
): OrderEntity | null => {
  if (order === null) {
    return null;
  }

  return {
    id: order._id.toString(),
    userId: order.userId,
    cartId: order.cartId,
    items:
      order.items.map(
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
    payment: order.payment,
    delivery: order.delivery,
    comments: order.comments,
    status: order.status,
    total: order.total,
  };
};

export const addOrder = async (
  orderWithoutId: OrderEntityToDb
): Promise<OrderEntity | null> => {
  return transformOrderToDto(
    await (
      await Order.create(orderWithoutId)
    ).populate({
      path: 'items',
      populate: {
        path: 'product',
        model: 'Product',
      },
    })
  );
};
