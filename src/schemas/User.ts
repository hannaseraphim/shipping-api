import mongoose, { Schema, type InferSchemaType } from "mongoose";
import connection from "../database/index.js";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  isDriver: { type: Boolean, required: true },
  isCustomer: { type: Boolean, required: true },
});

export type IUser = InferSchemaType<typeof UserSchema> & {
  _id: mongoose.Types.ObjectId;
};

const UserModel = connection.model<IUser>("User", UserSchema);

export default UserModel;
