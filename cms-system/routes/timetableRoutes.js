import express from "express";
import { createTimetable } from "../controllers/timetableController.js";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/create", authenticateUser, createTimetable);

export default routes;
