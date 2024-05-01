import type { Request, Response } from 'express';
import {
  createUserService,
  loginService,
} from '../services/user.service.js';

export const register = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  res.status(201).json({ data: user, error: null });
};

export const login = async (req: Request, res: Response) => {
  const token = await loginService(req.body);
  res.status(200).json({ data: { token }, error: null });
};
