import mongoose, { Schema, type InferSchemaType } from "mongoose";
import connection from "../database/index.js";

const CustomerSchema = new Schema({
  name: { type: String, required: true },
  contact: { type: String, required: true },
  phone: { type: String, required: true },
  secondary_phone: { type: String, required: true },
  email: { type: String, required: true },
  secondary_email: { type: String, required: true },
  addresses: [
    {
      street: { type: String, required: true },
      number: { type: Number, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postal_code: { type: String, required: true },
      country: { type: String, required: true },
      references: { type: String, required: false },
    },
  ],
  orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
});

export type ICustomer = InferSchemaType<typeof CustomerSchema> & {
  _id: mongoose.Types.ObjectId;
};

const CustomerModel = connection.model<ICustomer>("Customer", CustomerSchema);

export default CustomerModel;
