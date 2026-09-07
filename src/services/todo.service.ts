import type { Todo } from "../types/todo.types.js";

export const getTodos = (): Todo[] => {
  return [
    {
      id: 1,
      title: "Learn TypeScript",
      completed: false,
    }
  ];
};