const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
   host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendPotholeEmail = async ({to , description , lat, lng, imageUrl}) => {
    const mailOptions = {
        from : process.env.MAIL_USER,
        to,
        subject: `Pothole Reported `,
        html: `
      <p><strong>Description:</strong> ${description}</p>
      <p>Coordinates: ${lat}, ${lng}</p>
      ${imageUrl ? `<img src="${imageUrl}" width="300"/>` : ''}
    `
    };
    return transporter.sendMail(mailOptions);
}

module.exports = sendPotholeEmail