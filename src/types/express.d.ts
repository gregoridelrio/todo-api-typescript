import "express";

declare global {
  namespace Express {
    interface Request {
      todoId?: number;
    }
  }
}