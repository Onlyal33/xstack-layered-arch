import { v4 as uuidv4 } from 'uuid';
import type { OrderEntity } from '../types/order.entity.js';

const orders: OrderEntity[] = [];

export const addOrder = (orderWithoutId: Omit<OrderEntity, 'id'>) => {
  const id = uuidv4();
  const order = { ...orderWithoutId, id };
  orders.push(order);
  return order;
};
