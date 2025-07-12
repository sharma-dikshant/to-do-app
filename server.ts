import express, { Express, Request, Response } from "express";
import mongoose from "mongoose";

import app from "./app";
const port = 3001;

// mongoose
//   .connect("url")
//   .then(() => {
//     console.log("DB is connectd");
//   })
//   .catch(() => console.log("failed to connect db"));

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
