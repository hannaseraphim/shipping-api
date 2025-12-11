import mongoose, { Schema, type InferSchemaType } from "mongoose";
import connection from "../database/index.js";

export enum DeliveryStatus {
  PROCESSING = "PROCESSING",
  TRANSIT = "TRANSIT",
  DELIVERY = "DELIVERY",
  DELIVERED = "DELIVERED",
  FAILED_ATTEMPT = "FAILED_ATTEMPT",
}

const OrderSchema = new Schema(
  {
    id_customer: { type: mongoose.Types.ObjectId, ref: "Customer" },
    id_driver: { type: mongoose.Types.ObjectId, ref: "Driver" },
    id_vehicle: { type: mongoose.Types.ObjectId, ref: "Vehicle" },
    product: [
      {
        id_product: { type: mongoose.Types.ObjectId, ref: "Product" },
        weight: { type: Number },
        size: { type: String },
      },
    ],
    current_status: {
      type: String,
      enum: Object.values(DeliveryStatus),
      default: DeliveryStatus.PROCESSING,
    },
    current_location: {
      type: String,
      required: true,
    },
    history: [
      {
        location: { type: String, required: true },
        status: {
          type: String,
          enum: Object.values(DeliveryStatus),
          default: DeliveryStatus.PROCESSING,
        },
        date: { type: Date },
      },
    ],
    current_delivery_date: { type: Date, default: null },
    estimated_delivery_date: { type: Date },
    tracking_code: { type: String },
  },
  { timestamps: true }
);

export type IOrder = InferSchemaType<typeof OrderSchema> & {
  _id: mongoose.Types.ObjectId;
  current_status: DeliveryStatus;
  history: { location: string; status: DeliveryStatus; date?: Date }[];
};

const OrderModel = connection.model<IOrder>("Order", OrderSchema);

export default OrderModel;
