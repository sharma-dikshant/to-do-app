import express from "express";
import userRouter from "./src/routes/user.routes";

const app = express();

app.use(express.json());

// routers

app.use("/api/users", userRouter);
app.use("/", (req, res) => {
  res.status(200).send("welcome to ts server");
});

export default app;
