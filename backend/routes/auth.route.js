import express from "express";
import { verifyToken } from "../middleware/auth.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  googleAuth,
} from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/google", googleAuth);
authRouter.post("/login", loginUser);
authRouter.post("/logout", verifyToken, logoutUser);
authRouter.get("/", verifyToken, getUserProfile);

export default authRouter;
