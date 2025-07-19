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
      <p><strong>Map Preview:</strong></p>
    <img src="https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=16&size=600x300&markers=color:red|${lat},${lng}&key=${process.env.GOOGLE_MAPS_API_KEY}" />

    `
    };
    return transporter.sendMail(mailOptions);
}

module.exports = sendPotholeEmail