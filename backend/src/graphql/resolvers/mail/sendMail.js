const nodemailer = require("nodemailer");
const smtpTransport = require("nodemailer-smtp-transport");

const transporter = nodemailer.createTransport(
  smtpTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      user: "kevinnor1997@gmail.com",
      pass: "ixcpkjeoupumsfai",
    },
  })
);

const sendMail = async (mailOptions) => {
  try {
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return error;
      } else {
        return info;
      }
    });
  } catch (err) {
    throw err;
  }
};

module.exports = { sendMail };
