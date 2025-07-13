import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { createUser } from "../services/user.service";

export const handleCreateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUser(req.body);

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);
