import { BadRequest, NotFoundError, Unauthorized } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { checkInstructorPermissions } from "../serverUtils/checkPermissions.js";
import Student from "../model/Student.js";
import Course from "../model/Course.js";
import Instructor from "../model/Instructor.js";
import Attendence from "../model/Attendence.js";

export const createAttendenceRecord = async (req, res) => {
  checkInstructorPermissions(req.user);

  const { is_lab_attendance, student, course } = req.body;

  if (!student || !course) {
    throw new BadRequest("Please provide all the values");
  }

  const studentRecord = await Student.findOne({ _id: student });

  if (!studentRecord) {
    throw new NotFoundError(`No Student with Id : ${student}`);
  }

  const courseRecord = await Course.findOne({ _id: course });

  if (!courseRecord) {
    throw new NotFoundError(`No Course with Id : ${course}`);
  }

  const instructorRecord = await Instructor.findOne({ _id: req.user.userId });

  if (!instructorRecord) {
    throw new NotFoundError(`No Instructor with Id : ${req.user.userId}`);
  }

  let attendenceRecord;

  if (
    instructorRecord.courses.includes(courseRecord._id) &&
    instructorRecord.students.includes(studentRecord._id) &&
    studentRecord.instructors.includes(req.user.userId) &&
    studentRecord.courses.includes(courseRecord._id)
  ) {
    if (is_lab_attendance) {
      if (courseRecord.has_lab_credits) {
        attendenceRecord = await Attendence.create(req.body);
      } else {
        throw new BadRequest("Course Lab attendance could not be marked!");
      }
    } else {
      attendenceRecord = await Attendence.create(req.body);
    }
  } else {
    throw new Unauthorized("Not Authorized to Mark the student Attendence!");
  }

  res.status(StatusCodes.CREATED).json({ attendenceRecord });
};

export const getCompleteCourseAttendence = async (req, res) => {
  const { userId: studentId } = req.user;
  const { lab } = req.query;
  const { id: courseId } = req.params;

  if (!courseId) {
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

  let queryObject = { student: student._id, course: course._id };

  if (lab) {
    queryObject.is_lab_attendance = true;
  } else {
    queryObject.is_lab_attendance = false;
  }

  const attendence = await Attendence.find(queryObject).sort("createdAt");

  res.status(StatusCodes.OK).json({ attendence });
};
