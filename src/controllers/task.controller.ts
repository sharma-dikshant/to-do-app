import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import {
  createTask,
  getAllTask,
  getAllTaskOfTaskList,
  softDeleteTask,
  updateTask,
} from "../services/task.service";
import { isValidObjectId, Types } from "mongoose";
import { AuthenticatedRequest } from "../types";

export const handleCreate = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const task = await createTask({ ...req.body, user: req.user._id });
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  }
);

export const handleUpdateBasicDetails = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;

    if (!isValidObjectId(taskId)) {
      return next(new AppError("Invalid Task Id", 400));
    }

    interface UpdateTaskInput {
      description?: string;
      complete?: boolean;
      dueDate?: Date;
      assignedTo?: Types.ObjectId;
    }

    let updateData: UpdateTaskInput = {};
    if (req.body.description) {
      updateData.description = req.body.description;
    }

    if (typeof req.body.complete === "boolean") {
      updateData.complete = req.body.complete;
    }

    if (req.body.dueDate) {
      updateData.dueDate = req.body.dueDate;
    }

    if (req.body.assignedTo) {
      updateData.assignedTo = req.body.assignedTo;
    }

    const task = await updateTask(req.params.taskId, updateData);

    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  }
);

export const handleGetAllTasks = catchAsync(
  async (req: Response, res: Response, next: NextFunction) => {
    const tasks = await getAllTask();
    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  }
);

export const handleGetAllTasksOfTaskList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskListId } = req.params;
    if (!isValidObjectId(taskListId)) {
      return next(new AppError("invalid task list Id", 400));
    }

    const tasks = await getAllTaskOfTaskList(taskListId);
    res.status(200).json({
      status: "success",
      data: {
        tasks,
      },
    });
  }
);

export const handleSoftDeleteTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    await softDeleteTask(taskId);

    res.status(204).json({
      status: "success",
    });
  }
);
