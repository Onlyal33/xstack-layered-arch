import { AppError } from '../middlewares/errorHandler.middleware.js';
import {
  addUser,
  getUserByEmail,
  getUserById,
} from '../repositories/user.repository.js';
import type { UserEntity, UserToDto } from '../types/user.entity.js';
import type { WithoutId } from '../types/utility.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";

export const findUserByIdService = async (id: string): Promise<UserToDto> => {
  const user = await getUserById(id);
  if (!user) {
    throw new AppError('User not found', 404);
  }

  return user;
};

export const createUserService = async (
  userData: WithoutId<UserEntity>
): Promise<UserToDto> => {
  const existingUser = await getUserByEmail(userData.email);

  if (existingUser) {
    throw new AppError('User Already Exist. Please Login', 409);
  }

  const encryptedPassword = await bcrypt.hash(userData.password, 10);

  const user = await addUser({ ...userData, password: encryptedPassword });
  if (!user) {
    throw new AppError('User was not created', 400);
  }

  return user;
};

export const loginService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<string> => {
  const user = await getUserByEmail(email);

  if (!(user && (await bcrypt.compare(password, user.password)))) {
    throw new AppError('No user with such email or password', 401);
  }

  const token = jwt.sign(
    { id: user.id },
    process.env.TOKEN_KEY!,
    {
        expiresIn: "2h",
    }
);

  return token;
};
