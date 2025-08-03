import express from "express";
import {
  handleCreate,
  handleGetAllAssignedTasks,
  handleGetAllTasks,
  handleGetAllTasksOfTaskList,
  handleDeleteTask,
  handleUpdateBasicDetails,
  handleGetDueTasks,
  handleGetMonthTasks,
  handleAssignTaskToLocal,
} from "../controllers/task.controller";
import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.post("/", handleCreate);
router.patch("/details/:taskId", handleUpdateBasicDetails);
router.delete("/:taskId", handleDeleteTask);

router.get("/all", handleGetAllTasks);
router.get("/assigned/me", handleGetAllAssignedTasks);
router.get("/task-lists/:taskListId", handleGetAllTasksOfTaskList);
router.get("/due", handleGetDueTasks);
router.get("/year/:year/month/:month", handleGetMonthTasks);

router.post("/assign/locals/:taskId", handleAssignTaskToLocal);

export default router;
