import type { Request, Response, NextFunction } from "express";

const validateTodoId = (req: Request, res: Response, next: NextFunction) => {
  const paramId = req.params.id;

  if (typeof paramId !== "string") {
    return res.status(400).json({
      error: "Invalid todo id"
    });
  }

  const id = parseInt(paramId);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      error: "Invalid todo id"
    });
  }

  req.todoId = id;
  next();
};

export default validateTodoId;