import express from "express";
import {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  addCoursesToDepartment,
  addInstructorsToDepartment,
} from "../controllers/departmentController.js";
import { authenticateUser } from "../middleware/auth.js";
const routes = express.Router();

routes.post("/create", authenticateUser, createDepartment);
routes.post("/addCourses", authenticateUser, addCoursesToDepartment);
routes.post("/addInstructors", authenticateUser, addInstructorsToDepartment);

routes.get("/getAllDepartments", authenticateUser, getAllDepartments);
routes.get("/:id", authenticateUser, getSingleDepartment);

export default routes;
