import { Request } from "express";
import { Types } from "mongoose";

export interface AuthenticatedRequest extends Request {
  user: {
    //TODO update to ObjectId
    _id: string;
    email?: string;
  };
}
