import type { IStopRoute } from "../../schemas/Stops.js";

export interface IStopsRepository {
  getStop(stop: IStopRoute): Promise<IStopRoute | null>;
  listStops(): Promise<IStopRoute[]>;
  createStop(stop: IStopRoute): Promise<any>;
  updateStop(stop: IStopRoute): Promise<number>;
  isStop(stop: IStopRoute): boolean;
}
