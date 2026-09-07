import type { Request, Response } from "express";
import {
  getTodos as getTodosService,
  createTodo as createTodoService
} from "../services/todo.service.js";

export const getTodos = (req: Request, res: Response) => {
  const todos = getTodosService();

  res.json(todos);
};

export const createTodo = (req: Request, res: Response) => {
  const todo = createTodoService(req.body);

  res.json(todo);
};