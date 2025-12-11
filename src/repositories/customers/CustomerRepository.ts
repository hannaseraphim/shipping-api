import type { ICustomer } from "../../schemas/Customer.js";
import CustomerModel from "../../schemas/Customer.js";
import type { ICustomerRepository } from "./ICustomerRepository.js";
import validator from "validator";

export class CustomerRepository implements ICustomerRepository {
  async getCustomers(): Promise<ICustomer[]> {
    const result = await CustomerModel.find<ICustomer>();
    return result;
  }
  async createCustomer(customer: ICustomer): Promise<any> {
    const result = await CustomerModel.create(customer);
    return result._id;
  }
  async updateCustomer(customer: ICustomer): Promise<number> {
    const result = await CustomerModel.updateOne(
      { _id: customer._id },
      customer
    );
    return result.modifiedCount;
  }
  async deleteCustomer(customer: ICustomer): Promise<boolean> {
    await CustomerModel.deleteOne({ _id: customer._id });
    return true;
  }
  async getCustomerByEmail(email: string): Promise<ICustomer | null> {
    const result = await CustomerModel.findOne({ email: email }).lean();
    if (!result) return null;
    return result;
  }

  isCustomer(customer: ICustomer): boolean {
    return (
      customer &&
      typeof customer.name === "string" &&
      customer.name.trim().length > 0 &&
      typeof customer.email === "string" &&
      validator.isEmail(customer.email) &&
      Array.isArray(customer.addresses) &&
      customer.addresses.every(
        (addr) =>
          typeof addr.street === "string" &&
          typeof addr.number === "number" &&
          typeof addr.city === "string" &&
          typeof addr.state === "string" &&
          typeof addr.country === "string" &&
          validator.isPostalCode(addr.postal_code, "any")
      )
    );
  }
}
