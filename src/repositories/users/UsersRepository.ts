import type { User } from "../../schemas/User.js";
import UserModel from "../../schemas/User.js";
import type { IUsersRepository } from "./IUsersRepository.js";
import validator from "validator";

export class UsersRepository implements IUsersRepository {
  async getUsers(): Promise<User[]> {
    const result = await UserModel.find<User>().select("-password -__v");
    return result;
  }

  async createUser(user: User): Promise<any> {
    const result = await UserModel.create(user);
    return result._id!;
  }

  async updateUser(user: User): Promise<number> {
    const result = await UserModel.updateOne({ email: user.email }, user);
    return result.modifiedCount;
  }

  async deleteUser(user: User): Promise<boolean> {
    await UserModel.deleteOne({ _id: user._id! });
    return true;
  }

  async getUserByEmail(userEmail: string): Promise<User | null> {
    const result = await UserModel.findOne({ email: userEmail }).lean();
    if (!result) return null;
    return result;
  }

  isUser(user: User): boolean {
    return (
      user &&
      typeof user.name === "string" &&
      user.name.trim().length > 0 &&
      typeof user.email === "string" &&
      validator.isEmail(user.email) &&
      typeof user.password === "string" &&
      user.password.trim().length >= 6 &&
      typeof user.isDriver === "boolean" &&
      typeof user.isCustomer === "boolean"
    );
  }
}
