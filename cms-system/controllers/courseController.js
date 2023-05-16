import { BadRequest, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../serverUtils/checkPermissions.js";
import Course from "../model/Course.js";
import Instructor from "../model/Instructor.js";
export const createCourse = async (req, res) => {
  const {
    name,
    credit_hours,
    has_lab_credits,
    faculty,
    department,
    course_code,
  } = req.body;

  if (!name || !credit_hours || !department || !course_code) {
    throw new BadRequest("Please provide all the values");
  }

  const alreadyExists = await Course.findOne({ name });
  if (alreadyExists) {
    throw new BadRequest("Course already registered");
  }
  checkPermissions(req.user);
  const course = await Course.create(req.body);
  res.status(StatusCodes.CREATED).json({ course });
};

export const getSingleCourse = async (req, res) => {
  const { id: courseId } = req.params;

  const course = await Course.findOne(
    { _id: courseId },
    { students: 0, department: 0 }
  );

  const instructors = await Instructor.aggregate([
    {
      $match: {
        _id: { $in: course.instructors },
      },
    },
    {
      $project: {
        _id: 0,
        fullName: { $concat: ["$firstName", " ", "$lastName"] },
      },
    },
  ]);

  res.status(StatusCodes.OK).json({ course, instructors });
};
