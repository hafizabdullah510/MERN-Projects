import express from "express";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();
import {
  createCourse,
  getSingleCourse,
} from "../controllers/courseController.js";
routes.post("/create", authenticateUser, createCourse);
routes.get("/:id", authenticateUser, getSingleCourse);

export default routes;
