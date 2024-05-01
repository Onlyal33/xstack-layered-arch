import { db } from '../index.js';
import { User } from '../models/user.model.js';
import type { UserEntity, UserToDto } from '../types/user.entity.js';
import type { WithoutId } from '../types/utility.js';

const transformUserToDto = (user: User): UserToDto => {
  return {
    id: user.id,
    email: user.email,
    role: user.role,
  };
}

export const getUsers = async (): Promise<UserToDto[] | null> => {
  const users = await db.users.findAll();
  return users.map(transformUserToDto);
};

export const getUserById = async (id: string): Promise<UserToDto | null> => {
  const user = await db.users.findOne(id);
  if (!user) {
    return null;
  }

  return transformUserToDto(user);
};

export const getUserByEmail = async (
  email: string
): Promise<UserEntity | null> => {
  const user = await db.users.findOne({ email });
  if (!user) {
    return null;
  }

  return user;
};

export const addUser = async (
  userData: WithoutId<UserEntity>
): Promise<UserToDto | null> => {
  const user = new User(userData.email, userData.password, userData.role);

  await db.em.persistAndFlush(user);

  return transformUserToDto(user);
};
