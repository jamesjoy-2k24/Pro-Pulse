import express from "express";
import {
  updatePlayer,
  deletePlayer,
  getAllPlayers,
  getSinglePlayer,
  getPlayerProfile,
  getPlayerBookings,
  getApprovedPlayers,
} from "../Controllers/playerController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";
import reviewRouter from "./review.js";

const router = express.Router();

// Nested Routes
router.use(
  "/:playerId/reviews",
  authenticate, 
  restrict(["sponsor", "admin"]),
  reviewRouter
);

// Routes
router.get("/:id", getSinglePlayer);
router.get("/", getAllPlayers);
router.put("/:id", authenticate, restrict(["player"]), updatePlayer);
router.delete(
  "/:id",
  authenticate,
  restrict(["player", "admin"]),
  deletePlayer
);
router.get(
  "/profile/me/",
  authenticate,
  restrict(["player"]),
  getPlayerProfile
);
router.get("/approved", getApprovedPlayers);
router.get(
  "/bookings/player-bookings/:id",
  authenticate,
  restrict(["player"]),
  getPlayerBookings
);

export default router;
