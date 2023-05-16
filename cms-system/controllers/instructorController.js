import { BadRequest } from "../errors/index.js";
import { StatusCodes } from "http-status-codes";
import Instructor from "../model/Instructor.js";
import { addCookiesToResponse } from "../serverUtils/addCookiesToResponse.js";
import { checkPermissions } from "../serverUtils/checkPermissions.js";
export const registerInstructor = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    gender,
    department,
  } = req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !gender ||
    !department
  ) {
    throw new BadRequest("Please provide all the values");
  }

  const alreadyExists = await Instructor.findOne({ email });
  if (alreadyExists) {
    throw new BadRequest("Instructor already registered");
  }
  // check if the admin is registering the Instructor
  checkPermissions(req.user);

  const instructor = await Instructor.create(req.body);

  instructor.password = undefined;

  res.status(StatusCodes.CREATED).json({ instructor });
};

export const loginInstructor = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide all the values");
  }

  const instructor = await Instructor.findOne({ email });
  if (!instructor) {
    throw new NotFoundError(`No instructor with email : ${email}`);
  }

  const isMatch = await instructor.comparePassword(password);

  if (!isMatch) {
    throw new Unauthorized("Invalid Credentials");
  }

  const token = instructor.createJWT();
  addCookiesToResponse({ res, token });
  instructor.password = undefined;
  res.status(StatusCodes.OK).json({ instructor });
};
