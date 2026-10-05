import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { registerUser, loginUser } from "../services/auth.service.js";
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

export const login = async (req: Request, res: Response) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError("Invalid login data", 400, result.error.issues);
  }

  const user = await loginUser(result.data);

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      sub: String(user.id)
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h"
    }
  );

  res.json({
    token
  });
};
