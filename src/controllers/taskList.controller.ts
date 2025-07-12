import { Request, Response, NextFunction } from "express";
import { creatTaskList } from "../services/taskList.service";

export const handleCreateTaskList = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const taskList = await creatTaskList(req.body);
    res.status(200).json({
      status: "success",
      data: {
        taskList,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
