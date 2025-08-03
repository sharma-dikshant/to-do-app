import express from "express";
import {
  handleCreateLocalUser,
  handleCreateUser,
  handleGetLoggedInUser,
  handleSearchLocalUserWithName,
  handleSearchUserWithEmail,
  handleSearchUserWithName,
  handleUpdateMyDetails,
} from "../controllers/user.controller";

import { protect } from "../controllers/auth.controller";

const router = express.Router();

router.use(protect);
router.post("/", handleCreateUser);
router.patch("/me", handleUpdateMyDetails);
router.post("/locals", handleCreateLocalUser);
router.get("/logged-in", handleGetLoggedInUser);
router.get("/search/email", handleSearchUserWithEmail);
router.get("/search/name", handleSearchUserWithName);
router.get("/search/locals/name", handleSearchLocalUserWithName);

export default router;
