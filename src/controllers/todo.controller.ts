import type { Request, Response } from "express";
import {
  getTodos as getTodosService,
  createTodo as createTodoService
} from "../services/todo.service.js";
import { createTodoSchema } from "../schemas/todo.schema.js";

export const getTodos = (req: Request, res: Response) => {
  const todos = getTodosService();

  res.json(todos);
};

export const createTodo = (req: Request, res: Response) => {
  const result = createTodoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error
    });
  }

  const todo = createTodoService(result.data);

  res.json(todo);
};