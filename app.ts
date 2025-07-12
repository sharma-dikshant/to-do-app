import express from "express";
import morgan from "morgan";
import userRouter from "./src/routes/user.routes";
import taskRouter from "./src/routes/task.routes";
import taskListRouter from "./src/routes/taskList.routes";
import handleError from "./src/controllers/error.controller";

const app = express();

app.use(express.json());
app.use(morgan("dev"));

// routers

app.use("/api/users", userRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/task-lists", taskListRouter);
app.use("/api/", (req, res) => {
  res.status(200).send("welcome to RSO-KEEP!");
});

app.use(handleError);

export default app;
