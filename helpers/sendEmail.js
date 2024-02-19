const nodemailer = require("nodemailer");
const { USER_EMAIL, USER_PASSWORD,EMAIL } = process.env;

async function sendMail(data) {
  const email = { ...data, from: EMAIL };

  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  });

  await transport.sendMail(email);
}

module.exports = sendMail;
