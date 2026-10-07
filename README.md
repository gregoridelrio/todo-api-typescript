# Todo API

A RESTful API built with TypeScript, Express, Prisma, and MySQL for managing personal todo lists with user authentication and authorization.

## About the Project

This project is a backend REST API developed as a learning and portfolio project to practice building a structured API with TypeScript and Node.js.

The API provides user registration and authentication, todo management, input validation, ownership protection, centralized error handling, automated integration tests, and interactive API documentation with Swagger.

Each authenticated user can only access and manage their own todos.

## Features

* User registration
* User login with JWT authentication
* Password hashing with bcrypt
* Todo CRUD operations
* Todo ownership authorization
* Request validation with Zod
* Centralized error handling
* Structured API error responses
* MySQL database integration with Prisma
* Database migrations
* Integration testing with Vitest and Supertest
* Interactive API documentation with Swagger UI
* Separate test database configuration

## Tech Stack

### Backend

* TypeScript
* Node.js
* Express 5
* Prisma 7
* MySQL

### Authentication & Validation

* JSON Web Tokens
* bcryptjs
* Zod

### Testing

* Vitest
* Supertest

### API Documentation

* Swagger JSDoc
* Swagger UI Express

### Development

* tsx
* dotenv

## Project Structure

```text
todo-api-typescript/
├── prisma/
│   ├── migrations/
│   └── schema.prisma
│
├── src/
│   ├── config/
│   │   └── swagger.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── todo.controller.ts
│   ├── docs/
│   │   ├── auth.docs.ts
│   │   └── todo.docs.ts
│   ├── errors/
│   │   └── AppError.ts
│   ├── lib/
│   │   └── prisma.ts
│   ├── middlewares/
│   │   ├── authenticate.ts
│   │   ├── errorHandler.ts
│   │   └── validateTodoId.ts
│   ├── routes/
│   │   ├── auth.routes.ts
│   │   └── todo.routes.ts
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   └── todo.schema.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── todo.service.ts
│   ├── types/
│   │   ├── express.d.ts
│   │   └── todo.types.ts
│   ├── index.ts
│   └── server.ts
│
├── tests/
│   ├── auth.test.ts
│   ├── ownership.test.ts
│   └── todo.test.ts
│
├── .env
├── .env.test
├── package.json
├── prisma.config.ts
└── tsconfig.json
```

## Requirements

Before running the project, make sure you have installed:

* Node.js 22+
* npm
* MySQL

## Installation

Clone the repository:

```bash
git clone https://github.com/gregoridelrio/todo-api-typescript.git
```

Navigate into the project directory:

```bash
cd todo-api-typescript
```

Install dependencies:

```bash
npm install
```

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="mysql://root@localhost:3306/todo_api"
DATABASE_HOST="localhost"
DATABASE_USER="root"
DATABASE_NAME="todo_api"
JWT_SECRET="your-secret-key"
```

For running the test suite, create a separate `.env.test` file:

```env
DATABASE_URL="mysql://root@localhost:3306/todo_api_test"
DATABASE_HOST="localhost"
DATABASE_USER="root"
DATABASE_NAME="todo_api_test"
JWT_SECRET="your-test-secret-key"
```

The test environment uses a separate database to keep test data isolated from the development database.

These files contain local configuration and should not be committed to the repository.

## Database Setup

Make sure MySQL is running and that the databases configured in your environment files are available.

Apply the Prisma migrations:

```bash
npx prisma migrate dev
```

Generate the Prisma Client:

```bash
npx prisma generate
```

The generated Prisma Client is stored in:

```text
src/generated/
```

To check the current migration status:

```bash
npx prisma migrate status
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The API will be available at:

```text
http://localhost:3000
```

The root endpoint can be used as a basic health check:

```text
GET /
```

## Running Tests

The project uses Vitest and Supertest for integration testing.

Run the complete test suite with:

```bash
npm test
```

Tests use the separate `todo_api_test` database configured through `.env.test`.

The test suite covers authentication, todo CRUD operations, validation, error handling, and todo ownership authorization.

## API Documentation

Interactive API documentation is available through Swagger UI:

```text
http://localhost:3000/api-docs
```

The documentation includes:

* Authentication endpoints
* Todo endpoints
* Request parameters
* Request bodies
* Response examples
* HTTP status codes
* Bearer authentication requirements

## Authentication

The API uses JWT bearer authentication.

### Register

```http
POST /auth/register
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Login

```http
POST /auth/login
```

Example request:

```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

A successful login returns a JWT access token:

```json
{
  "token": "your-jwt-token"
}
```

Authenticated todo requests must include the token in the `Authorization` header:

```text
Authorization: Bearer <token>
```

## API Endpoints

### Authentication

| Method | Endpoint         | Description         | Authentication |
| ------ | ---------------- | ------------------- | -------------- |
| POST   | `/auth/register` | Register a new user | No             |
| POST   | `/auth/login`    | Authenticate a user | No             |

### Todos

| Method | Endpoint     | Description                        | Authentication |
| ------ | ------------ | ---------------------------------- | -------------- |
| GET    | `/todos`     | Get the authenticated user's todos | Yes            |
| GET    | `/todos/:id` | Get a specific todo                | Yes            |
| POST   | `/todos`     | Create a new todo                  | Yes            |
| PUT    | `/todos/:id` | Update a todo                      | Yes            |
| DELETE | `/todos/:id` | Delete a todo                      | Yes            |

## Todo Data

A todo contains:

* `id`
* `userId`
* `title`
* `description`
* `completed`
* `priority`

The available priority values are:

```text
low
medium
high
```

## Error Handling

The API uses centralized error handling through an Express middleware.

Application errors are returned using a structured format with an error message and error code.

Example:

```json
{
  "error": "Todo not found",
  "code": "TODO_NOT_FOUND"
}
```

Validation errors can also include detailed validation information:

```json
{
  "error": "Invalid todo data",
  "code": "INVALID_TODO_DATA",
  "details": []
}
```

The API uses appropriate HTTP status codes for different error conditions, including:

* `400` — Invalid request data
* `401` — Authentication required or invalid credentials
* `404` — Resource not found
* `409` — Resource conflict
* `500` — Internal server error

## Project Architecture

The application separates responsibilities into different layers:

* **Routes** — Define API endpoints and middleware flow.
* **Controllers** — Handle HTTP requests and responses.
* **Services** — Contain business logic and database operations.
* **Schemas** — Validate incoming request data.
* **Middlewares** — Handle authentication, parameter validation, and errors.
* **Prisma** — Provides database access and migrations.
* **Tests** — Verify API behavior through integration tests.

This structure keeps HTTP handling, validation, business logic, and database access separated and easier to maintain.

## Future Improvements

Possible future improvements include:

* Pagination for todo lists
* Filtering and sorting
* Additional automated test coverage
* Production deployment
* CI/CD integration

## License

This project is intended as a personal learning and portfolio project.
