import { type IOrder } from "../../schemas/Order.js";

export interface IOrderRepository {
  getOrder(order: IOrder): Promise<IOrder | null>;
  listOrders(): Promise<IOrder[]>;
  createOrder(order: IOrder): Promise<any>;
  updateOrder(order: IOrder): Promise<number>;
  isOrder(order: IOrder): Promise<boolean>;
}
