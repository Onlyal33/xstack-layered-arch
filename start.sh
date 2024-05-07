#!/bin/sh
npx mikro-orm migration:up
npx mikro-orm seeder:run
pm2-runtime dist/index.js