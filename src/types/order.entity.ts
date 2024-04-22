import type { CartItemEntity, CartItemEntityToDb } from './cart.entity.js';

type ORDER_STATUS = 'created' | 'completed';

interface OrderEntityBase {
  userId: string;
  cartId: string;
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };
  delivery: {
    type: string;
    address: any;
  };
  comments: string;
  status: ORDER_STATUS;
  total: number;
}

export interface OrderEntity extends OrderEntityBase {
  id: string;
  items: CartItemEntity[];
}

export interface OrderEntityToDb extends OrderEntityBase {
  items: CartItemEntityToDb[];
}
