import type { IDriver } from "../../schemas/Driver.js";
import DriverModel from "../../schemas/Driver.js";
import type { IDriverRepository } from "./IDriverRepository.js";

export class DriverRepositorty implements IDriverRepository {
  async getDriver(driver: IDriver): Promise<IDriver | null> {
    const result = await DriverModel.findOne({ _id: driver._id });
    if (!result) return null;
    return result;
  }
  async listDrivers(): Promise<IDriver[]> {
    const result = await DriverModel.find();
    return result;
  }
  async createDriver(driver: IDriver): Promise<any> {
    const result = await DriverModel.create(driver);
    return result._id;
  }
  async updateDriver(driver: IDriver): Promise<number> {
    const result = await DriverModel.updateOne({ _id: driver._id }, driver);
    return result.modifiedCount;
  }
  isDriver(driver: IDriver): boolean {
    return (
      driver &&
      typeof driver.active === "boolean" &&
      driver.name === "string" &&
      driver.name.trim().length > 0 &&
      driver.vehicles.every((vehicle) => typeof vehicle.id !== null)
    );
  }
}
