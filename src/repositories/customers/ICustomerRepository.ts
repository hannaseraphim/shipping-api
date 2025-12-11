import { type ICustomer } from "../../schemas/Customer.js";

export interface ICustomerRepository {
  getCustomers(): Promise<ICustomer[]>;
  createCustomer(customer: ICustomer): Promise<any>;
  updateCustomer(customer: ICustomer): Promise<number>;
  deleteCustomer(customer: ICustomer): Promise<boolean>;
  getCustomerByEmail(email: string): Promise<ICustomer | null>;
  isCustomer(customer: ICustomer): boolean;
}
