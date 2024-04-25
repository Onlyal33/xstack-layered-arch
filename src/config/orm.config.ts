import type { Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { SeedManager } from '@mikro-orm/seeder';
import { Migrator } from '@mikro-orm/migrations';
import * as dotenv from 'dotenv';

dotenv.config();

const options: Options<PostgreSqlDriver> = {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  entities: ['./dist/models'], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ['./src/models'], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: './dist/migrations', // path to the folder with migrations
    pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  driver: PostgreSqlDriver,
  extensions: [Migrator, SeedManager],
  seeder: {
    path: './dist/seeders', // path to the folder with seeders
    pathTs: './src/seeders', // path to the folder with TS seeders (if used, we should put path to compiled files in `path`)
  },
};

export default options;
