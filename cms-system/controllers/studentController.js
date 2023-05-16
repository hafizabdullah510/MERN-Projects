import { BadRequest, NotFoundError, Unauthorized } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Student from "../model/Student.js";
import Timetable from "../model/Timetable.js";
import Course from "../model/Course.js";
import moment from "moment";
import { checkPermissions } from "../serverUtils/checkPermissions.js";
import { addCookiesToResponse } from "../serverUtils/addCookiesToResponse.js";
import Attendence from "../model/Attendence.js";
import Assessment_Marks from "../model/Assessment_Marks.js";
import Notification from "../model/Notification.js";

export const registerStudent = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    gender,
    semester,
    program,
    section,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !gender ||
    !section ||
    !semester ||
    !program
  ) {
    throw new BadRequest("Please provide all the values");
  }

  const alreadyExists = await Student.findOne({ email });
  if (alreadyExists) {
    throw new BadRequest("Student already registered");
  }
  // check if the admin is registering the student
  checkPermissions(req.user);

  const student = await Student.create(req.body);

  student.password = undefined;

  res.status(StatusCodes.CREATED).json({ student });
};

export const loginStudent = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide all the values");
  }

  const student = await Student.findOne({ email });
  if (!student) {
    throw new NotFoundError(`No student with email : ${email}`);
  }

  const isMatch = await student.comparePassword(password);

  if (!isMatch) {
    throw new Unauthorized("Invalid Credentials");
  }

  const token = student.createJWT();
  addCookiesToResponse({ res, token });
  student.password = undefined;
  res.status(StatusCodes.OK).json({ student });
};

export const getCurrentStudent = async (req, res) => {
  const { userId: studentId } = req.user;

  const student = await Student.findOne({ _id: studentId });

  res.status(StatusCodes.OK).json({ student });
};

export const getStudentCourses = async (req, res) => {
  const { userId: studentId } = req.user;

  const student = await Student.findOne({ _id: studentId });
  const courses = await Course.aggregate([
    {
      $match: {
        _id: { $in: student.courses },
      },
    },
    {
      $project: {
        _id: 1,
        name: 1,
      },
    },
  ]);
  res.status(StatusCodes.OK).json({ courses });
};

export const getStudentAttendence = async (req, res) => {
  const { userId: studentId } = req.user;

  const student = await Student.findOne({ _id: studentId });

  const attendence = await Attendence.aggregate([
    {
      $match: {
        student: student._id,
      },
    },
    {
      $group: {
        _id: {
          student_id: "$student",
          course_id: "$course",
          is_lab_attendance: "$is_lab_attendance",
        },
        total_present: {
          $sum: {
            $cond: { if: { $eq: ["$isPresent", true] }, then: 1, else: 0 },
          },
        },
        total_absent: {
          $sum: {
            $cond: { if: { $eq: ["$isPresent", false] }, then: 1, else: 0 },
          },
        },

        total_classes: { $sum: 1 },
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "_id.course_id",
        foreignField: "_id",
        as: "course",
      },
    },
    {
      $unwind: "$course",
    },
    {
      $project: {
        _id: 0,
        course_id: "$_id.course_id",
        course_name: "$course.name",
        is_lab: "$_id.is_lab_attendance",
        attendance_percentage: {
          $multiply: [{ $divide: ["$total_present", "$total_classes"] }, 100],
        },
      },
    },
    {
      $project: {
        _id: 1,
        course_id: 1,
        course_name: 1,
        is_lab: 1,
        attendance_percentage: {
          $ceil: "$attendance_percentage",
        },
      },
    },
  ]).sort({ course_name: 1 });
  console.log(attendence);
  res.status(StatusCodes.OK).json({ attendence });
};

export const getStudentAssessmentMarks = async (req, res) => {
  const { userId: studentId } = req.user;
  console.log(studentId);
  const { id: courseId } = req.params;

  const student = await Student.findOne({ _id: studentId });

  const course = await Course.findOne({ _id: courseId });

  const student_assessments = await Assessment_Marks.find({
    student: { $in: student._id },
  });

  const assessment_results = await Assessment_Marks.aggregate([
    {
      $match: { student: student._id },
    },
    {
      $lookup: {
        from: "assessments",
        localField: "assessment",
        foreignField: "_id",
        as: "assessment",
      },
    },
    {
      $unwind: "$assessment",
    },
    {
      $match: { "assessment.course": course._id },
    },
    {
      $project: {
        _id: 0,
        assessment_type: "$assessment.assessment_type",
        title: "$assessment.title",
        total_marks: "$assessment.total_marks",
        course: "$assessment.course",
        is_lab_assessment: "$assessment.is_lab_assessment",
        obtained_marks: 1,
        createdAt: 1,
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ assessment_results });
};

export const studentLogout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "Student Logged out!" });
};

export const studentTimetable = async (req, res) => {
  const { userId: studentId } = req.user;

  const student = await Student.findOne({ _id: studentId });

  const date = new Date();

  const startDate = new Date(
    date.setHours(new Date().getHours() - new Date().getTimezoneOffset() / 60)
  ).toISOString();
  const start = new Date(`${startDate.substring(0, 10)}T00:00:00.000Z`);

  date.setDate(date.getDate() + 1);
  const endDate = new Date(
    date.setHours(new Date().getHours() - new Date().getTimezoneOffset() / 60)
  ).toISOString();

  const end = new Date(`${endDate.substring(0, 10)}T00:00:00.000Z`);
  console.log(start, end);
  const timetable = await Timetable.find({
    course: student.courses,
    section: student.section,
    start_time: { $gte: start, $lt: end },
  }).populate({
    path: "course",
    select: "name",
  });

  res.status(StatusCodes.OK).json({ timetable });
};

export const getStudentNotifications = async (req, res) => {
  const { userId: studentId } = req.user;
  const student = await Student.findOne({ _id: studentId });

  const notifications = await Notification.find({
    _id: { $in: student.notifications },
  });

  res.status(StatusCodes.OK).json({ notifications });
};
