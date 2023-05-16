import Admin from "../model/Admin.js";
import { BadRequest, Unauthorized } from "../errors/index.js";
import { addCookiesToResponse } from "../serverUtils/addCookiesToResponse.js";
import { StatusCodes } from "http-status-codes";
export const register = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password, gender } =
    req.body;
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !password ||
    !gender
  ) {
    throw new BadRequest("Please provide all the values");
  }

  const alreadyExists = (await Admin.countDocuments()) !== 0;
  if (alreadyExists) {
    throw new Unauthorized("Admin already registerd");
  }

  const admin = await Admin.create(req.body);

  const token = admin.createJWT();

  addCookiesToResponse({ res, token });

  admin.password = undefined;

  res.status(StatusCodes.CREATED).json({ admin });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide all the values");
  }

  const admin = await Admin.findOne({ email });
  if (!admin) {
    throw new Unauthorized("Invalid Credentials");
  }

  const isMatch = await admin.comparePassword(password);

  if (!isMatch) {
    throw new Unauthorized("Invalid Credentials");
  }
  //generate token
  const token = admin.createJWT();

  addCookiesToResponse({ res, token });

  admin.password = undefined;

  res.status(StatusCodes.OK).json({ admin });
};

export const updateProfile = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, gender } = req.body;
  if (!firstName || !lastName || !email || !phoneNumber || !gender) {
    throw new BadRequest("Please provide all the values");
  }
  console.log(req.user);
  const admin = await Admin.findOne({ _id: req.user.userId });
  if (!admin) {
    throw new Unauthorized("Unauthorized to update profile");
  }

  admin.firstName = firstName;
  admin.lastName = lastName;
  admin.gender = gender;
  admin.email = email;
  admin.phoneNumber = phoneNumber;

  await admin.save();

  const token = admin.createJWT();

  addCookiesToResponse({ res, token });

  admin.password = undefined;

  res.status(StatusCodes.OK).json({ admin });
};
