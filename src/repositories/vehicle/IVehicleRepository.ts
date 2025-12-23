import type { IVehicle } from "../../schemas/Vehicle.js";

export interface IVehicleRepository {
  getVehicles(): Promise<IVehicle[]>;
  createVehicle(vehicle: IVehicle): Promise<IVehicle | null>;
  updateVehicle(vehicle: IVehicle): Promise<number>;
  deleteVehicle(vehicle: IVehicle): Promise<boolean>;
  isVehicle(vehicle: IVehicle): boolean;
}
