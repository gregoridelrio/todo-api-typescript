import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import app from "../src/index.js";
import prisma from "../src/lib/prisma.js";

let testTodoId: number;

beforeAll(async () => {
  const todo = await prisma.todo.create({
    data: {
      title: "Test todo",
      description: "Todo created for tests",
      completed: false,
      priority: "medium",
    },
  });

  testTodoId = todo.id;
});

afterAll(async () => {
  await prisma.todo.delete({
    where: {
      id: testTodoId,
    },
  });
});

describe("GET /todos", () => {
  it("should return all todos", async () => {
    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].id).toEqual(expect.any(Number));
    expect(response.body[0]).toHaveProperty("title");
    expect(response.body[0].title).toEqual(expect.any(String));
  });
});

describe("GET /todos/:id", () => {
  it("should return a todo by id", async () => {
    const todosResponse = await request(app).get("/todos");

    const todo = todosResponse.body[0];

    expect(todo).toBeDefined();
    expect(todo.id).toEqual(expect.any(Number));

    const response = await request(app).get(`/todos/${todo.id}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(todo.id);
  });

  it("should return 404 if todo does not exist", async () => {
    const todosResponse = await request(app).get("/todos");

    const ids = todosResponse.body.map((todo: { id: number }) => todo.id);

    const nonExistentId = Math.max(...ids) + 1;

    const response = await request(app).get(`/todos/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Todo not found");
  });
});
