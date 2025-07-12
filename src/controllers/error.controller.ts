import { NextFunction, Request, Response } from "express";
import AppError from "../utils/appError";

const handleError = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let message = "internal server error";

  if (err instanceof AppError) {
    statusCode = err.code;
    message = err.message;
  } else if (err instanceof Error) {
    //     message = err.message;
  }

  res.status(statusCode).json({
    message,
    err,
  });
};

export default handleError;
