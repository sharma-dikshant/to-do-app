import express from "express";
import {
  handleCreateUser,
  handleGetLoggedInUser,
  handleSearchUserWithEmail,
} from "../controllers/user.controller";

import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.post("/", handleCreateUser);
router.get("/logged-in", handleGetLoggedInUser);
router.get("/search", handleSearchUserWithEmail);

export default router;
