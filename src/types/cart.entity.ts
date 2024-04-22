import type { ProductEntity } from './product.entity.js';

export interface CartItemEntity {
  product: ProductEntity;
  count: number;
}

export interface CartEntity {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntity[];
}

export interface CartItemEntityToDb {
  product: string;
  count: number;
}

export interface CartEntityToDb {
  id: string;
  userId: string;
  isDeleted: boolean;
  items: CartItemEntityToDb[];
}
