import { Request, Response, NextFunction } from "express";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import {
  createUser,
  searchUserWithEmail,
  searchUserWithName,
} from "../services/user.service";
import APIResponse from "../utils/apiResponse";
import { AuthenticatedRequest } from "../types";

export const handleCreateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUser(req.body);
    return new APIResponse(200, "success", user).send(res);
  }
);

export const handleGetLoggedInUser = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return new APIResponse(400, "no user logged in", null).send(res);
    }
    return new APIResponse(200, "success", req.user).send(res);
  }
);

export const handleSearchUserWithEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;
    if (typeof q !== "string") {
      return new AppError("invalid email", 400);
    }
    const users = await searchUserWithEmail(q);

    return new APIResponse(200, "success", users).send(res);
  }
);

export const handleSearchUserWithName = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { q } = req.query;
    if (typeof q !== "string") {
      return new AppError("invalid Name", 400);
    }

    const users = await searchUserWithName(q);

    return new APIResponse(200, "success", users).send(res);
  }
);
