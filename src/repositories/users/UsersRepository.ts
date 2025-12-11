import type { IUser } from "../../schemas/User.js";
import UserModel from "../../schemas/User.js";
import type { IUsersRepository } from "./IUsersRepository.js";
import validator from "validator";

export class UsersRepository implements IUsersRepository {
  async getUsers(): Promise<IUser[]> {
    const result = await UserModel.find<IUser>().select("-password -__v");
    return result;
  }

  async createUser(user: IUser): Promise<any> {
    const result = await UserModel.create(user);
    return result._id!;
  }

  async updateUser(user: IUser): Promise<number> {
    const result = await UserModel.updateOne({ email: user.email }, user);
    return result.modifiedCount;
  }

  async deleteUser(user: IUser): Promise<boolean> {
    await UserModel.deleteOne({ _id: user._id! });
    return true;
  }

  async getUserByEmail(userEmail: string): Promise<IUser | null> {
    const result = await UserModel.findOne({ email: userEmail }).lean();
    if (!result) return null;
    return result;
  }

  isUser(user: IUser): boolean {
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
