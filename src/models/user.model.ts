import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
import type { UserRole } from '../types/user.entity.js';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property()
  role!: UserRole;

  constructor(email: string, password: string, role: UserRole = 'user') {
    this.email = email;
    this.password = password;
    this.role = role;
  }
}
