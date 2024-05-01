import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js';
import { Product } from '../models/product.model.js';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    em.create(User, {
      id: 'd46073bd-00ab-4649-9557-dd2301f76f92',
      email: 'admin@email.com',
      password: await bcrypt.hash('password', 10),
      role: 'admin',
    });
    em.create(Product, {
      title: 'Product 1',
      description: 'Description 1',
      price: 10,
    });
    em.create(Product, {
      title: 'Product 2',
      description: 'Description 2',
      price: 20,
    });
    em.create(Product, {
      title: 'Product 3',
      description: 'Description 3',
      price: 30,
    });
  }
}
