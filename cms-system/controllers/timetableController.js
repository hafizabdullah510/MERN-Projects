import Timetable from "../model/Timetable.js";
import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../serverUtils/checkPermissions.js";
import { BadRequest, NotFoundError, Unauthorized } from "../errors/index.js";
import Course from "../model/Course.js";

export const createTimetable = async (req, res) => {
  const {
    is_lab_slot,
    room_number,
    start_time,
    end_time,
    day_of_week,
    course,
    section,
  } = req.body;

  if (
    !room_number ||
    !start_time ||
    !end_time ||
    !day_of_week ||
    !course ||
    !section
  ) {
    throw new BadRequest("Please provide all the values");
  }

  checkPermissions(req.user);

  const courseRecord = await Course.findOne({ _id: course });

  if (!courseRecord) {
    throw new NotFoundError(`No course with Id : ${course}`);
  }
  let timetable;
  if (is_lab_slot) {
    if (courseRecord.has_lab_credits) {
      timetable = await Timetable.create(req.body);
    } else {
      throw new BadRequest("Lab slot for course cannot be created!.");
    }
  } else {
    timetable = await Timetable.create(req.body);
  }

  res.status(StatusCodes.CREATED).json({ timetable });
};
