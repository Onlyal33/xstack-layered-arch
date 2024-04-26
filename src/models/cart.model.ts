import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  Reference,
  t,
  type Ref,
} from '@mikro-orm/core';
import { CartItem } from './cartItem.model.js';
import { User } from './user.model.js';

@Entity()
export class Cart {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @ManyToOne(() => User, { ref: true })
  user!: Ref<User>;

  @Property()
  isDeleted!: boolean;

  @OneToMany(() => CartItem, (item) => item.cart, { orphanRemoval: true })
  items = new Collection<CartItem>(this);

  @Property({ persist: false })
  get userId(): string {
    return this.user.id;
  }

  constructor(userId: string) {
    this.user = Reference.createFromPK(User, userId);
    this.isDeleted = false;
    this.items.set([]);
  }
}
