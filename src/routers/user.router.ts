import express from 'express';
import { login, register } from '../controllers/user.controller.js';
import { asyncHandler } from '../middlewares/asyncHandler.middleware.js';
import { validateUserData } from '../middlewares/validation.middleware.js';

export const userRouter = express.Router();

userRouter.post('/register', validateUserData, asyncHandler(register));
userRouter.post('/login', validateUserData, asyncHandler(login));
