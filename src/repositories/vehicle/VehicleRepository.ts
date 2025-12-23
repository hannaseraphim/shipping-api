import type { IVehicleRepository } from "./IVehicleRepository.js";
import type { IVehicle } from "../../schemas/Vehicle.js";
import VehicleModel, { VehicleTypes } from "../../schemas/Vehicle.js";
import mongoose from "mongoose";

export class VehicleRepository implements IVehicleRepository {
  async getVehicles(): Promise<IVehicle[]> {
    const result = await VehicleModel.find<IVehicle>();
    return result;
  }
  async createVehicle(vehicle: IVehicle): Promise<any> {
    const result = await VehicleModel.create(vehicle);
    return result._id;
  }
  async updateVehicle(vehicle: IVehicle): Promise<number> {
    const result = await VehicleModel.updateOne({ _id: vehicle._id }, vehicle);
    return result.modifiedCount;
  }
  async deleteVehicle(vehicle: IVehicle): Promise<boolean> {
    const result = await VehicleModel.deleteOne({ _id: vehicle._id }, vehicle);
    return true;
  }
  isVehicle(vehicle: IVehicle): vehicle is IVehicle {
    return (
      typeof vehicle === "object" &&
      vehicle !== null &&
      typeof vehicle.plate === "string" &&
      Object.values(VehicleTypes).includes(vehicle.vehicle_type) &&
      typeof vehicle.capacity === "object" &&
      vehicle.capacity !== null &&
      typeof vehicle.capacity.max_weight === "number" &&
      typeof vehicle.capacity.max_volume === "number" &&
      mongoose.Types.ObjectId.isValid(vehicle._id)
    );
  }
}
