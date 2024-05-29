import express from "express";
import { authenticate } from "../auth/verifyToken.js";
import {
  getCheckoutSession,
  paymentSuccess,
  getBookings,
  deleteBooking,
} from "../Controllers/bookingController.js";

const router = express.Router();

// router.post("/createBooking", authenticate, createBooking);
router.get("/", authenticate, getBookings);
router.post("/payment-success", paymentSuccess);
router.post("/checkout-session/:playerId", authenticate, getCheckoutSession);
router.delete("/:id", authenticate, deleteBooking);

export default router;
