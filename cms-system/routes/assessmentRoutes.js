import express from "express";
import {
  createAssessment,
  markAssessment,
} from "../controllers/assessmentController.js";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/create", authenticateUser, createAssessment);
routes.post("/markAssessment", authenticateUser, markAssessment);

export default routes;
