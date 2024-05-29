// import express from "express";
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const adminRoute = require("./routes/admin");
const playerRoute = require("./routes/players");
const bookingRoute = require("./routes/bookings");
const reviewRoute = require("./routes/reviews");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

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
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

startServer();

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Anything that doesn't match the API routes should send the index.html from the frontend build
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});
