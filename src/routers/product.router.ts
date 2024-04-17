import express from 'express';
import { getProducts, getProduct } from '../controllers/product.controller.js';

export const productRouter = express.Router();

productRouter.get('/', getProducts);
productRouter.get('/:productId', getProduct);
