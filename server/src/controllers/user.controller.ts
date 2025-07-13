import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { createUser } from "../services/user.service";
import APIResponse from "../utils/apiResponse";

export const handleCreateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUser(req.body);
    return new APIResponse(200, "success", user).send(res);
  }
);
