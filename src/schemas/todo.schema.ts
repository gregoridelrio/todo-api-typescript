import { z } from "zod";

export const createTodoSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  completed: z.boolean().optional(),
  priority: z.enum(["low", "medium", "high"]).optional()
});