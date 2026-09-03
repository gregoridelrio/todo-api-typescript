import express from "express";
import todoRoutes from "./routes/todo.routes.js";

const app = express();

app.use("/todos", todoRoutes);

app.get("/", (req, res) => {
  res.send("Todo API is running");
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});