import express from "express";
import {
  addFeedback,
  getPlayerReviews,
  submitReview,
} from "../Controllers/reviewController.js";
import { authenticate, restrict } from "../auth/verifyToken.js";

const router = express.Router();

router.post("/:playerId/reviews", authenticate, restrict(["sponsor", "admin"]), submitReview);
router.get("/:playerId/reviews", getPlayerReviews);
router.post("/feedback/:playerId", authenticate, addFeedback);


export default router;
