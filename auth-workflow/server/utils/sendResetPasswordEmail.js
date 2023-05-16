import { sendEmail } from "./sendEmail.js";

export const sendResetPasswordEmail = async ({
  name,
  email,
  token,
  origin,
}) => {
  const resetUrl = `${origin}/user/reset-password?token=${token}&email=${email}`;

  const message = `<p>Please click on the link to reset password : <a href="${resetUrl}">Reset Password</a></p>`;

  const Subject = "Reset Password";

  return sendEmail({
    to: email,
    subject: Subject,
    html: `<h4>Hello, ${name}</h4>${message}`,
  });
};
