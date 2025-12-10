import mongoose, { Schema } from "mongoose";
import connection from "../database/index.js";

export interface User {
  _id?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  password: string;
  isDriver: boolean;
  isCustomer: boolean;
}

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true,  },
  isDriver: { type: Boolean, required: true },
  isCustomer: { type: Boolean, required: true },
});

const UserModel = connection.model("User", UserSchema);

export default UserModel;
