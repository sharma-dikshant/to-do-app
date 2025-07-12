import express from "express";
import { handleCreateTask } from "../controllers/task.controller";

const router = express.Router();

router.post("/", handleCreateTask);

export default router;
