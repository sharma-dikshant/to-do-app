import express from "express";
import {
  handleCreateTaskList,
  handleGetAllTaskListOfUser,
} from "../controllers/taskList.controller";
import { protect } from "../controllers/auth.controller";
const router = express.Router();

router.use(protect);
router.post("/", handleCreateTaskList);
router.get("/users/:userId/all", handleGetAllTaskListOfUser);

export default router;
