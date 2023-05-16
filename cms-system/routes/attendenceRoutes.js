import express from "express";
import {
  createAttendenceRecord,
  getCompleteCourseAttendence,
} from "../controllers/attendenceController.js";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();
routes.post("/create", authenticateUser, createAttendenceRecord);
routes.get(
  "/completeCourseAttendence/:id",
  authenticateUser,
  getCompleteCourseAttendence
);

export default routes;
