import type { IUser } from "../../schemas/User.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { UsersRepository } from "../../repositories/users/UsersRepository.js";
import { config } from "dotenv";

config();

const users = new UsersRepository();

interface ServiceResponse {
  status: number;
  message: string;
  user?: IUser;
}

export const CreateUserService = async (
  user: IUser
): Promise<ServiceResponse> => {
  // Validates user type
  if (!users.isUser(user)) {
    return { status: 400, message: "User not valid" };
  }

  // Validate email
  if (!validator.isEmail(user.email)) {
    return { status: 400, message: "Email not valid" };
  }

  // Existence check
  const exists = await users.getUserByEmail(user.email);
  if (exists) {
    return { status: 409, message: "User already exists" };
  }

  // Password hashing
  const hashedPassword = await bcrypt.hash(
    user.password,
    Number(process.env.SALT_ROUNDS) || 12
  );

  // Implements the hashed password
  const payload: IUser = { ...user, password: hashedPassword };

  // Creates the user itself
  const result = await users.createUser(payload);
  return { status: 201, message: "User created", user: result };
};
