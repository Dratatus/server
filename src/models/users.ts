import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'Admin' | 'Developer' | 'DevOps';

export interface Passwords {
  password: string;
  email: string;
}

export interface IUser extends Document {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  passwords: Passwords;
  avatar: string;
}

const UserSchema: Schema = new Schema({
  id: { type: Number, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  role: { type: String, required: true },
  passwords: {
    email: { type: String, required: true },
    password: { type: String, required: true }
  },
  avatar: { type: String, required: false }
});

export const User = mongoose.model<IUser>('User', UserSchema);
