import { CreateUser, ListUsers } from "../controllers/Users.js";
import { Router } from "express";

const router = Router();

router.get("/", ListUsers);
router.post("/", CreateUser);

export default router;
