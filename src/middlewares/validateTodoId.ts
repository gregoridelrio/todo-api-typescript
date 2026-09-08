import type { Request, Response, NextFunction } from "express";

const validateTodoId = (req: Request, res: Response, next: NextFunction) => {
  const paramId = req.params.id;

  if (typeof paramId !== "string") {
    return res.status(400).json({
      error: "Invalid todo id"
    });
  }

  const id = Number(paramId);

  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({
      error: "Invalid todo id"
    });
  }

  req.todoId = id;
  next();
};

export default validateTodoId;