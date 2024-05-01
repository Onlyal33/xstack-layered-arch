import { Migration } from '@mikro-orm/migrations';

export class Migration20240426231138 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" add column "email" varchar(255) not null, add column "password" varchar(255) not null, add column "role" varchar(255) not null default \'user\';');
  }

  async down(): Promise<void> {
    this.addSql('alter table "user" drop column "email", drop column "password", drop column "role";');
  }

}
