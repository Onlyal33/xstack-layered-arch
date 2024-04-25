import { db } from '../index.js';
import { Product } from '../models/product.model.js';
import type { ProductEntity } from '../types/product.entity.js';
import type { WithoutId } from '../types/utility.js';

export const getProducts = async (): Promise<ProductEntity[]> => {
  const products = await db.products.findAll();
  return products;
};

export const getProductById = async (
  id: string
): Promise<ProductEntity | null> => {
  const product = await db.products.findOne(id);
  return product;
};

export const addProduct = async (
  product: WithoutId<ProductEntity>
): Promise<ProductEntity | null> => {
  const newProduct = new Product();
  newProduct.title = product.title;
  newProduct.description = product.description;
  newProduct.price = product.price;
  db.products.create(newProduct);
  await db.em.flush();
  return newProduct;
};
