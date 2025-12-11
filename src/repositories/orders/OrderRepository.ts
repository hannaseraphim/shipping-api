import mongoose from "mongoose";
import type { IOrder } from "../../schemas/Order.js";
import OrderModel, { DeliveryStatus } from "../../schemas/Order.js";
import { type IOrderRepository } from "./IOrderRepository.js";

export class OrderRepository implements IOrderRepository {
  async getOrder(order: IOrder): Promise<IOrder | null> {
    const result = await OrderModel.findOne({ _id: order._id });
    return result;
  }

  async listOrders(): Promise<IOrder[]> {
    const result = await OrderModel.find<IOrder>();
    return result;
  }

  async createOrder(order: IOrder): Promise<any> {
    const result = await OrderModel.create(order);
    return result;
  }

  async updateOrder(order: IOrder): Promise<number> {
    const result = await OrderModel.updateOne({ _id: order._id }, order);
    return result.modifiedCount;
  }

  async isOrder(order: IOrder): Promise<boolean> {
    return (
      order &&
      // Verifica IDs principais
      mongoose.isValidObjectId(order.id_customer) &&
      mongoose.isValidObjectId(order.id_driver) &&
      mongoose.isValidObjectId(order.id_vehicle) &&
      // Verifica produtos
      Array.isArray(order.product) &&
      order.product.every(
        (p) =>
          mongoose.isValidObjectId(p.id_product) &&
          (typeof p.weight === "number" || p.weight === undefined) &&
          (typeof p.size === "string" || p.size === undefined)
      ) &&
      // Verifica status atual
      typeof order.current_status === "string" &&
      Object.values(DeliveryStatus).includes(order.current_status) &&
      // Verifica localização atual
      typeof order.current_location === "string" &&
      order.current_location.trim().length > 0 &&
      // Verifica histórico
      Array.isArray(order.history) &&
      order.history.every(
        (h) =>
          typeof h.location === "string" &&
          h.location.trim().length > 0 &&
          typeof h.status === "string" &&
          Object.values(DeliveryStatus).includes(h.status) &&
          (h.date instanceof Date || h.date === undefined)
      ) &&
      // Verifica datas
      (order.current_delivery_date instanceof Date ||
        order.current_delivery_date === null ||
        order.current_delivery_date === undefined) &&
      (order.estimated_delivery_date instanceof Date ||
        order.estimated_delivery_date === undefined) &&
      // Verifica código de rastreio
      (typeof order.tracking_code === "string" ||
        order.tracking_code === undefined)
    );
  }
}
