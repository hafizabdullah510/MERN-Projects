import { Unauthorized } from "../errors/index.js";
export const checkPermissions = (requestUser, resourceUserId) => {
  if (requestUser.role === "admin") return;
  if (resourceUserId) {
    if (requestUser.userId === resourceUserId.toString()) return;
  }
  throw new Unauthorized("Not Authorized to access the route");
};

export const checkInstructorPermissions = (requestUser) => {
  if (requestUser.role === "instructor") return;
  throw new Unauthorized("Not Authorized to access the route");
};
