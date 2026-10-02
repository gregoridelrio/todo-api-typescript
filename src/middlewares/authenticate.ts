import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "../errors/AppError.js";

const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.headers.authorization;

  if (!authorization || !authorization.startsWith("Bearer ")) {
    throw new AppError("Authentication required", 401);
  }

  const token = authorization.split(" ")[1];

  if (!token) {
    throw new AppError("Authentication required", 401);
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!
    ) as { sub: string };

    const userId = Number(payload.sub);

    if (!Number.isInteger(userId) || userId <= 0) {
      throw new AppError("Invalid authentication token", 401);
    }

    req.userId = userId;

    next();
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Invalid authentication token", 401);
  }
};

export default authenticate;