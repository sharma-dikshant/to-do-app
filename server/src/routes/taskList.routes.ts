import express from "express";
import {
  handleCreateTaskList,
  handleGetAllDeletedListsOfUser,
  handleGetAllTaskListOfUser,
  handleRestoreTaskList,
  handleSoftDeleteTaskList,
  handleUpdateTaskList,
} from "../controllers/taskList.controller";
import { protect } from "../controllers/auth.controller";
const router = express.Router();

router.use(protect);
router.post("/", handleCreateTaskList);
router.patch("/:taskListId", handleUpdateTaskList);
router.delete("/:taskListId", handleSoftDeleteTaskList);
router.post("/restore/:taskListId", handleRestoreTaskList);
router.get("/users/:userId/all", handleGetAllTaskListOfUser);
router.get("/recycle-bin", handleGetAllDeletedListsOfUser);

export default router;
