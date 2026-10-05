import prisma from "../lib/prisma.js";
import type { CreateTodoInput, Todo, UpdateTodoInput } from "../types/todo.types.js";

export const getTodos = async (userId: number): Promise<Todo[]> => {
  return prisma.todo.findMany({
    where: {
      userId
    }
  });
};

export const getTodoById = async (
  userId: number,
  id: number
): Promise<Todo | null> => {
  return prisma.todo.findFirst({
    where: {
      id,
      userId
    }
  });
};

export const createTodo = async (
  userId: number,
  data: CreateTodoInput
): Promise<Todo> => {
  return prisma.todo.create({
    data: {
      userId,
      title: data.title,
      description: data.description ?? null,
      completed: data.completed ?? false,
      priority: data.priority ?? "medium"
    }
  });
};

export const updateTodo = async (
  userId: number,
  id: number,
  data: UpdateTodoInput
): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: {
      id,
      userId
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

export const deleteTodo = async (
  userId: number,
  id: number
): Promise<Todo | null> => {
  const todo = await prisma.todo.findFirst({
    where: {
      id,
      userId
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
