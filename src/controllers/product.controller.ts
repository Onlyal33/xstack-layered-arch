import type { Request, Response } from 'express';
import {
  getProductsService,
  getProductService,
} from '../services/product.service.js';

export const getProducts = async (req: Request, res: Response) => {
  const products = await getProductsService();
  res.status(200).json({ data: products, error: null });
};

export const getProduct = async (req: Request, res: Response) => {
  const product = await getProductService(req.params.productId);
  res.status(200).json({ data: product, error: null });
};
