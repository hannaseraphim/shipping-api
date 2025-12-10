import type { User } from "../schemas/User.js";

export interface IUsersRepository {
  getUsers(): Promise<User[]>;
  createUser(user: User): Promise<string>;
  updateUser(user: User): Promise<number>;
  deleteUser(user: User): Promise<boolean>;
  getUserByEmail(email: string): Promise<User | null>;
  isUser(user: User): boolean;
}
