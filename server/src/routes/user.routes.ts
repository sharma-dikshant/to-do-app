import express from "express";
import {
  handleCreateUser,
  handleGetLoggedInUser,
  handleSearchUserWithEmail,
  handleSearchUserWithName,
} from "../controllers/user.controller";

import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.post("/", handleCreateUser);
router.get("/logged-in", handleGetLoggedInUser);
router.get("/search/email", handleSearchUserWithEmail);
router.get("/search/name", handleSearchUserWithName);

export default router;
