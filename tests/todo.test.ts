import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/index.js";

describe("GET /todos", () => {
  it("should return all todos", async () => {
    const response = await request(app).get("/todos");

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});