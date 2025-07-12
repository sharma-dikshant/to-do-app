import { Request, Response, NextFunction } from "express";
import { createTask } from "../services/task.service";

export const handleCreateTask = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const task = await createTask(req.body);
    res.status(200).json({
      status: "success",
      data: {
        task,
      },
    });
  } catch (error: any) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};
