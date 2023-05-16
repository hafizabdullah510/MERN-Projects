import express from "express";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();
import {
  registerStudent,
  loginStudent,
  getCurrentStudent,
  studentLogout,
  studentTimetable,
  getStudentAttendence,
  getStudentCourses,
  getStudentAssessmentMarks,
  getStudentNotifications,
} from "../controllers/studentController.js";
routes.post("/register", authenticateUser, registerStudent);
routes.post("/login", loginStudent);

routes.get("/logout", studentLogout);

routes.get("/currentStudent", authenticateUser, getCurrentStudent);
routes.get("/currentStudentCourses", authenticateUser, getStudentCourses);

routes.get("/currentStudentAttendance", authenticateUser, getStudentAttendence);

routes.get("/assessmentMarks/:id", authenticateUser, getStudentAssessmentMarks);

routes.get("/timetable", authenticateUser, studentTimetable);

routes.get("/notifications", authenticateUser, getStudentNotifications);

export default routes;
