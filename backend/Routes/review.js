import express from "express";
import {
  addFeedback,
  getPlayerReviews,
  submitReview,
} from "../Controllers/reviewController.js";
import { authenticate } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/:playerId/reviews", submitReview);
router.get("/:playerId/reviews", getPlayerReviews);
router.post("/feedback/:playerId", authenticate, addFeedback);


export default router;
