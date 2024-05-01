import type { NextFunction, Request, Response } from 'express';
import logger from '../logger.js';

export class AppError extends Error {
  constructor(public message: string, public statusCode: number) {
    super(message);
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    logger.info(err.message, { statusCode: err.statusCode, userId: req.user?.id });

    res
      .status(err.statusCode)
      .json({ data: null, error: { message: err.message } });
  } else {
    logger.error(err.message, { name: err.name, stack: err.stack });

    res
      .status(500)
      .json({ data: null, error: { message: 'Internal Server Error' } });
  }
};
