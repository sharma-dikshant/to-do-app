import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config({ path: "./config.env" });

import app from "./app";
const PORT = process.env.PORT || 3000;
const DB_URL = process.env.DATABASE_URL;

if (!DB_URL) {
  throw new Error("Database Url is not Defined");
}

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("DB is connectd");
  })
  .catch(() => console.log("failed to connect db"));

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
