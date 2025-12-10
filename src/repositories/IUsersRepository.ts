import type { User } from "../schemas/User.js";

export interface IUsersRepository {
  getUsers(): void;
  createUser(user: User): void;
  updateUser(user: User): void;
  deleteUser(user: User): void;
}
