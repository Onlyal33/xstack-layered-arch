import { Entity, PrimaryKey } from '@mikro-orm/core';

@Entity()
export class User {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'gen_random_uuid()' })
  id!: string;
}
