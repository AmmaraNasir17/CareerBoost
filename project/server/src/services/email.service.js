const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendPasswordResetEmail = async (toEmail, resetToken) => {
  const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

  await transporter.sendMail({
    from: `"CareerBoost" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Password Reset Request",
    html: `
      <h2>Password Reset</h2>
      <p>You requested a password reset for your CareerBoost account.</p>
      <p>Click the link below to reset your password. This link expires in 1 hour.</p>
      <a href="${resetLink}" style="padding: 10px 20px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">
        Reset Password
      </a>
      <p>If you did not request this, ignore this email.</p>
    `,
  });
};

const sendWelcomeEmail = async (toEmail, name) => {
  await transporter.sendMail({
    from: `"CareerBoost" <${process.env.SMTP_USER}>`,
    to: toEmail,
    subject: "Welcome to CareerBoost",
    html: `
      <h2>Welcome, ${name}!</h2>
      <p>Your CareerBoost account has been created successfully.</p>
      <p>Start exploring jobs, building your resume, and tracking your skills today.</p>
      <a href="${process.env.CLIENT_URL}" style="padding: 10px 20px; background: #4F46E5; color: white; text-decoration: none; border-radius: 5px;">
        Get Started
      </a>
    `,
  });
};

module.exports = { sendPasswordResetEmail, sendWelcomeEmail };