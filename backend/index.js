import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import helmet from "helmet";

import authRoute from "./Routes/auth.js";
import userRoute from "./Routes/user.js";
import adminRoute from "./Routes/admin.js";
import playerRoute from "./Routes/player.js";
import bookingRoute from "./Routes/booking.js";
import reviewRoute from "./Routes/review.js";

dotenv.config();

const app = express();
const port = 5001 || process.env.PORT;

const corsOptions = {
  origin: "http://localhost:3000",
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

dotenv.config();

// Logging environment variables for debugging
console.log("Mongo URI:", process.env.MONGO_URI);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI.trim(), {
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
  })
);

// HEROKU
// app.get("/*", function (req, res) {
//   res.sendFile(
//     path.join(__dirname + "../frontend/build/index.html"),
//     function (err) {
//       if (err) {
//         res.status(500).send(err);
//       }
//     }
//   );
// });

if(process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
}
