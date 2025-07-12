import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { createTask } from "../services/task.service";

export const handleCreateTask = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const task = await createTask(req.body);
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  }
);
