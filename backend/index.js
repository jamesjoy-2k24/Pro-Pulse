/** @format */

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import helmet from "helmet";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import adminRoute from "./Routes/admin.js";
import playerRoute from "./Routes/player.js";
import bookingRoute from "./Routes/booking.js";
import reviewRoute from "./Routes/review.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: "https://pro-pulse.netlify.app",
  // origin: 'https://pro-pulse-org.onrender.com',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/players", playerRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/reviews", reviewRoute);

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, "../../frontend/build")));

// Catch-all route to serve index.html for any non-API requests
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../frontend/build", "index.html"));
});

// Connect to MongoDB
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
}

async function startServer() {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();

// Add helmet middleware before defining your routesapp.use(helmet({app.use(helmet({
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "https://cdn.jsdelivr.net",
          "https://cdnjs.cloudflare.com",
        ], // Tailwind CSS and other script sources
        imgSrc: [
          "'self'",
          "https://pro-pulse-da2011376672.herokuapp.com",
          "https://res.cloudinary.com",
          "'self' data:",
        ], // Cloudinary for images and 'self' for inline data
        styleSrc: [
          "'self'",
          "https://fonts.googleapis.com",
          "https://cdnjs.cloudflare.com",
        ], // Google Fonts and other style sources
        fontSrc: [
          "'self'",
          "https://fonts.gstatic.com",
          "https://cdnjs.cloudflare.com",
        ], // Google Fonts and other font sources
        connectSrc: ["'self'"], // Allow connections only to same-origin
        // Add more directives as needed
      },
    },
  }),
);

app.get("/", (req, res) => {
  res.send("Server is running!!!");
});
