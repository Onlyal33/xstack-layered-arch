import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler.middleware.js';
import { Types } from 'mongoose';

const idSchema = Joi.string()
  .custom((value, helpers) => {
    if (!Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  })
  .required();

const updateCartSchema = Joi.object({
  productId: idSchema,
  count: Joi.number().integer().min(0).required(),
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
