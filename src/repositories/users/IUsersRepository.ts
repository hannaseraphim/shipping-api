import { type IUser } from "../../schemas/User.js";

export interface IUsersRepository {
  getUsers(): Promise<IUser[]>;
  createUser(user: IUser): Promise<string>;
  updateUser(user: IUser): Promise<number>;
  deleteUser(user: IUser): Promise<boolean>;
  getUserByEmail(email: string): Promise<IUser | null>;
  isUser(user: IUser): boolean;
}
