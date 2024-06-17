import express from "express";
import {
  getSingleAdmin,
  pendingPlayers,
} from "../Controllers/adminController.js";
import {
  approvePlayer,
  declinePlayer,
  approveSponsor,
  declineSponsor,
} from "../Controllers/adminController.js";

const router = express.Router();

// Routes
router.get("/:id", getSingleAdmin);
router.patch("/approve-player/:id", approvePlayer);
router.patch("/decline-player/:id", declinePlayer);
router.patch("/pending-player/:id", pendingPlayers);
router.patch("/approve-sponsor/:id", approveSponsor);
router.patch("/decline-sponsor/:id", declineSponsor);

export default router;
