import { BadRequest, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Department from "../model/Department.js";
import Course from "../model/Course.js";
import { checkPermissions } from "../serverUtils/checkPermissions.js";
import Instructor from "../model/Instructor.js";
export const createDepartment = async (req, res) => {
  const { department_name } = req.body;
  if (!department_name) {
    throw new BadRequest("Please provide department name");
  }
  const alreadyExists = await Department.findOne({ department_name });

  if (alreadyExists) {
    throw new BadRequest("Department Already exists");
  }

  checkPermissions(req.user);

  const dept = await Department.create(req.body);

  res.status(StatusCodes.CREATED).json({ dept });
};

export const getAllDepartments = async (req, res) => {
  const departments = await Department.find({});
  res.status(StatusCodes.OK).json({ departments });
};

export const getSingleDepartment = async (req, res) => {
  const { id: departmentId } = req.params;

  checkPermissions(req.user);

  const dept = await Department.findOne({ _id: departmentId });

  if (!dept) {
    throw new NotFoundError(`No department with id : ${departmentId}`);
  }

  res.status(StatusCodes.OK).json({ dept });
};

export const addCoursesToDepartment = async (req, res) => {
  const { departmentId, courseId } = req.body;

  if (!departmentId || !courseId) {
    throw new BadRequest("Please provide all values");
  }
  const department = await Department.findOne({ _id: departmentId });

  if (!department) {
    throw new NotFoundError(`No department with id : ${departmentId}`);
  }

  const course = await Course.findOne({ _id: courseId });

  if (!course) {
    throw new NotFoundError(`No course with id : ${courseId}`);
  }

  if (!department.courses.includes(course._id)) {
    department.courses.push(course._id);
    await department.save();
  } else {
    throw new BadRequest("Course already Exists");
  }

  res.status(StatusCodes.OK).json({ msg: "Course added to department" });
};

export const addInstructorsToDepartment = async (req, res) => {
  const { departmentId, instructorId } = req.body;

  if (!departmentId || !instructorId) {
    throw new BadRequest("Please provide all values");
  }
  const department = await Department.findOne({ _id: departmentId });

  if (!department) {
    throw new NotFoundError(`No department with id : ${departmentId}`);
  }

  const instructor = await Instructor.findOne({ _id: instructorId });

  if (!instructor) {
    throw new NotFoundError(`No instructor with id : ${instructorId}`);
  }

  if (!department.instructors.includes(instructor._id)) {
    department.instructors.push(instructor._id);
    await department.save();
  } else {
    throw new BadRequest("Instructor already Exists");
  }
  res.status(StatusCodes.OK).json({ msg: "Instructor added to department" });
};
