import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: Number(process.env.EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false
  }
});

export const sendEmail = async ({ to, subject, html }) => {
  if (!process.env.EMAIL_SERVER_USER) {
    console.warn("Emails are disabled: EMAIL_SERVER_USER not set.");
    throw new Error("Email service not configured.");
  }
  
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_SERVER_USER,
      to,
      subject,
      html,
    });
    console.log("Message sent to %s: %s", to, info.messageId);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};
