import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import {
  creatTaskList,
  getAllTaskListOfUser,
} from "../services/taskList.service";

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

export const handleGetAllTaskListOfUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    console.log(userId, "handler");
    const taskLists = await getAllTaskListOfUser(userId);

    res.status(200).json({
      status: "success",
      data: {
        taskLists,
      },
    });
  }
);
