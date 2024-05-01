import type { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler.middleware.js';

export const idSchema = Joi.string().uuid().required();

const updateCartSchema = Joi.object({
  productId: idSchema,
  count: Joi.number().integer().min(0).required(),
});

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().optional().valid('admin', 'user'),
});

export const validateGetProduct = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = idSchema.validate(req.params.productId);

  if (error) {
    return next(new AppError('Product is not valid', 400));
  }

  next();
};

export const validateUpdateCart = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = updateCartSchema.validate(req.body);

  if (error) {
    const errorMessage = (error?.details)
      .map((detail: any) => detail.message)
      .join(', ');
    return next(new AppError(errorMessage, 400));
  }

  next();
};

export const validateUserData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = userSchema.validate(req.body);

  if (error) {
    const errorMessage = (error?.details)
      .map((detail: any) => detail.message)
      .join(', ');
    return next(new AppError(errorMessage, 400));
  }

  next();
};