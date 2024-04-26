import { Entity, ManyToOne, Property, Reference } from '@mikro-orm/core';
import type { Ref } from '@mikro-orm/core';
import { Product } from './product.model.js';
import { Cart } from './cart.model.js';

@Entity()
export class CartItem {
  @ManyToOne(() => Cart, { primary: true, ref: true })
  cart!: Ref<Cart>;

  @ManyToOne(() => Product, { primary: true, ref: true })
  product!: Ref<Product>;

  @Property()
  count!: number;

  constructor(productId: string, count: number) {
    this.count = count;
    this.product = Reference.createFromPK(Product, productId);
  }
}
