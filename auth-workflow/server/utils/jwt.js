import jwt from "jsonwebtoken";

// create json web token
export const createJWT = ({ payload }) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

export const isTokenValid = (token) => {
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  return payload;
};

//Add cookies to the response
export const addCookiesToResponse = ({ res, user, refreshToken }) => {
  const accessTokenJWT = createJWT({ payload: { user } });
  const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

  // Expiries
  const OneDay = 1000 * 60 * 60 * 24;
  const OneMonth = 1000 * 60 * 60 * 24 * 30;

  res.cookie("accessToken", accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,

    expires: new Date(Date.now() + OneDay),
  });

  res.cookie("refreshToken", refreshTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    signed: true,
    expires: new Date(Date.now() + OneMonth),
  });
};
