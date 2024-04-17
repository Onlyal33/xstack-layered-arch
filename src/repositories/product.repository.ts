import type { ProductEntity } from '../types/product.entity.js';

const products: ProductEntity[] = [
  {
    id: '40516cb5-ecf3-4045-b737-c59f114a958b',
    title: 'Product 1',
    description: 'Description 1',
    price: 10,
  },
  {
    id: 'b636a57e-5080-4514-bbd0-469957098ac4',
    title: 'Product 2',
    description: 'Description 2',
    price: 20,
  },
  {
    id: 'f2f1a8a9-3fe4-4285-910e-3d816c3ae57a',
    title: 'Product 3',
    description: 'Description 3',
    price: 30,
  },
];

export const getProducts = (): ProductEntity[] => {
  return products;
};

export const getProductById = (id: string): ProductEntity | undefined => {
  return products.find((product) => product.id === id);
};
