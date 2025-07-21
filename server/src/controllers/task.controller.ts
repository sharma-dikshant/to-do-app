import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import {
  createTask,
  getAllTask,
  deleteTask,
  updateTask,
  getDueTasksOnDate,
  getMonthTasks,
} from "../services/task.service";
import { isValidObjectId, Types } from "mongoose";
import { AuthenticatedRequest } from "../types";
import APIResponse from "../utils/apiResponse";

export const handleCreate = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const task = await createTask({ ...req.body, user: req.user._id });
    return new APIResponse(200, "success", task).send(res);
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

    return new APIResponse(200, "success", task).send(res);
  }
);

export const handleGetAllTasks = catchAsync(
  async (req: Response, res: Response, next: NextFunction) => {
    const tasks = await getAllTask({});
    return new APIResponse(200, "success", tasks).send(res);
  }
);

export const handleGetAllTasksOfTaskList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskListId } = req.params;
    if (!isValidObjectId(taskListId)) {
      return next(new AppError("invalid task list Id", 400));
    }

    const tasks = await getAllTask({ taskList: taskListId });
    return new APIResponse(200, "success", tasks).send(res);
  }
);

export const handleDeleteTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { taskId } = req.params;
    await deleteTask(taskId);

    return new APIResponse(204, "success", null).send(res);
  }
);

export const handleGetAllAssignedTasks = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const tasks = await getAllTask({ assignedTo: req.user._id });
    return new APIResponse(200, "success", tasks).send(res);
  }
);

export const handleGetDueTasks = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let date = new Date();

    if (req.query.date) {
      date = new Date(req.query.date as string);
    }

    const tasks = await getDueTasksOnDate(req.user._id, date.toISOString());

    return new APIResponse(200, "success", tasks).send(res);
  }
);

export const handleGetMonthTasks = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const { month, year } = req.params;

    const tasks = await getMonthTasks(
      req.user._id,
      Number(month),
      Number(year)
    );
    return new APIResponse(200, "success", tasks).send(res);
  }
);
