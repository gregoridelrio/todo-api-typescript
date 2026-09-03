import type { Request, Response } from "express";

export const getTodos = (req: Request, res: Response) => {
  res.json({
    message: "Todo list"
  });
};