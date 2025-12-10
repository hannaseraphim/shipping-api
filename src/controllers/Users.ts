import express from "express";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { CreateUserService } from "../services/users/CreateUser.js";

const users = new UsersRepository();

export const ListUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const row = await users.getUsers();
    if (!row) {
      return res.status(200).json({ status: 404, users: "No users found." });
    }
    return res.status(200).json({ status: 200, users: row });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: 500, message: "Internal Error" });
  }
};

export const CreateUser = async (
  req: express.Request,
  res: express.Response
) => {
  if (!req.body) {
    return res.status(400).json({ status: 400, message: "Bad request" });
  }

  try {
    const result = await CreateUserService(req.body);

    return res.status(result.status).json(result);
  } catch (error) {
    console.error("CreateUser error:", error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
};
