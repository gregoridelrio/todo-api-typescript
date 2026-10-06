import { describe, it, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import jwt from "jsonwebtoken";
import app from "../src/index.js";
import prisma from "../src/lib/prisma.js";

let userAId: number;
let userBId: number;

let tokenA: string;
let tokenB: string;

let todoAId: number;

beforeAll(async () => {
  const userA = await prisma.user.create({
    data: {
      email: `user-a-${Date.now()}@example.com`,
      passwordHash: "test-password-hash",
    },
  });

  const userB = await prisma.user.create({
    data: {
      email: `user-b-${Date.now()}@example.com`,
      passwordHash: "test-password-hash",
    },
  });

  userAId = userA.id;
  userBId = userB.id;

  tokenA = jwt.sign(
    {
      sub: String(userAId),
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  tokenB = jwt.sign(
    {
      sub: String(userBId),
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "1h",
    }
  );

  const todoA = await prisma.todo.create({
    data: {
      userId: userAId,
      title: "Todo owned by user A",
      description: "Private todo",
      completed: false,
      priority: "medium",
    },
  });

  todoAId = todoA.id;
});

afterAll(async () => {
  await prisma.user.delete({
    where: {
      id: userAId,
    },
  });

  await prisma.user.delete({
    where: {
      id: userBId,
    },
  });
});

describe("Todo ownership", () => {
  it("should not allow a user to access another user's todo", async () => {
    const response = await request(app)
      .get(`/todos/${todoAId}`)
      .set("Authorization", `Bearer ${tokenB}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Todo not found");
  });

  it("should not allow a user to update another user's todo", async () => {
    const response = await request(app)
      .put(`/todos/${todoAId}`)
      .set("Authorization", `Bearer ${tokenB}`)
      .send({
        title: "Trying to update another user's todo",
        description: "This should not be allowed",
        completed: true,
        priority: "high",
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Todo not found");
  });

  it("should not allow a user to delete another user's todo", async () => {
    const response = await request(app)
      .delete(`/todos/${todoAId}`)
      .set("Authorization", `Bearer ${tokenB}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Todo not found");
  });

  it("should only return todos belonging to the authenticated user", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Authorization", `Bearer ${tokenB}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);

    const todoIds = response.body.map(
      (todo: { id: number }) => todo.id
    );

    expect(todoIds).not.toContain(todoAId);
  });
});