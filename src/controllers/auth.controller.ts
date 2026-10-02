import type { Request, Response } from "express";
import { registerSchema } from "../schemas/auth.schema.js";
import { registerUser } from "../services/auth.service.js";
import AppError from "../errors/AppError.js";

export const register = async (req: Request, res: Response) => {
  const result = registerSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError("Invalid registration data", 400, result.error.issues);
  }

  const user = await registerUser(result.data);

  if (!user) {
    throw new AppError("Email already registered", 409);
  }

  res.status(201).json({
    id: user.id,
    email: user.email
  });
};
