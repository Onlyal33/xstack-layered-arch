import type { CartEntity } from '../types/cart.entity.js';
import type { OrderEntity } from '../types/order.entity.js';
import { addOrder } from '../repositories/order.repository.js';

export const createOrderService = (
  userId: string,
  cart: CartEntity
): OrderEntity => {
  const orderWithoutId: Omit<OrderEntity, 'id'> = {
    userId,
    cartId: cart.id,
    items: cart.items,
    payment: {
      type: 'paypal',
    },
    delivery: {
      type: 'post',
      address: undefined,
    },
    comments: '',
    status: 'created',
    total: cart.items.reduce(
      (acc, item) => acc + item.product.price * item.count,
      0
    ),
  };
  const order = addOrder(orderWithoutId);
  return order;
};
