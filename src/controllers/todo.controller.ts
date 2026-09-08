import type { Request, Response } from "express";
import {
  getTodos as getTodosService,
  createTodo as createTodoService,
  getTodoById as getTodoByIdService
} from "../services/todo.service.js";
import { createTodoSchema } from "../schemas/todo.schema.js";

export const getTodos = (req: Request, res: Response) => {
  const todos = getTodosService();

  res.json(todos);
};

export const getTodoById = (req: Request, res: Response) => {
  const paramId = req.params.id;

  if (typeof paramId !== "string") {
    return res.status(400).json({
      error: "Invalid todo id"
    });
  }

  const id = parseInt(paramId);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "Invalid todo id"
    });
  }

  const todo = getTodoByIdService(id);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  res.json(todo);
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