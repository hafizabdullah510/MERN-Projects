import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "berniece.streich@ethereal.email",
      pass: "skdfxcgVdhuz2xUa6R",
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Abdullah Coder" <abdullahCoding@gmail.com>', // sender address
    to, // list of receivers
    subject, // Subject line
    html, // html body
  });
};
