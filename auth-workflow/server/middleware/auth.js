import Unauthorized from "../errors/Unauthorized.js";
import Token from "../Model/Token.js";
import Forbidden from "../errors/Forbidden.js";

import { addCookiesToResponse, isTokenValid } from "../utils/jwt.js";

export const authUser = async (req, res, next) => {
  // check for both tokens
  const { accessToken, refreshToken } = req.signedCookies;

  console.log(req.headers);
  // first check for access token
  try {
    if (accessToken) {
      const payload = isTokenValid(accessToken);
      req.user = payload.user;
      return next();
    }
    const payload = isTokenValid(refreshToken);
    //check for existing token
    const existingToken = await Token.findOne({
      user: payload.user.userId,
      refreshToken: payload.refreshToken,
    });
    // if no token exists or isValid is false for that token
    if (!existingToken || !existingToken?.isValid) {
      throw new Unauthorized("Authentication Failed");
    }
    // else add cookies to response
    addCookiesToResponse({
      res,
      user: payload.user,
      refreshToken: existingToken.refreshToken,
    });
    req.user = payload.user;
    next();
  } catch (err) {
    throw new Unauthorized("Authentication Failed");
  }
};

export const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Forbidden("Not Authorized to access the Route");
    }
    next();
  };
};
