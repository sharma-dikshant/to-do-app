import express from "express";
import { handleCreateUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/", handleCreateUser);

export default router;
