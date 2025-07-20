import express from "express";
import {
  handleLogin,
  handleLogout,
  handleSignup,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/signup", handleSignup);
router.post("/login", handleLogin);
router.post("/logout", handleLogout);

export default router;
