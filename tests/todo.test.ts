import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/index.js";
import prisma from "../src/lib/prisma.js";

let testUserId: number;
let authToken: string;
let testTodoId: number;
let createdTodoId: number;

beforeAll(async () => {
  const user = await prisma.user.create({
    data: {
      email: `test-${Date.now()}@example.com`,
      passwordHash: "test-password-hash",
    },
  });

  testUserId = user.id;

  authToken = jwt.sign(
    {
      sub: String(testUserId),
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  const todo = await prisma.todo.create({
    data: {
      userId: testUserId,
      title: "Test todo",
      description: "Todo created for tests",
      completed: false,
      priority: "medium",
    },
  });

  testTodoId = todo.id;
});

afterAll(async () => {
  await prisma.user.delete({
    where: {
      id: testUserId,
    },
  });
});

describe("GET /todos", () => {
  it("should return all todos", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${authToken}`);

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
    const todosResponse = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${authToken}`);

    const todo = todosResponse.body[0];

    expect(todo).toBeDefined();
    expect(todo.id).toEqual(expect.any(Number));

    const response = await request(app)
      .get(`/todos/${todo.id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(todo.id);
  });

  it("should return 404 if todo does not exist", async () => {
    const todosResponse = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${authToken}`);

    const ids = todosResponse.body.map(
      (todo: { id: number }) => todo.id
    );

    const nonExistentId = Math.max(...ids) + 1;

    const response = await request(app)
      .get(`/todos/${nonExistentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Todo not found");
  });
});

describe("POST /todos", () => {
  it("should create a new todo", async () => {
    const response = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Test POST todo",
        description: "Created with integration test",
        completed: false,
        priority: "high",
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");

    expect(response.body.title).toBe("Test POST todo");
    expect(response.body.description).toBe("Created with integration test");
    expect(response.body.completed).toBe(false);
    expect(response.body.priority).toBe("high");

    createdTodoId = response.body.id;

    const createdTodo = await prisma.todo.findUnique({
      where: {
        id: response.body.id,
      },
    });

    expect(createdTodo).not.toBeNull();
    expect(createdTodo?.title).toBe("Test POST todo");
    expect(createdTodo?.description).toBe("Created with integration test");
    expect(createdTodo?.completed).toBe(false);
    expect(createdTodo?.priority).toBe("high");
  });

  it("should return 400 if todo data is invalid", async () => {
    const response = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Hi",
        description: "Invalid todo",
        completed: false,
        priority: "high",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid todo data");
    expect(response.body).toHaveProperty("details");
    expect(response.body.details).toBeInstanceOf(Array);
  });

  it("should return 400 if priority is invalid", async () => {
    const response = await request(app)
      .post("/todos")
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Valid todo",
        description: "Invalid priority",
        completed: false,
        priority: "urgent",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid todo data");
    expect(response.body).toHaveProperty("details");
    expect(response.body.details).toBeInstanceOf(Array);
  });
});

describe("PUT /todos/:id", () => {
  it("should update an existing todo", async () => {
    const response = await request(app)
      .put(`/todos/${testTodoId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Updated todo",
        description: "Updated description",
        completed: true,
        priority: "high",
      });

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(testTodoId);
    expect(response.body.title).toBe("Updated todo");
    expect(response.body.description).toBe("Updated description");
    expect(response.body.completed).toBe(true);
    expect(response.body.priority).toBe("high");

    const updatedTodo = await prisma.todo.findUnique({
      where: {
        id: testTodoId,
      },
    });

    expect(updatedTodo).not.toBeNull();
    expect(updatedTodo?.title).toBe("Updated todo");
    expect(updatedTodo?.description).toBe("Updated description");
    expect(updatedTodo?.completed).toBe(true);
    expect(updatedTodo?.priority).toBe("high");
  });

  it("should return 404 if todo does not exist", async () => {
    const todosResponse = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${authToken}`);

    const ids = todosResponse.body.map(
      (todo: { id: number }) => todo.id
    );

    const nonExistentId = Math.max(...ids) + 1;

    const response = await request(app)
      .put(`/todos/${nonExistentId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Updated todo",
        description: "Updated description",
        completed: true,
        priority: "high",
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Todo not found");
  });

  it("should return 400 if todo data is invalid", async () => {
    const response = await request(app)
      .put(`/todos/${testTodoId}`)
      .set("Authorization", `Bearer ${authToken}`)
      .send({
        title: "Hi",
        description: "Invalid todo",
        completed: false,
        priority: "high",
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid todo data");
    expect(response.body).toHaveProperty("details");
    expect(response.body.details).toBeInstanceOf(Array);
  });
});

describe("DELETE /todos/:id", () => {
  it("should delete an existing todo", async () => {
    const todo = await prisma.todo.create({
      data: {
        userId: testUserId,
        title: "Todo to delete",
        description: "This todo will be deleted",
        completed: false,
        priority: "medium",
      },
    });

    const response = await request(app)
      .delete(`/todos/${todo.id}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(todo.id);
    expect(response.body.title).toBe("Todo to delete");
    expect(response.body.description).toBe("This todo will be deleted");
    expect(response.body.completed).toBe(false);
    expect(response.body.priority).toBe("medium");

    const deletedTodo = await prisma.todo.findUnique({
      where: {
        id: todo.id,
      },
    });

    expect(deletedTodo).toBeNull();
  });

  it("should return 404 if todo does not exist", async () => {
    const todosResponse = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${authToken}`);

    const ids = todosResponse.body.map(
      (todo: { id: number }) => todo.id
    );

    const nonExistentId = Math.max(...ids) + 1;

    const response = await request(app)
      .delete(`/todos/${nonExistentId}`)
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Todo not found");
  });

  it("should return 400 if todo id is invalid", async () => {
    const response = await request(app)
      .delete("/todos/invalid")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid todo id");
  });

  it("should return 400 if todo id is zero", async () => {
    const response = await request(app)
      .delete("/todos/0")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid todo id");
  });

  it("should return 400 if todo id is negative", async () => {
    const response = await request(app)
      .delete("/todos/-1")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid todo id");
  });

  it("should return 400 if todo id is not an integer", async () => {
    const response = await request(app)
      .delete("/todos/1.5")
      .set("Authorization", `Bearer ${authToken}`);

    expect(response.status).toBe(400);
    expect(response.body.error).toBe("Invalid todo id");
  });
});
