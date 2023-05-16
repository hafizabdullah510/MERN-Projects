import { BadRequest, NotFoundError } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import { checkPermissions } from "../serverUtils/checkPermissions.js";
import Announcement from "../model/Announcement.js";

export const createAnnouncement = async (req, res) => {
  const { title, description } = req.body;
  if (!title || !description) {
    throw new BadRequest("Please provide all values");
  }

  checkPermissions(req.user);
  const announcement = await Announcement.create(req.body);
  res.status(StatusCodes.CREATED).json({ announcement });
};

export const getAllAnnouncements = async (req, res) => {
  const { search, sort } = req.query;
  let queryObject = {};

  if (search) {
    queryObject.title = { $regex: search, $options: "i" };
  }

  let results = Announcement.find(queryObject);

  if (sort && sort === "Latest") {
    results = results.sort("-createdAt");
  }
  if (sort && sort === "Oldest") {
    results = results.sort("createdAt");
  }

  const announcements = await results;
  res.status(StatusCodes.OK).json({ announcements });
};
