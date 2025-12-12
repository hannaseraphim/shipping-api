import mongoose, { Schema, type InferSchemaType } from "mongoose";
import connection from "../database/index.js";

export enum Stops {
  PENDING = "PENDING",
  IN_PROGRESS = "IN_PROGRESS",
  DELIVERED = "DELIVERED",
}

export type IStop = {
  identifier: string;
  neighbourhood: string;
  coordinates?: { lat: number; lon: number };
  sequence?: number;
  status: Stops;
};

const StopRouteSchema = new Schema({
  id_driver: { type: mongoose.Types.ObjectId, ref: "Driver" },
  id_vehicle: { type: mongoose.Types.ObjectId, ref: "Vehicle" },
  stops: [
    {
      identifier: { type: String },
      order: { type: mongoose.Types.ObjectId, ref: "Order" },
      neighbourhood: { type: String },
      coordinates: { lat: { type: Number }, lon: { type: Number } },
      sequence: { type: Number },
      status: { type: String, enum: Stops, default: Stops.PENDING },
    },
  ],
});

export type IStopRoute = InferSchemaType<typeof StopRouteSchema> & {
  _id: mongoose.Types.ObjectId;
  id_driver: mongoose.Types.ObjectId;
  id_vehicle: mongoose.Types.ObjectId;
  stops: IStop[];
};

const StopsModel = connection.model<IStopRoute>("StopRoute", StopRouteSchema);

export default StopsModel;
