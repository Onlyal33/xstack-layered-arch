import type { ProductEntity } from '../types/product.entity.js';
import { AppError } from '../middlewares/errorHandler.middleware.js';
import {
  getProducts,
  getProductById,
  addProduct,
} from '../repositories/product.repository.js';

export const getProductsService = async (): Promise<ProductEntity[]> => {
  return getProducts();
};

export const getProductService = async (
  productId: string
): Promise<ProductEntity | undefined> => {
  const product = await getProductById(productId);
  if (!product) {
    throw new AppError('Product not found', 404);
  }

  return product;
};

export const addProductService = async (
  data: ProductEntity
): Promise<ProductEntity> => {
  const product = await addProduct(data);

  if (!product) {
    throw new AppError('Product was not created', 404);
  }

  return product;
};
