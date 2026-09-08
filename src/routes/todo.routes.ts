import { Router } from "express";
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.delete("/:id", deleteTodo);
router.post("/", createTodo);

export default router;
