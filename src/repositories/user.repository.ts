import { User } from '../models/user.model.js';
import type { UserEntity } from '../types/user.entity.js';
import type { WithMongoId } from '../types/utility.js';

const transformUserToDto = (
  user: WithMongoId<UserEntity> | null
): UserEntity | null => {
  if (user === null) {
    return null;
  }

  return {
    id: user._id.toString(),
  };
};

export const getUsers = async (): Promise<UserEntity[] | null> => {
  return (await User.find()).map(transformUserToDto) as UserEntity[];
};

export const getUserById = async (id: string): Promise<UserEntity | null> => {
  return transformUserToDto(await User.findById(id));
};

export const addUser = async (): Promise<UserEntity | null> => {
  return transformUserToDto(await User.create({}));
};
