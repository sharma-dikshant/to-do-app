import express from "express";
import { handleCreateTaskList } from "../controllers/taskList.controller";
const router = express.Router();

router.post("/", handleCreateTaskList);

export default router;
