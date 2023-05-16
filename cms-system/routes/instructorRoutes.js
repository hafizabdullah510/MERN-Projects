import express from "express";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();
import {
  registerInstructor,
  loginInstructor,
} from "../controllers/instructorController.js";
routes.post("/register", authenticateUser, registerInstructor);
routes.post("/login", loginInstructor);

export default routes;
