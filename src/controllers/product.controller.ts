import type { Request, Response } from 'express';
import {
  getProductsService,
  getProductService,
} from '../services/product.service.js';

export const getProducts = (req: Request, res: Response) => {
  const products = getProductsService();
  res.status(200).json({ data: products, error: null });
};

export const getProduct = (req: Request, res: Response) => {
  const product = getProductService(req.params.productId);
  res.status(200).json({ data: product, error: null });
};
