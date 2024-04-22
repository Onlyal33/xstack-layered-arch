import type { Types } from 'mongoose';

export type WithoutId<T> = Omit<T, 'id'>;

export type WithMongoId<T> = WithoutId<T> & { _id: Types.ObjectId };
