import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { AppError } from './errorHandler.middleware.js';

const updateCartSchema = Joi.object({
  productId: Joi.string().uuid().required(),
  count: Joi.number().integer().min(0).required(),
});

export const validateUpdateCart = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const { error } = updateCartSchema.validate(req.body);

  if (error) {
    const errorMessage = error.details
      .map((detail: any) => detail.message)
      .join(', ');
    return next(new AppError(errorMessage, 400));
  }

  next();
};
