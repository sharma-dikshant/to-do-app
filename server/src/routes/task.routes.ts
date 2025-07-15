import express from "express";
import {
  handleCreate,
  handleGetAllAssignedTasks,
  handleGetAllTasks,
  handleGetAllTasksOfTaskList,
  handleSoftDeleteTask,
  handleUpdateBasicDetails,
} from "../controllers/task.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.get("/all", handleGetAllTasks);
router.get("/assigned/all", handleGetAllAssignedTasks);
router.get("/task-lists/:taskListId", handleGetAllTasksOfTaskList);
router.post("/", handleCreate);
router.patch("/details/:taskId", handleUpdateBasicDetails);
router.delete("/:taskId", handleSoftDeleteTask);

export default router;
