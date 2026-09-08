import { Router } from "express";
import { getTodos, createTodo, getTodoById } from "../controllers/todo.controller.js";

const router = Router();

router.get("/", getTodos);
router.get("/:id", getTodoById);
router.post("/", createTodo);

export default router;
