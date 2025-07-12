import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { creatTaskList } from "../services/taskList.service";

export const handleCreateTaskList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const taskList = await creatTaskList(req.body);
    res.status(200).json({
      status: "success",
      data: {
        taskList,
      },
    });
  }
);
