import mongoose, { Schema } from 'mongoose';
import type { UserEntity } from '../types/user.entity.js';

const UserSchema: Schema = new Schema({});

export const User = mongoose.model<UserEntity>('User', UserSchema);
