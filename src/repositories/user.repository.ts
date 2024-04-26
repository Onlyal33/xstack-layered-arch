import { db } from '../index.js';
import { User } from '../models/user.model.js';
import type { UserEntity } from '../types/user.entity.js';

export const getUsers = async (): Promise<UserEntity[] | null> => {
  const users = await db.users.findAll();
  return users;
};

export const getUserById = async (id: string): Promise<UserEntity | null> => {
  const user = await db.users.findOne(id);
  return user;
};

export const addUser = async (): Promise<UserEntity | null> => {
  const user = new User();
  db.users.create(user);
  await db.em.flush();
  return user;
};
