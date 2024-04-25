import type { CartEntity } from '../types/cart.entity.js';
import type { OrderEntity, OrderEntityToDb } from '../types/order.entity.js';
import { addOrder } from '../repositories/order.repository.js';
import { AppError } from '../middlewares/errorHandler.middleware.js';

export const createOrderService = async (
  userId: string,
  cart: CartEntity
): Promise<OrderEntity> => {
  const orderWithoutId: OrderEntityToDb = {
    userId,
    cartId: cart.id,
    items: cart.items.map((item) => ({
      productId: item.product?.id,
      count: item.count,
    })),
    payment: {
      type: 'paypal',
    },
    delivery: {
      type: 'post',
      address: 'some address',
    },
    comments: 'some comments',
    status: 'created',
    total: cart.items.reduce(
      (acc, item) => acc + item.product.price * item.count,
      0
    ),
  };
  const order = await addOrder(orderWithoutId);
  if (!order) {
    throw new AppError('Order was not created', 400);
  }

  return order;
};
