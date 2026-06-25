console.log("Testing seed script...");

// Import the necessary modules directly
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

async function testDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected successfully!");
    
    await mongoose.disconnect();
    console.log("Disconnected.");
  } catch (error) {
    console.error("Error:", error);
  }
}

testDB();
