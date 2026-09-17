import prisma from "../lib/prisma.js";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo.types.js";

export const getTodos = async (): Promise<Todo[]> => {
  return prisma.todo.findMany();
};

export const getTodoById = async (id: number): Promise<Todo | null> => {
  return prisma.todo.findUnique({
    where: {
      id
    }
  });
};

export const createTodo = async (data: CreateTodoInput): Promise<Todo> => {
  return prisma.todo.create({
    data: {
      title: data.title,
      description: data.description ?? null,
      completed: data.completed ?? false,
      priority: data.priority ?? "medium"
    }
  });
};

export const updateTodo = async (
  id: number,
  data: UpdateTodoInput
): Promise<Todo | null> => {
  const todo = await prisma.todo.findUnique({
    where: {
      id
    }
  });

  if (!todo) {
    return null;
  }

  return prisma.todo.update({
    where: {
      id
    },
    data: {
      title: data.title,
      description: data.description ?? null,
      completed: data.completed,
      priority: data.priority
    }
  });
};

export const deleteTodo = async (id: number): Promise<Todo | null> => {
  const todo = await prisma.todo.findUnique({
    where: {
      id
    }
  });

  if (!todo) {
    return null;
  }

  return prisma.todo.delete({
    where: {
      id
    }
  });
};
