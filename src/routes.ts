import Users from "./routes/Users.js";
import { Router } from "express";

const router = Router();

router.use("/users", Users);

export default router;
