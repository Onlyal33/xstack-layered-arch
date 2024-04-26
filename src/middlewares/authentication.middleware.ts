import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.middleware.js';
import { findUserByIdService } from '../services/user.service.js';
import { idSchema } from './validation.middleware.js';

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id'];

  if (
    !userId ||
    typeof userId !== 'string' ||
    idSchema.validate(userId).error)
  {
    next(new AppError('User is not authorized', 401));
    return;
  }

  if (userId === 'admin') {
    return next();
  }
  try {
    const user = await findUserByIdService(userId);
    if (!user) {
      next(new AppError('You must be authorized user', 403));
      return;
    }

    req.user = user;
  } catch (error) {
    next(new AppError('You must be authorized user', 403));
    return;
  }

  next();
};
