import mongoose, { Schema, type InferSchemaType } from "mongoose";
import connection from "../database/index.js";

export enum VehicleTypes {
  CAR = "CAR",
  TRUCK = "TRUCK",
  MOTORCYCLE = "MOTORCYCLE",
  VAN = "VAN",
}

const VehicleSchema = new Schema({
  plate: { type: String, required: true, unique: true },
  vehicle_type: {
    type: String,
    enum: Object.values(VehicleTypes),
    required: true,
  },
  capacity: {
    max_weight: { type: Number, required: true }, // kgs
    max_volume: { type: Number, required: true }, // lt
  },
});

export type IVehicle = InferSchemaType<typeof VehicleSchema> & {
  _id: mongoose.Types.ObjectId;
};

const VehicleModel = connection.model<IVehicle>("Vehicle", VehicleSchema);

export default VehicleModel;
