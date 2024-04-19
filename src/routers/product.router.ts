import express from 'express';
import { getProducts, getProduct } from '../controllers/product.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { validateGetProduct } from '../middlewares/validation.middleware.js';

export const productRouter = express.Router();

productRouter.get('/', asyncHandler(getProducts));
productRouter.get('/:productId', validateGetProduct, asyncHandler(getProduct));
