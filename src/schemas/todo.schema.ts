import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean().optional(),
  priority: z.enum(["low", "medium", "high"]).optional()
});

export const updateTodoSchema = z.object({
  title: z.string().trim().min(3).max(100),
  description: z.string().max(500).optional(),
  completed: z.boolean(),
  priority: z.enum(["low", "medium", "high"])
});
