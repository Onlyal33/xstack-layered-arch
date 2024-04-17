import { getUserById } from '../repositories/user.repository.js';

export const findUserByIdService = (id: string) => {
  return getUserById(id);
};
