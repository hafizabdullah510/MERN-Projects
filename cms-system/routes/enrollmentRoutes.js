import express from "express";
import {
  student_course_enrollment,
  instructor_course_enrollment,
  instructor_student_assignment,
} from "../controllers/enrollmentController.js";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();

routes.post(
  "/createStudentCourseEnrollment",
  authenticateUser,
  student_course_enrollment
);
routes.post(
  "/createInstructorCourseEnrollment",
  authenticateUser,
  instructor_course_enrollment
);

routes.post(
  "/createInstructorStudentAssignment",
  authenticateUser,
  instructor_student_assignment
);

export default routes;
