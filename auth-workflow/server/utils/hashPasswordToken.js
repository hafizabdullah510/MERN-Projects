import crypto from "crypto";

export const hashPasswordToken = (string) => {
  return crypto.createHash("md5").update(string).digest("hex");
};
