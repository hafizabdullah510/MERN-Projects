import express from "express";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();
import {
  register,
  login,
  updateProfile,
} from "../controllers/adminAuthController.js";

routes.post("/register", register);
routes.post("/login", login);
routes.patch("/updateAdmin", authenticateUser, updateProfile);

export default routes;
