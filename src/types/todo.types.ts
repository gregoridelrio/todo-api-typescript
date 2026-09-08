import { z } from "zod";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schema.js";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export type CreateTodoInput = z.infer<typeof createTodoSchema>;

export type UpdateTodoInput = z.infer<typeof updateTodoSchema>;
