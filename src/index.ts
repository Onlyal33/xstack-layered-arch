import express from 'express';
import { cartRouter } from './routers/cart.router.js';
import { productRouter } from './routers/product.router.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { authenticationMiddleware } from './middlewares/authentication.middleware.js';
import { initORM } from './initDb.js';
import options from './config/orm.config.js';
import { RequestContext } from '@mikro-orm/core';
import * as dotenv from 'dotenv';
import { userRouter } from './routers/user.router.js';
import { Socket } from 'node:net';

dotenv.config();

export const db = await initORM(options);
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use((req, res, next) => RequestContext.create(db.em, next));

app.use('/api/auth', userRouter);
app.use('/api/products', authenticationMiddleware, productRouter);
app.use('/api/profile/cart', authenticationMiddleware, cartRouter);

app.use((req, res, next) => {
  res.on('finish', () => {
    db.orm.close();
  });
  next();
});

app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

let connections: Socket[] = [];

server.on('connection', (connection) => {
  connections.push(connection);

  connection.on('close', () => {
    connections = connections.filter(
      (currentConnection) => currentConnection !== connection
    );
  });
});

function shutdown() {
  console.log('Received kill signal, shutting down gracefully');

  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error(
      'Could not close connections in time, forcefully shutting down'
    );
    process.exit(1);
  }, Number(process.env.SERVER_SHUTDOWN_TIMEOUT) || 20000);

  connections.forEach((connection) => connection.end());

  setTimeout(() => {
    connections.forEach((connection) => connection.destroy());
  }, Number(process.env.CONNECTION_CLOSE_TIMEOUT) || 10000);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
