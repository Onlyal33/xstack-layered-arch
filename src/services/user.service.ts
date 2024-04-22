import { AppError } from '../middlewares/errorHandler.middleware.js';
import { addUser, getUserById } from '../repositories/user.repository.js';
import type { UserEntity } from '../types/user.entity.js';

export const findUserByIdService = async (id: string): Promise<UserEntity> => {
  const user = await getUserById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const createUserService = async (): Promise<UserEntity> => {
  const user = await addUser();
  if (!user) {
    throw new AppError('User was not created', 400);
  }

  return user;
};
