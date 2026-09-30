import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/index.js";

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
