// import express from "express";
// import dotenv from "dotenv";
// import { connectDb } from "./db/connectDb.js";
// import authRoutes from "./routes/auth.route.js";
// import cookieParser from "cookie-parser";

// dotenv.config();

// const app = express();
// const port = process.env.PORT || 5000;

// app.use(express.json());
// app.use(cookieParser());

// app.use("/api/auth", authRoutes);

// app.listen(port, () => {
//     connectDb();
//   console.log(`Server started on port ${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDb } from "./db/connectDb.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Add CORS before other middleware
app.use(cors({
  origin: "http://localhost:5000",
  credentials: true
}));

// Middleware
app.use(express.json());// To parse JSON bodies
app.use(cookieParser());// To parse cookies

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});

// Simple request logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(port, () => {
    connectDb();
  console.log(`Server started on port ${port}`);
});