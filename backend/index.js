import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import cookieParser from "cookie-parser";
import helmet from "helmet"; // Add this line

import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import adminRoute from "./Routes/admin.js";
import playerRoute from "./Routes/player.js";
import bookingRoute from "./Routes/booking.js";
import reviewRoute from "./Routes/review.js";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, // access-control-allow-credentials:true
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Add helmet middleware before defining your routes
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
        ], // Cloudinary for images
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
  })
);

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/players", playerRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/reviews", reviewRoute);

// Database connection
mongoose.set("strictQuery", false);
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Successfully connected");
  } catch (error) {
    console.log(error);
  }
};

async function startServer() {
  await connectDB();
}

startServer();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the React frontend app
app.use(express.static(join(__dirname, "../frontend/dist")));

// Anything that doesn't match the API routes should send the index.html from the frontend build
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, "../frontend/dist", "index.html"));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
