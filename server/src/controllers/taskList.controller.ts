import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import {
  creatTaskList,
  getAllDeletedListOfUser,
  getAllTaskListOfUser,
  getInActiveTaskList,
  getTaskList,
  restoreTaskList,
  softDeleteTaskList,
  updateTaskList,
} from "../services/taskList.service";
import APIResponse from "../utils/apiResponse";
import { AuthenticatedRequest } from "../types";
import AppError from "../utils/appError";
import {
  getAllTask,
  getAllTaskIncludeInactive,
} from "../services/task.service";

export const handleCreateTaskList = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const taskList = await creatTaskList({ ...req.body, user: req.user._id });
    return new APIResponse(200, "success", taskList).send(res);
  }
);

export const handleGetAllTaskListOfUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const taskLists = await getAllTaskListOfUser(userId);
    return new APIResponse(200, "success", taskLists).send(res);
  }
);

export const handleUpdateTaskList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskListId } = req.params;
    const taskList = await updateTaskList(taskListId, req.body);
    return new APIResponse(200, "success", taskList).send(res);
  }
);

export const handleSoftDeleteTaskList = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { taskListId } = req.params;
    const taskList = await getTaskList(taskListId);

    if (!taskList) {
      return next(new AppError("now list found with given id", 400));
    }
    if (taskList.user.toString() !== req.user._id) {
      return next(new AppError("you can only delete your lists", 403));
    }

    // before deleting mark all tasks of this list as inactive
    const tasks = await getAllTask({ taskList: taskListId });
    for (let task of tasks) {
      task.active = false;
      await task.save();
    }

    // now delete the tasklist

    await softDeleteTaskList(taskListId);
    return new APIResponse(204, "success", null).send(res);
  }
);

export const handleRestoreTaskList = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { taskListId } = req.params;

    const taskList = await getInActiveTaskList(taskListId);
    if (!taskList) {
      return next(new AppError("no list found with given id", 404));
    }

    if (taskList.user._id.toString() !== req.user._id) {
      return next(new AppError("you can only restore your lists", 403));
    }

    // restore all tasks of this list
    const tasks = await getAllTaskIncludeInactive({ taskList: taskListId });
    for (let task of tasks) {
      task.active = true;
      await task.save();
    }

    // now restore
    await restoreTaskList(taskListId);
    return new APIResponse(200, "success", null).send(res);
  }
);

export const handleGetAllDeletedListsOfUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const taskLists = await getAllDeletedListOfUser(req.user._id);

    return new APIResponse(200, "success", taskLists).send(res);
  }
);
