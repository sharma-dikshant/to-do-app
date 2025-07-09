import express, { Express, Request, Response } from "express";
import { container } from "./src/config/container";
import { Page } from "./src/page";
import { Post } from "./src/post";
import { User } from "./src/user";


const app: Express = express();
const port = 3001;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});


const pageClass = container.get<Page>(Page);
app.post("/create-page", (req: Request, res: Response) => {
  let page = pageClass.createPage("http://first-page.com");
  console.log(page);
  res.status(200).json(page);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});