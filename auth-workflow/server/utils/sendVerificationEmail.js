import { sendEmail } from "./sendEmail.js";

export const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmailUrl = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  let message = `<p>Please confirm your account by clicking on the Link : <a href="${verifyEmailUrl}">Verify Email</a></p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4>Hello, ${name}</h4>${message}`,
  });
};
