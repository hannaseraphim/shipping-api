import mongoose, { type Connection } from "mongoose";
import { config } from "dotenv";

config();

const MONGO_URL = process.env.MONGO_URI || "";

mongoose.connect(MONGO_URL).then(() => {
  console.log("[DATABASE] Connected to MongoDB");
});

const connection: Connection = mongoose.connection;

export default connection;
