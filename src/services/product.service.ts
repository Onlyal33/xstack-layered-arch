import type { ProductEntity } from '../types/product.entity.js';
import { AppError } from '../middlewares/errorHandler.middleware.js';
import {
  getProducts,
  getProductById,
} from '../repositories/product.repository.js';

export const getProductsService = (): ProductEntity[] => {
  const products = getProducts();
  return products;
};

export const getProductService = (
  productId: string
): ProductEntity | undefined => {
  const product = getProductById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
};
