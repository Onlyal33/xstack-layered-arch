import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import type { EntityRepository, Options } from '@mikro-orm/postgresql';
import { User } from './models/user.model.js';
import { Product } from './models/product.model.js';
import { Cart } from './models/cart.model.js';
import { Order } from './models/order.model.js';
import { CartItem } from './models/cartItem.model.js';

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  products: EntityRepository<Product>;
  users: EntityRepository<User>;
  carts: EntityRepository<Cart>;
  cartItems: EntityRepository<CartItem>;
  orders: EntityRepository<Order>;
}

let cache: Services;

export const initORM = async (options?: Options): Promise<Services> => {
  if (cache) {
    return cache;
  }

  const orm = await MikroORM.init(options);

  return (cache = {
    orm,
    em: orm.em,
    products: orm.em.getRepository(Product),
    users: orm.em.getRepository(User),
    carts: orm.em.getRepository(Cart),
    cartItems: orm.em.getRepository(CartItem),
    orders: orm.em.getRepository(Order),
  });
};
