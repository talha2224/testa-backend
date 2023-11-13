
const nodemailer = require('nodemailer');

const SendMail = (email,subject,h1,msg) => {
    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "Contractprojects2022@gmail.com",
          pass: "czmgaajrvdtdgpqy",
        },
      });
      const mailOptions = {
        from: "Contractprojects2022@gmail.com",
        to: email,
        subject: subject,
        html: `
        <h1>${h1}</h1>
        <h3>${msg}</h3>
        `,
      };
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
          console.log(err);
        } 
      });
    } catch (error) {
      console.log(error);
    }
};

module.exports = {SendMail}
