import express from 'express';
import { cartRouter } from './routers/cart.router.js';
import { productRouter } from './routers/product.router.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { authenticationMiddleware } from './middlewares/authentication.middleware.js';
import { initORM } from './initDb.js';
import options from './config/orm.config.js';
import { RequestContext } from '@mikro-orm/core';
import * as dotenv from 'dotenv';

dotenv.config();

export const db = await initORM(options);
const app = express();
const PORT = 8000;

app.use(express.json());
app.use((req, res, next) => RequestContext.create(db.em, next));

app.use('/api/products', authenticationMiddleware, productRouter);
app.use('/api/profile/cart', authenticationMiddleware, cartRouter);

app.use((req, res, next) => {
  res.on('finish', () => {
    db.orm.close();
  });
  next();
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
