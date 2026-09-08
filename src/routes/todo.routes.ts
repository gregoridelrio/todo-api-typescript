import { Router } from "express";
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.put("/:id", updateTodo);
router.post("/", createTodo);

export default router;
