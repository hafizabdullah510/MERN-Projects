import { BadRequest, NotFoundError, Unauthorized } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import {
  checkInstructorPermissions,
  checkPermissions,
} from "../serverUtils/checkPermissions.js";
import Instructor from "../model/Instructor.js";
import Assessment from "../model/Assessment.js";
import Course from "../model/Course.js";
import Student from "../model/Student.js";
import Assessment_Marks from "../model/Assessment_Marks.js";

export const createAssessment = async (req, res) => {
  checkInstructorPermissions(req.user);

  const { userId: instructorId } = req.user;

  const { course, title, total_marks, assessment_type, is_lab_assessment } =
    req.body;

  if (!course || !title || !assessment_type) {
    throw new BadRequest("Please provide all values");
  }
  const instructor = await Instructor.findOne({ _id: instructorId }).populate({
    path: "courses",
    model: "Course",
  });
  if (!instructor) {
    throw new NotFoundError(`No instructor with id : ${instructorId}`);
  }
  const courseRecord = await Course.findOne({ _id: course }).populate({
    path: "students",
    model: "Student",
  });

  if (!courseRecord) {
    throw new NotFoundError(`No Course with Id : ${course}`);
  }
  let assessment;

  const isInstructorCourse = instructor.courses.find(
    (course) => course._id.toString() === courseRecord._id.toString()
  );

  if (isInstructorCourse) {
    if (assessment_type !== "quiz" && is_lab_assessment) {
      if (courseRecord.has_lab_credits) {
        assessment = await Assessment.create(req.body);
      } else {
        throw new BadRequest("Course does not has lab credits");
      }
    } else {
      assessment = await Assessment.create(req.body);
    }
  } else {
    throw new Unauthorized("Not Authorized to assign Assessment!");
  }

  // for common students of course and instructor
  const commonStudents = courseRecord.students.filter((student) => {
    return instructor.courses.some((course) =>
      course.students.includes(student._id)
    );
  });

  const updateResult = await Student.updateMany(
    { _id: { $in: commonStudents } },
    { $push: { assessments: assessment._id } }
  );

  console.log(`Number of documents updated: ${updateResult.modifiedCount}`);

  res.status(StatusCodes.OK).json({ assessment });
};

export const markAssessment = async (req, res) => {
  checkInstructorPermissions(req.user);

  const { userId: instructorId } = req.user;
  const { student, assessment, obtained_marks } = req.body;

  if (!student || !assessment || !obtained_marks) {
    throw new BadRequest("Please provide all values");
  }

  const instructor = await Instructor.findOne({ _id: instructorId });
  if (!instructor) {
    throw new NotFoundError(`No instructor with id : ${instructorId}`);
  }
  const studentRecord = await Student.findOne({ _id: student });

  if (!studentRecord) {
    throw new NotFoundError(`No Student with Id : ${student}`);
  }

  const studentAssessment = await Assessment.findOne({ _id: assessment });

  if (!studentAssessment) {
    throw new NotFoundError(`No student assessment with Id : ${assessment}`);
  }

  if (obtained_marks > studentAssessment.total_marks) {
    throw new BadRequest("Obtained Marks should be less than total marks");
  }
  let assessment_marks;
  if (
    instructor.students.includes(studentRecord._id) &&
    studentRecord.instructors.includes(instructor._id) &&
    studentRecord.courses.includes(studentAssessment.course) &&
    instructor.courses.includes(studentAssessment.course) &&
    studentRecord.assessments.includes(studentAssessment._id)
  ) {
    assessment_marks = await Assessment_Marks.create(req.body);
  } else {
    throw new Unauthorized("Not Authorized to Mark the student Assessment!");
  }

  res.status(StatusCodes.OK).json({ assessment_marks });
};
