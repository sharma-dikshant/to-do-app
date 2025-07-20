import { NextFunction, Request, Response } from "express";
import { promisify } from "util";
import catchAsync from "../utils/catchAsync";
import { isValidObjectId } from "mongoose";
import AppError from "../utils/appError";
import { AuthenticatedRequest } from "../types";
import { createUser, getUser } from "../services/user.service";
import APIResponse from "../utils/apiResponse";
import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";

const createToken = (data: {
  _id: string;
  name: string;
  email: string;
}): string => {
  const secret_key = process.env.JWT_SECRET_KEY;
  const exprires_in = process.env.JWT_EXPIRES_IN as SignOptions["expiresIn"];

  if (!secret_key || !exprires_in) {
    throw new Error("secret key of expires in is null");
  }

  const signOption: SignOptions = {
    expiresIn: exprires_in,
  };

  return jwt.sign(data, secret_key as Secret, signOption);
};

const setTokenToCookies = (token: string, res: Response) => {
  res.cookie("authToken", token, {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 20 * 24 * 60 * 60 * 1000,
  });
};

export const handleSignup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await createUser(req.body);
    const tokenData = {
      _id: user._id as string,
      email: user.email as string,
      name: user.name as string,
    };
    const token = createToken(tokenData);
    setTokenToCookies(token, res);
    return new APIResponse(200, "success", tokenData).send(res);
  }
);

export const handleLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("email and password is required", 400));
    }

    const user = await getUser(email);

    if (!user) {
      return next(new AppError(`user with email ${email} does not exist`, 404));
    }

    //@ts-ignore
    if (!(await user.verifyPassword(password))) {
      return next(new AppError("incorrect password or email", 400));
    }

    const tokenData = {
      _id: user._id as string,
      email: user.email as string,
      name: user.name as string,
    };

    const token = createToken(tokenData);
    setTokenToCookies(token, res);

    return new APIResponse(200, "success", tokenData).send(res);
  }
);

export const handleLogout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const token = "invalid";
    setTokenToCookies(token, res);

    return new APIResponse(200, "success", null).send(res);
  }
);

export const protect = catchAsync(
  async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string = "";

    if (req.cookies.authToken) {
      token = req.cookies.authToken;
    } else if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("please login to continue", 403));
    }

    try {
      const secret_key = process.env.JWT_SECRET_KEY;
      if (!secret_key) {
        return next(new AppError("something went wrong on server", 500));
      }

      const decoded = jwt.verify(token, secret_key) as {
        _id: string;
        email?: string;
        name?: string;
      };

      //TODO also verify the user in the token
      if (decoded) {
        req.user = {
          _id: decoded._id,
          email: decoded.email,
          name: decoded.name,
        };
      } else {
        return next(new AppError("please login again to continue", 403));
      }
    } catch (error) {
      return new APIResponse(
        403,
        "UNAUTHORIZED: please login again to continue",
        null
      ).send(res);
    }

    next();
  }
);
