import { UserEntity } from './types';

declare module 'express-serve-static-core' {
  interface Request {
    user?: UserEntity;
  }
}
