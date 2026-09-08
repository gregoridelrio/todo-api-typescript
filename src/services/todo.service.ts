import type { CreateTodoInput, Todo } from "../types/todo.types.js";

let nextId = 2;

const todos: Todo[] = [
  {
    id: 1,
    title: "Learn TypeScript",
    completed: false,
    priority: "medium"
  }
];

export const getTodos = (): Todo[] => {
  return todos;
};

export const getTodoById = (id: number): Todo | undefined => {
  return todos.find((todo) => todo.id === id);
};

export const createTodo = (data: CreateTodoInput): Todo => {
  const todo: Todo = {
    id: nextId,
    title: data.title,
    ...(data.description ? { description: data.description } : {}),
    completed: data.completed ?? false,
    priority: data.priority ?? "medium"
  };

  nextId++;
  todos.push(todo);

  return todo;
};