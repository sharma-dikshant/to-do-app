import express, {Request, Response, Express} from "express";

const app: Express = express();

const PORT = 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TS");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
