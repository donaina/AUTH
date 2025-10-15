import express from 'express';
import { login, logout, signup, verifyEmail, forgotPassword, resetPassword, checkAuth} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Middleware to verify token (for protected routes)
router.get("/check-auth", verifyToken, checkAuth)

// Signup
router.post("/signup", signup);

// Login
router.post("/login", login);

// Logout
router.post("/logout", logout);

// Email Verification
router.post("/verify-email", verifyEmail);

// Forgot Password
router.post("/forgot-password", forgotPassword);

// Reset Password
router.post("/reset-password/:token", resetPassword);


export default router;