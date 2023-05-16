import { StatusCodes } from "http-status-codes";
import User from "../Model/User.js";
import Token from "../Model/Token.js";
import Bad_Request from "../errors/Bad_Request.js";
import Unauthorized from "../errors/Unauthorized.js";
import crypto from "crypto";
import {
  sendVerificationEmail,
  createTokenUser,
  addCookiesToResponse,
  sendResetPasswordEmail,
  hashPasswordToken,
} from "../utils/index.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new Bad_Request("Please Provide name email and password");
  }
  const alreadyExists = await User.findOne({ email });
  if (alreadyExists) {
    throw new Bad_Request("User Already Exists");
  }
  const firstUser = (await User.countDocuments({})) === 0;
  const role = firstUser ? "admin" : "user";

  const verificationToken = crypto.randomBytes(40).toString("hex");

  const user = await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = "http://localhost:3000";

  await sendVerificationEmail({
    name: user.name,
    email: user.email,
    verificationToken: user.verificationToken,
    origin,
  });
  // Just for Postman
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Success, Please check email to verify account" });
};

export const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Verification Failed");
  }
  if (!verificationToken === user.verificationToken) {
    throw new Unauthorized("Verification Failed");
  }

  user.isVerified = true;
  user.verificationToken = "";
  user.verified = Date.now();
  await user.save();

  res.status(StatusCodes.OK).json({ msg: "Email Verified" });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new Bad_Request("Please Provide both email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new Unauthorized("Invalid credentials");
  }
  // check user verification
  if (!user.isVerified) {
    throw new Unauthorized("Please verify your email");
  }

  const tokenUser = createTokenUser(user);

  //create refresh token
  let refreshToken = "";
  //check existing token
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new Unauthorized("Access to user is Halted");
    }
    refreshToken = existingToken.refreshToken;
    //Now add cookies to the response
    addCookiesToResponse({ res, user: tokenUser, refreshToken });
    res.status(StatusCodes.OK).json({ user: tokenUser });
    return;
  }

  //assuming that user is logging in first time so there is no refreshToken
  // creating all the properties for Token model
  refreshToken = crypto.randomBytes(40).toString("hex");
  const userAgent = req.headers["user-agent"];
  const ip = req.ip;
  const userToken = { refreshToken, userAgent, ip, user: user._id };
  await Token.create(userToken);

  //Now add cookies to the response
  addCookiesToResponse({ res, user: tokenUser, refreshToken });

  res.status(StatusCodes.OK).json({ user: tokenUser });
};
export const logout = async (req, res) => {
  await Token.findOneAndDelete({ user: req.user.usedId });

  res.cookie("accessToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.cookie("refreshToken", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "User Logged Out" });
};

export const currentUser = async (req, res) => {
  res.status(StatusCodes.OK).json({ user: req.user });
};

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const origin = "http://localhost:3000";

  if (!email) {
    throw new Bad_Request("Please Provide Email");
  }
  const user = await User.findOne({ email });
  if (user) {
    const passwordToken = crypto.randomBytes(70).toString("hex");

    await sendResetPasswordEmail({
      name: user.name,
      email: user.email,
      token: passwordToken,
      origin,
    });

    const tenMinutes = 1000 * 60 * 10;

    const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

    user.passwordToken = hashPasswordToken(passwordToken);
    user.passwordTokenExpirationDate = passwordTokenExpirationDate;

    await user.save();
  }

  res
    .status(StatusCodes.OK)
    .json({ msg: "Please check your email to reset password" });
};

export const resetPassword = async (req, res) => {
  const { token, email, password } = req.body;

  console.log(req.body);
  if (!token || !email || !password) {
    throw new Bad_Request("Please Provide All Values");
  }

  const user = await User.findOne({ email });
  if (user) {
    const currentDate = new Date(Date.now());

    if (
      user.passwordToken === hashPasswordToken(token) &&
      user.passwordTokenExpirationDate > currentDate
    ) {
      console.log("success");
      user.password = password;
      user.passwordToken = null;
      user.passwordTokenExpirationDate = null;

      await user.save();
    }
  }

  res.status(StatusCodes.OK).json({ msg: "Password Reseted" });
};
