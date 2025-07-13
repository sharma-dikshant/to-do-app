import { Request, Response, NextFunction } from "express";
import catchAsync from "../utils/catchAsync";
import {
  creatTaskList,
  getAllTaskListOfUser,
} from "../services/taskList.service";
import APIResponse from "../utils/apiResponse";

export const handleCreateTaskList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const taskList = await creatTaskList(req.body);
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
