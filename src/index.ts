import express from "express";
import todoRoutes from "./routes/todo.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});