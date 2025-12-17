import { Types } from "mongoose";
import type { IStopRoute } from "../../schemas/Stops.js";
import StopsModel, { Stops } from "../../schemas/Stops.js";
import type { IStopsRepository } from "./IStopsRepository.js";

export class StopsRepository implements IStopsRepository {
  async getStop(stop: IStopRoute): Promise<IStopRoute | null> {
    const result = await StopsModel.findOne({ _id: stop._id });
    if (!result) return null;
    return result;
  }

  async listStops(): Promise<IStopRoute[]> {
    const result = await StopsModel.find();
    return result;
  }
  async createStop(stop: IStopRoute): Promise<any> {
    const result = await StopsModel.create(stop);
    return result._id;
  }
  async updateStop(stop: IStopRoute): Promise<number> {
    const result = await StopsModel.updateOne({ _id: stop._id }, stop);
    return result.modifiedCount;
  }
  isStop(stop: IStopRoute): boolean {
    return (
      !!stop &&
      Types.ObjectId.isValid(stop.id_driver) &&
      Types.ObjectId.isValid(stop.id_vehicle) &&
      Array.isArray(stop.stops) &&
      stop.stops.every(
        (stp) =>
          typeof stp.identifier === "string" &&
          stp.order &&
          Types.ObjectId.isValid(stp.order) &&
          typeof stp.neighbourhood === "string" &&
          stp.location &&
          stp.location.type === "Point" &&
          Array.isArray(stp.location.coordinates) &&
          stp.location.coordinates.length === 2 &&
          stp.location.coordinates.every((c) => typeof c === "number") &&
          (typeof stp.sequence === "number" || stp.sequence === undefined) &&
          Object.values(Stops).includes(stp.status)
      )
    );
  }
}
