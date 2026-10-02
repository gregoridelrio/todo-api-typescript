import express from "express";
import todoRoutes from "./routes/todo.routes.js";
import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middlewares/errorHandler.js";
import authenticate from "./middlewares/authenticate.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/todos", authenticate, todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.use(errorHandler);

export default app;