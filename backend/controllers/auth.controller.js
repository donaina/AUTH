import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs"; 
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie.js";
import { sendVerificationEmail, sendWelcomeEmail } from "../utils/sendEmail.js";

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
    
    return res.status(200).json({success: true, message: "Email verified successfully."});
  } catch (error){
    return res.status(500).json({success: false, message: "Internal server error"});
  }
}

// Placeholder login function
export const login = async (req, res) => {
  res.send("Login Route");
}
// Placeholder logout function
export const logout = async (req, res) => {
  res.send("Logout Route");
}