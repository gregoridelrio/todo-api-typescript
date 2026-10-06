import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../src/index.js";

describe("POST /auth/register", () => {
  it("should register a new user", async () => {
    const email = `test-${Date.now()}@example.com`;

    const response = await request(app)
      .post("/auth/register")
      .send({
        email,
        password: "Test1234!",
      });

    expect(response.status).toBe(201);

    expect(response.body).toHaveProperty("id");
    expect(response.body.id).toEqual(expect.any(Number));

    expect(response.body.email).toBe(email);

    expect(response.body).not.toHaveProperty("passwordHash");
  });

  it("should return 409 if email is already registered", async () => {
    const email = `test-${Date.now()}@example.com`;

    await request(app)
      .post("/auth/register")
      .send({
        email,
        password: "Test1234!",
      });

    const response = await request(app)
      .post("/auth/register")
      .send({
        email,
        password: "Test1234!",
      });

    expect(response.status).toBe(409);
    expect(response.body.error).toBe("Email already registered");
  });
});

describe("POST /auth/login", () => {
  it("should login with valid credentials", async () => {
    const email = `test-${Date.now()}@example.com`;
    const password = "Test1234!";

    await request(app)
      .post("/auth/register")
      .send({
        email,
        password,
      });

    const response = await request(app)
      .post("/auth/login")
      .send({
        email,
        password,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body.token).toEqual(expect.any(String));
  });

  it("should return 401 with invalid credentials", async () => {
    const email = `test-${Date.now()}@example.com`;

    await request(app)
      .post("/auth/register")
      .send({
        email,
        password: "Test1234!",
      });

    const response = await request(app)
      .post("/auth/login")
      .send({
        email,
        password: "WrongPassword123!",
      });

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid email or password");
  });
});

describe("Authentication", () => {
  it("should return 401 when accessing todos without a token", async () => {
    const response = await request(app)
      .get("/todos");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Authentication required");
  });

  it("should return 401 with an invalid token", async () => {
    const response = await request(app)
      .get("/todos")
      .set("Authorization", "Bearer invalid-token");

    expect(response.status).toBe(401);
    expect(response.body.error).toBe("Invalid authentication token");
  });
});