import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"; 
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail } from "../utils/sendEmail.js";
import crypto from "crypto";

// Signup controller
export const signup = async (req, res) => {
  console.log("Signup endpoint hit", req.body); // Log to check incoming data
  const { email, password, name } = req.body;
  // Basic validation
  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    // Check if user already exists
    const userAlreadyExists = await User.findOne({ email });
    console.log("userAlreadyExists", userAlreadyExists);
    if (userAlreadyExists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit code
    const user = new User({
      email,
      password: hashedPassword,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 10 * 60 * 1000, // 10 minutes
    });

    // Save user to database
    await user.save();

     // Send verification email
    await sendVerificationEmail(email, name, verificationToken);

    // Generate JWT and set it in HTTP-only cookie
    generateTokenAndSetCookie(res,user._id)

    // Respond with success message
    res.status(201).json({ 
      success: true,
      message: "User registered successfully. Please check your email for verification code.",
      user: {
        ...user._doc,
        password: undefined, // Exclude password from response
      },
    });
    // Note: In a real application, you would send the verification token via email here
  } catch (error){
    return res.status(400).json({ success: false, message: error.message });
  }
}

export const verifyEmail = async (req, res) => {
  const {code} = req.body;
  try {
    const user = await User.findOne({ 
      verificationToken: code,
      verificationTokenExpiresAt: {$gt: Date.now()}
    })
    if (!user){
      return res.status(400).json({success: false,message:"Invalid or expired verification code"})
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email,user.name);
    
    return res.status(200).json({
      success: true,
      message: "Email verified successfully.",
      user: {
        ...user._doc,
        password: undefined,
      }
    });
  } catch (error) {
    console.log("Error verifiying Emmail", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}

// Login function
export const login = async (req, res) => {
  const { email, password } = req.body; // <-- Add this line
  try{
    const user = await User.findOne({email});
    if (!user){
      return res.status(400).json({success: false, message: "Invalid credentials"})
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if(!isPasswordValid){
      return res.status(400).json({success:false,message: "Invalid credentials"})
    }

    generateTokenAndSetCookie(res,user._id);

    user.lastLogin = Date.now();
    await user.save();

    res.status(200).json({
      success: true,
      message: "Logged in Successfully",
      user: {
        ...user._doc,
        password: undefined,
      }
    })

  } catch(error){
    console.log("Error in Login", error);
    res.status(400).json({success: false, message: error.message})

} }


// Logout function
export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({success: true, message: "Logged out successfully"});
}

// Forgot Password function
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    if (!email) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    // Generate secure reset token and set expiration
    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes
    user.resetPasswordToken = resetToken;
    user.resetTokenExpiresAt = resetTokenExpiresAt;
    await user.save();
    // Send reset email with secure token in URL
    await sendPasswordResetEmail(email, user.name, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    return res.status(200).json({ success: true, message: "Password reset email sent" });
  } catch (error) {
    console.log("Error in forgotPassword", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
}

// Reset Password function
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    // Find user by reset token and check expiration
    const user = await User.findOne({
      resetPasswordToken: token,
      resetTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ 
        success: false, 
        message: "Invalid or expired password reset token" 
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update user's password and clear reset token fields
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetTokenExpiresAt = undefined;
    await user.save();

    // Send success confirmation email
    try {
      await sendPasswordResetSuccessEmail(user.email, user.name);
    } catch (emailError) {
      // Log error but don't fail the request
      console.error("Failed to send confirmation email:", emailError);
    }

    res.status(200).json({ 
      success: true, 
      message: "Password has been reset successfully" 
    });

  } catch (error) {
    console.log("Error in resetPassword", error);
    return res.status(500).json({ 
      success: false, 
      message: "Internal server error" 
    });
  }
};

export const checkAuth = async (req, res) => {
  try {
    const user = await User.findById(req.userID).select("-password")
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, user});
  } catch (error) {
    console.log("Error in checkAuth", error);
    return res.status(500).json({ success: false, message: "Internal server error" });
  }
};
