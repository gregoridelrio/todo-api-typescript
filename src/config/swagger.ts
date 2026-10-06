import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Todo API",
    version: "1.0.0",
    description: "REST API for managing todos"
  },
  components: {
    schemas: {
      Todo: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          userId: {
            type: "integer",
            example: 1
          },
          title: {
            type: "string",
            example: "Learn TypeScript"
          },
          description: {
            type: "string",
            nullable: true,
            example: "Complete the Todo API project"
          },
          completed: {
            type: "boolean",
            example: false
          },
          priority: {
            type: "string",
            enum: ["low", "medium", "high"],
            example: "high"
          }
        }
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            example: 1
          },
          email: {
            type: "string",
            format: "email",
            example: "user@example.com"
          }
        }
      },
      LoginResponse: {
        type: "object",
        properties: {
          token: {
            type: "string",
            example: "eyJhbGciOiJIUzI1NiIs..."
          }
        }
      }
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  }
};

const options = {
  definition: swaggerDefinition,
  apis: ["./src/docs/*.docs.ts"]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;