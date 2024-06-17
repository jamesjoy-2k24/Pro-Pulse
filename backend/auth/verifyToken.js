import jwt from "jsonwebtoken";
import Player from "../models/PlayerSchema.js";
import Sponsor from "../models/SponsorSchema.js";
import Admin from "../models/AdminSchema.js";

export const authenticate = async (req, res, next) => {
  const authToken = req.headers.authorization;

  if (!authToken || !authToken.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized: No token provided or token format is incorrect",
    });
  }

  try {
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.userId = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Unauthorized: Token expired" });
    }
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  const role = req.role;

  if (!userId || !role) {
    return res
      .status(401)
      .json({ message: "Unauthorized: Missing user ID or role" });
  }

  try {
    let user;

    if (role === "admin") {
      user = await Admin.findById(userId);
    } else if (role === "sponsor") {
      user = await Sponsor.findById(userId);
    } else if (role === "player") {
      user = await Player.findById(userId);
    }

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!roles.includes(user.role)) {
      return res.status(403).json({
        message: "Forbidden: You are not authorized to access this resource",
        role: user.role,
      });
    }

    next();
  } catch (error) {
    console.error("Error in role restriction:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
