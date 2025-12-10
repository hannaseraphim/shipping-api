import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import Routes from "./routes.js";

// Initialize dotenv
config();

const port = process.env.PORT;

const start = () => {
  const app = express();

  try {
    app.use(express.json());
    app.use(cookieParser());

    app.get("/", (req: express.Request, res: express.Response) => {
      res.status(200).send("Server online");
    });

    app.use("/", Routes);

    app.listen(process.env.PORT, () => {
      console.log(`[SERVER] Listening on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
