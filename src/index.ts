import express from 'express';
import { cartRouter } from './routers/cart.router.js';
import { productRouter } from './routers/product.router.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import { authenticationMiddleware } from './middlewares/authentication.middleware.js';

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(authenticationMiddleware);

app.use('/api/products', productRouter);
app.use('/api/profile/cart', cartRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
