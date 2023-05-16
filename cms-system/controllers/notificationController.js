import Notification from "../model/Notification.js";
import Instructor from "../model/Instructor.js";
import { checkInstructorPermissions } from "../serverUtils/checkPermissions.js";
import { BadRequest, NotFoundError, Unauthorized } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Course from "../model/Course.js";
import Student from "../model/Student.js";

export const createNotification = async (req, res) => {
  checkInstructorPermissions(req.user);

  const { userId: instructorId } = req.user;

  const { course_name, title, description } = req.body;

  if (!course_name || !title) {
    throw new BadRequest("Please provide all values");
  }

  const instructor = await Instructor.findOne({ _id: instructorId }).populate({
    path: "courses",
    model: "Course",
  });
  if (!instructor) {
    throw new NotFoundError(`No instructor with id : ${instructorId}`);
  }
  const courseRecord = await Course.findOne({ name: course_name }).populate({
    path: "students",
    model: "Student",
  });
  if (!courseRecord) {
    throw new NotFoundError(`No Course with name : ${course_name}`);
  }

  let notification;

  const isInstructorCourse = instructor.courses.find(
    (course) => course._id.toString() === courseRecord._id.toString()
  );
  console.log(isInstructorCourse);
  if (isInstructorCourse) {
    notification = await Notification.create(req.body);
  } else {
    throw new Unauthorized("Not Authorized to send Notifications!");
  }

  // for common students of course and instructor
  const commonStudents = courseRecord.students.filter((student) => {
    return instructor.courses.some((course) =>
      course.students.includes(student._id)
    );
  });

  const updateResult = await Student.updateMany(
    { _id: { $in: commonStudents } },
    { $push: { notifications: notification._id } }
  );

  console.log(`Number of documents updated: ${updateResult.modifiedCount}`);

  res.status(StatusCodes.OK).json({ notification });
};
