import express from "express";
import {
  login,
  logout,
  register,
  verifyEmail,
  currentUser,
  forgotPassword,
  resetPassword,
} from "../Controllers/authController.js";
import { authUser } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/register", register);
routes.post("/login", login);
routes.delete("/logout", authUser, logout);
routes.post("/verify-email", verifyEmail);
routes.get("/currentUser", authUser, currentUser);
routes.post("/forgot-password", forgotPassword);
routes.post("/user/reset-password", resetPassword);

export default routes;
