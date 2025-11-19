const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "196928@upf.br",
    pass: "upfb krda ycup bhvm"
  }
});

const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: "196928@upf.br",
    to,
    subject,
    html
  });
};


module.exports = { sendEmail };
