import {
  Entity,
  JsonType,
  ManyToOne,
  OneToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import type { Ref } from '@mikro-orm/core';
import { User } from './user.model.js';
import { Cart } from './cart.model.js';
import type { CartItemEntity } from '../types/cart.entity.js';
import type { ORDER_STATUS } from '../types/order.entity.js';

@Entity()
export class Order {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => User, { ref: true })
  user!: Ref<User>;

  @OneToOne(() => Cart)
  cart!: Ref<Cart>;

  @Property({ type: JsonType })
  items!: CartItemEntity[];

  @Property({ type: JsonType })
  payment!: {
    type: string;
    address?: any;
    creditCard?: any;
  };

  @Property({ type: JsonType })
  delivery!: {
    type: string;
    address: any;
  };

  @Property()
  comments!: string;

  @Property()
  status!: ORDER_STATUS;

  @Property()
  total!: number;

  @Property({ persist: false })
  get userId(): string {
    return this.user?.id;
  }

  @Property({ persist: false })
  get cartId(): string {
    return this.cart?.id;
  }
}
