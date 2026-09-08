import { z } from "zod";
import { createTodoSchema } from "../schemas/todo.schema.js";

export interface Todo {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
}

export type CreateTodoInput = z.infer<typeof createTodoSchema>;
