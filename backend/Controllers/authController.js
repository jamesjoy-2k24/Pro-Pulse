import Player from "../models/PlayerSchema.js";
import Sponsor from "../models/SponsorSchema.js";
import Admin from "../models/AdminSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const generateToken = (user) => {
  try {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error("Token generation error:", error); // Log any errors
    throw new Error("Token generation failed");
  }
};

export const register = async (req, res) => {
  const { email, password, name, role, phone, photo, gender } = req.body;
  try {
    let user = null;

    if (role === "admin") {
      user = await Admin.findOne({ email });
    } else if (role === "sponsor") {
      user = await Sponsor.findOne({ email });
    } else if (role === "player") {
      user = await Player.findOne({ email });
    }

    // Check if user already exists
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create new user
    if (role === "admin") {
      user = new Admin({
        adminId: new mongoose.Types.ObjectId(),
        name,
        email,
        password: hashPassword,
        role,
        photo,
      });
    } else if (role === "sponsor") {
      user = new Sponsor({
        sponsorId: new mongoose.Types.ObjectId(),
        name,
        email,
        phone,
        password: hashPassword,
        role,
        gender,
        photo,
      });
    } else if (role === "player") {
      user = new Player({
        playerId: new mongoose.Types.ObjectId(),
        name,
        email,
        phone,
        password: hashPassword,
        role,
        gender,
        photo,
      });
    }

    await user.save();

    res
      .status(200)
      .json({ success: true, message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};


export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    let user = null;

    // Check if user exists
    const admin = await Admin.findOne({ email });
    const sponsor = await Sponsor.findOne({ email });
    const player = await Player.findOne({ email });

    // Log to debug which user type is found
    console.log("Admin:", admin);
    console.log("Sponsor:", sponsor);
    console.log("Player:", player);

    // If user does not exist
    if (!sponsor && !player && !admin) {
      return res.status(400).json({ message: "User does not exist" });
    }

    // If user exists
    if (admin) {
      user = admin;
    } else if (sponsor) {
      user = sponsor;
    } else if (player) {
      user = player;
    }

    // Log to check the user object
    console.log("User:", user);

    // Check if password is correct
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // If password is correct Generate Token
    const token = generateToken(user);

    // Log the generated token
    console.log("Generated Token:", token);

    const { password, role, appointments, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      role,
      user: rest,
    });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).json({ success: false, message: error.message });
  }
};
