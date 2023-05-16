import { BadRequest, Unauthorized } from "../errors/index.js";
import jwt from "jsonwebtoken";
export const authenticateUser = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    throw new Unauthorized("Unauthorized User");
  }
  try {
    const payload = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    throw new Unauthorized("Cannot access payload");
  }
};
