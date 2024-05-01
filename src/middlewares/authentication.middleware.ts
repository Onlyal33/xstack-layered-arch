import type { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AppError } from './errorHandler.middleware.js';

export const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    next(new AppError('User is not authorized', 401));
    return;
  }

  const [tokenType, token] = authHeader.split(' ');

  if (tokenType !== 'Bearer') {
    next(new AppError('Invalid token type', 401));
    return;
  }

  try {
    const user = jwt.verify(token, process.env.TOKEN_KEY!) as { id: string };

    req.user = user;
  } catch (error) {
    next(new AppError('You must be authorized user', 403));
    return;
  }

  next();
};
