import type { Request, Response } from "express";
import {
  getTodos as getTodosService,
  createTodo as createTodoService,
  getTodoById as getTodoByIdService,
  updateTodo as updateTodoService,
  deleteTodo as deleteTodoService
} from "../services/todo.service.js";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schema.js";

export const getTodos = (req: Request, res: Response) => {
  const todos = getTodosService();

  res.json(todos);
};

export const getTodoById = (req: Request, res: Response) => {
  const todo = getTodoByIdService(req.todoId!);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  res.json(todo);
};

export const updateTodo = (req: Request, res: Response) => {
  const result = updateTodoSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      error: result.error
    });
  }

  const todo = updateTodoService(req.todoId!, result.data);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  res.json(todo);
}

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

export const deleteTodo = (req: Request, res: Response) => {
  const todo = deleteTodoService(req.todoId!);

  if (!todo) {
    return res.status(404).json({
      error: "Todo not found"
    });
  }

  res.json(todo);
}