import type { Request, Response, NextFunction } from "express";

import AppError from "../errors/AppError.js";
import { Prisma } from "../generated/client.js";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      ...(err.details ? { details: err.details } : {})
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2025") {
      return res.status(404).json({
        error: "Todo not found"
      });
    }
  }

  res.status(500).json({
    error: "Internal server error"
  });
};

export default errorHandler;