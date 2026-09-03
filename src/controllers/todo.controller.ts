import type { Request, Response } from "express";
import { getTodos as getTodosService } from "../services/todo.service.js";

export const getTodos = (req: Request, res: Response) => {
  const todos = getTodosService();

  res.json(todos);
};