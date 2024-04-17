import type { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler.middleware.js';
import { findUserByIdService } from '../services/user.service.js';

export const authenticationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.headers['x-user-id'];

  if (!userId || typeof userId !== 'string') {
    return next(new AppError('User is not authorized', 401));
  }

  if (userId === 'admin') {
    return next();
  }

  const user = findUserByIdService(userId);

  if (!user) {
    return next(new AppError('You must be authorized user', 403));
  }

  req.user = user;
  next();
};
