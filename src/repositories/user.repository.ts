import type { UserEntity } from '../types/user.entity.js';

const users: UserEntity[] = [{ id: '0fe36d16-49bc-4aab-a227-f84df899a6cb' }];

export const getUsers = (): UserEntity[] => {
  return users;
};

export const addUser = (user: UserEntity) => {
  users.push(user);
};

export const getUserById = (id: string): UserEntity | undefined => {
  return users.find((user) => user.id === id);
};
