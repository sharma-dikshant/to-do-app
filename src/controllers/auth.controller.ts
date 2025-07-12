import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import { isValidObjectId } from "mongoose";
import AppError from "../utils/appError";
import { AuthenticatedRequest } from "../types";

export const protect = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    //TODO  hard coded user
    req.user = { _id: "687211c6b451258d5cc9b045" };
    next();
  }
);
