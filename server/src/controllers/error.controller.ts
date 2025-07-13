import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const handleError = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 400;
  let message = "internal server error";

  if (error instanceof AppError) {
    statusCode = error.code;
    message = error.message;
  } else if (error instanceof Error) {
        message = error.message;
  }

  res.status(statusCode).json({
    message,
    // error,
  });
};

export default handleError;
