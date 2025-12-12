import mongoose, { Schema, type InferSchemaType } from "mongoose";
import connection from "../database/index.js";

const DriverSchema = new Schema({
  name: { type: String, required: true },
  employed_at: { type: Date, required: true },
  vehicles: [
    {
      id: { type: Schema.Types.ObjectId, ref: "Vehicle" },
    },
  ],
  active: { type: Boolean, required: true, default: true },
});

export type IDriver = InferSchemaType<typeof DriverSchema> & {
  _id: mongoose.Types.ObjectId;
};

const DriverModel = connection.model<IDriver>("Driver", DriverSchema);

export default DriverModel;
