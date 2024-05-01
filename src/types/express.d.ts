import { UserEntity } from './user.entity.js';

declare module 'express-serve-static-core' {
  interface Request {
    user: { id: string };
  }
}
