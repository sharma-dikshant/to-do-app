import express from "express";
import {
  handleCreateUser,
  handleSearchUserWithEmail,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/", handleCreateUser);
router.get("/search", handleSearchUserWithEmail);

export default router;
