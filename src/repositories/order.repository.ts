import { db } from '../index.js';
import { Order } from '../models/order.model.js';
import type { OrderEntity, OrderEntityToDb } from '../types/order.entity.js';

const transformOrderToDto = (order: Order): OrderEntity => {
  return {
    id: order.id,
    userId: order.user.id,
    cartId: order.cart.id,
    items: order.items,
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
  const order = new Order();

  db.orders.assign(order, {
    ...orderWithoutId,
    user: orderWithoutId.userId,
    cart: orderWithoutId.cartId,
  });

  await db.em.persistAndFlush(order);

  return transformOrderToDto(order);
};
