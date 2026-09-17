import type { Request, Response } from "express";
import {
  getTodos as getTodosService,
  createTodo as createTodoService,
  getTodoById as getTodoByIdService,
  updateTodo as updateTodoService,
  deleteTodo as deleteTodoService
} from "../services/todo.service.js";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schema.js";
import AppError from "../errors/AppError.js";

export const getTodos = async (req: Request, res: Response) => {
  const todos = await getTodosService();
  res.json(todos);
};

export const getTodoById = async (req: Request, res: Response) => {
  const todo = await getTodoByIdService(req.todoId!);

  if (!todo) {
    throw new AppError("Todo not found", 404);
  }

  res.json(todo);
};

export const updateTodo = async (req: Request, res: Response) => {
  const result = updateTodoSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError("Invalid todo data", 400, result.error.issues);
  }

  const todo = await updateTodoService(req.todoId!, result.data);

  if (!todo) {
    throw new AppError("Todo not found", 404);
  }

  res.json(todo);
}

export const createTodo = async (req: Request, res: Response) => {
  const result = createTodoSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError("Invalid todo data", 400, result.error.issues);
  }

  const todo = await createTodoService(result.data);

  res.status(201).json(todo);
};

export const deleteTodo = async (req: Request, res: Response) => {
  const todo = await deleteTodoService(req.todoId!);

  if (!todo) {
    throw new AppError("Todo not found", 404);
  }

  res.json(todo);
};
