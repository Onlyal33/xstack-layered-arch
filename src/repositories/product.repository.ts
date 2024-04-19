import type { ProductEntity } from '../types/product.entity.js';
import { Product } from '../models/product.model.js';
import type { WithMongoId, WithoutId } from '../types/utility.js';

export function transformProductToDto(product: null): null;
export function transformProductToDto(
  product: WithMongoId<ProductEntity>
): ProductEntity;
export function transformProductToDto(
  product: WithMongoId<ProductEntity> | null
): ProductEntity | null {
  if (product === null) {
    return null;
  }

  return {
    id: product._id.toString(),
    title: product.title,
    description: product.description,
    price: product.price,
  };
}

export const getProducts = async (): Promise<ProductEntity[]> => {
  const products = await Product.find();
  return products.map(transformProductToDto) as ProductEntity[];
};

export const getProductById = async (
  id: string
): Promise<ProductEntity | null> => {
  return transformProductToDto(await Product.findById(id));
};

export const addProduct = async (
  product: WithoutId<ProductEntity>
): Promise<ProductEntity | null> => {
  return transformProductToDto(await Product.create(product));
};
