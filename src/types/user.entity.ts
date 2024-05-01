export interface UserEntity {
  id: string;
  email: string;
  password: string;
  role: UserRole;
}

export type UserRole = 'admin' | 'user';

export type UserToDto = Omit<UserEntity, 'password'>;
