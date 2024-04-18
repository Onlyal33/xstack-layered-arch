import type { NextFunction, Request, Response } from 'express';

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
  console.error(err.stack);
  if (err instanceof AppError) {
    res
      .status(err.statusCode)
      .json({ data: null, error: { message: err.message } });
  } else {
    res
      .status(500)
      .json({ data: null, error: { message: 'Internal Server Error' } });
  }
};
