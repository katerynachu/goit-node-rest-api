const nodemailer = require("nodemailer");
const { USER_EMAIL, USER_PASSWORD } = process.env;

async function sendMail({ to, subject, html, text = "" }) {
  const email = {
    from: "info@contact.com",
    to,
    subject,
    html,
    text,
  };

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
