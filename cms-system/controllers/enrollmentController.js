import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../serverUtils/checkPermissions.js";
import { BadRequest, NotFoundError, Unauthorized } from "../errors/index.js";
import Student from "../model/Student.js";
import Course from "../model/Course.js";
import Department from "../model/Department.js";
import Instructor from "../model/Instructor.js";

export const student_course_enrollment = async (req, res) => {
  checkPermissions(req.user);

  const { studentId, courseId, departmentId } = req.body;
  if (!studentId || !courseId || !departmentId) {
    throw new BadRequest("Please provide all the values");
  }

  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    throw new NotFoundError(`No Student with Id : ${studentId}`);
  }

  const course = await Course.findOne({ _id: courseId });

  if (!course) {
    throw new NotFoundError(`No Course with Id : ${courseId}`);
  }

  const department = await Department.findOne({ _id: departmentId });

  if (!department) {
    throw new NotFoundError(`No Department with Id : ${departmentId}`);
  }

  if (
    !student.courses.includes(course._id) &&
    department.courses.includes(course._id)
  ) {
    student.courses.push(course._id);
    await student.save();
  } else {
    throw new BadRequest("Cannot include the course!");
  }

  if (
    !course.students.includes(student._id) &&
    student.courses.includes(course._id)
  ) {
    course.students.push(student._id);
    await course.save();
  } else {
    throw new BadRequest("Cannot include the student!");
  }

  res.status(StatusCodes.OK).json({ msg: "Enrollment Successful!" });
};

export const instructor_course_enrollment = async (req, res) => {
  checkPermissions(req.user);

  const { instructorId, courseId, departmentId } = req.body;
  if (!instructorId || !courseId || !departmentId) {
    throw new BadRequest("Please provide all the values");
  }

  const instructor = await Instructor.findOne({ _id: instructorId });

  if (!instructor) {
    throw new NotFoundError(`No Instructor with Id : ${instructorId}`);
  }

  const course = await Course.findOne({ _id: courseId });

  if (!course) {
    throw new NotFoundError(`No Course with Id : ${courseId}`);
  }

  const department = await Department.findOne({ _id: departmentId });

  if (!department) {
    throw new NotFoundError(`No Department with Id : ${departmentId}`);
  }

  if (
    !instructor.courses.includes(course._id) &&
    department.courses.includes(course._id)
  ) {
    instructor.courses.push(course._id);
    await instructor.save();
  } else {
    throw new BadRequest("Cannot include the course!");
  }

  if (
    !course.instructors.includes(instructor._id) &&
    instructor.courses.includes(course._id)
  ) {
    course.instructors.push(instructor._id);
    await course.save();
  } else {
    throw new BadRequest("Cannot include the instructor!");
  }

  res.status(StatusCodes.OK).json({ msg: "Instructor Enrollment Successful!" });
};

export const instructor_student_assignment = async (req, res) => {
  checkPermissions(req.user);

  const { instructorId, studentId, departmentId, courseId } = req.body;
  if (!instructorId || !studentId || !departmentId || !courseId) {
    throw new BadRequest("Please provide all the values");
  }

  const instructor = await Instructor.findOne({ _id: instructorId });

  if (!instructor) {
    throw new NotFoundError(`No Instructor with Id : ${instructorId}`);
  }

  const student = await Student.findOne({ _id: studentId });

  if (!student) {
    throw new NotFoundError(`No Student with Id : ${studentId}`);
  }

  const department = await Department.findOne({ _id: departmentId });

  if (!department) {
    throw new NotFoundError(`No Department with Id : ${departmentId}`);
  }

  const course = await Course.findOne({ _id: courseId });

  if (!course) {
    throw new NotFoundError(`No Course with Id : ${courseId}`);
  }

  if (
    !instructor.students.includes(student._id) &&
    department.instructors.includes(instructor._id) &&
    instructor.courses.includes(course._id) &&
    student.courses.includes(course._id)
  ) {
    instructor.students.push(student._id);
    await instructor.save();
  } else {
    throw new BadRequest("Cannot include the Student!");
  }

  if (
    !student.instructors.includes(instructor._id) &&
    instructor.students.includes(student._id) &&
    student.courses.includes(course._id) &&
    instructor.courses.includes(course._id)
  ) {
    student.instructors.push(instructor._id);
    await student.save();
  } else {
    throw new BadRequest("Cannot include the instructor!");
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Instructor Student Assignment Successful!" });
};
