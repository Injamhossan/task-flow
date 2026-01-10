import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: process.env.EMAIL_SERVER_PORT,
  secure: process.env.EMAIL_SERVER_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.EMAIL_SERVER_USER) {
    console.warn("Emails are disabled: EMAIL_SERVER_USER not set.");
    return;
  }
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || '"TaskFlow" <no-reply@taskflow.com>',
      to,
      subject,
      html,
    });
    console.log("Message sent: %s", info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
