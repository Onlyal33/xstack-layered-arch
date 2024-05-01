import type { NextFunction, Request, Response } from 'express';
import { getUserById } from '../repositories/user.repository.js';
import { AppError } from './errorHandler.middleware.js';

export const authorizationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.user?.id;

  if (!userId) {
    next(new AppError('User is not authorized', 401));
    return;
  }

  const user = await getUserById(userId);

  if (!user) {
    next(new AppError('User not found', 404));
    return;
  }

  if (user.role !== 'admin') {
    next(new AppError('Only admins can delete user cart', 403));
    return;
  }

  next();
};
