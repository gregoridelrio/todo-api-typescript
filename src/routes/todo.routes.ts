import { Router } from "express";
import validateTodoId from "../middlewares/validateTodoId.js";
import {
  getTodos,
  createTodo,
  getTodoById,
  updateTodo,
  deleteTodo } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", validateTodoId, getTodoById);
router.put("/:id", validateTodoId, updateTodo);
router.delete("/:id", validateTodoId, deleteTodo);
router.post("/", createTodo);

export default router;
