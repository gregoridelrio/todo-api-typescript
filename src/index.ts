import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import authenticate from "./middlewares/authenticate.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/auth", authRoutes);
app.use("/todos", authenticate, todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.use(errorHandler);

export default app;