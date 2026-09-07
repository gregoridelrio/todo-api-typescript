import type { CreateTodoInput, Todo } from "../types/todo.types.js";

export const getTodos = (): Todo[] => {
  return [
    {
      id: 1,
      title: "Learn TypeScript",
      completed: false,
      priority: "medium"
    }
  ];
};

export const createTodo = (data: CreateTodoInput): Todo => {
  return {
    id: 1,
    title: data.title,
    completed: data.completed,
    priority: data.priority
  };
};