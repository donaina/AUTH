import { transporter } from "./email.config.js";
import {
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate,
  getWelcomeEmailTemplate,
} from "./emailTemplates.js";

// Use the imported transporter
export const sendVerificationEmail = async (email, name, verificationToken) => {
  try {
    const mailOptions = {
      from: `"Eduvrs Labs" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify Your Email Address",
      html: getVerificationEmailTemplate(name, verificationToken),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email");
  }
};

export const sendPasswordResetEmail = async (email, name, resetToken) => {
  try {
    const mailOptions = {
      from: `"Eduvrs Labs" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Your Password",
      html: getPasswordResetEmailTemplate(name, resetToken),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email");
  }
};

export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: `"Eduvrs Labs" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Welcome to Our Eduvrs!",
      html: getWelcomeEmailTemplate(name),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Welcome email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    // Don't throw error for welcome email - it's not critical
    return { success: false, error: error.message };
  }
};