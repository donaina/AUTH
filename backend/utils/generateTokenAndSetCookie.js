import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userID) => {
  // Generate JWT token
  const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set token in HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  // Optionally return token if needed
  // return token;
};