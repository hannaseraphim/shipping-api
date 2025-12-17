import type { IDriver } from "../../schemas/Driver.js";

export interface IDriverRepository {
  getDriver(driver: IDriver): Promise<IDriver | null>;
  listDrivers(): Promise<IDriver[]>;
  createDriver(driver: IDriver): Promise<any>;
  updateDriver(driver: IDriver): Promise<number>;
  isDriver(driver: IDriver): boolean;
}
