import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import Routes from "./routes.js";
import { ConnectToDatabase } from "./database/index.js";

// Initialize dotenv
config();

const port = process.env.PORT;

const start = () => {
  const app = express();

  try {
    app.use(express.json());
    app.use(cookieParser());

    app.get("/status", (req: express.Request, res: express.Response) => {
      res.sendStatus(200);
    });

    app.use("/", Routes);

    ConnectToDatabase();

    app.listen(process.env.PORT, () => {
      console.log(`[SERVER] Listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
