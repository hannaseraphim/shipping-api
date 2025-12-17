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
  location: {
    type: "Point";
    coordinates: [number, number];
  };
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
      location: {
        type: {
          type: String,
          enum: ["Point"],
          required: true,
        },
        coordinates: {
          type: [Number],
          required: true,
        },
      },
      sequence: { type: Number },
      status: { type: String, enum: Stops, default: Stops.PENDING },
    },
  ],
});

StopRouteSchema.index({ "stops.location": "2dsphere" });

export type IStopRoute = InferSchemaType<typeof StopRouteSchema> & {
  _id: mongoose.Types.ObjectId;
  id_driver: mongoose.Types.ObjectId;
  id_vehicle: mongoose.Types.ObjectId;
  stops: IStop[];
};

const StopsModel = connection.model<IStopRoute>("StopRoute", StopRouteSchema);

export default StopsModel;
