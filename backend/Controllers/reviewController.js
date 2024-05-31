import Review from "../models/ReviewSchema.js";

// ============= Review =============
export const submitReview = async (req, res) => {
  const { rating, comment } = req.body;
  const { playerId } = req.params;
  const sponsorId = req.body.sponsorId;

  try {
    const review = new Review({
      rating,
      comment,
      player: playerId,
      sponsor: sponsorId,
    });

    await review.save();
    res
      .status(201)
      .json({ success: true, message: "Review submitted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//  ============= Get player reviews =============
export const getPlayerReviews = async (req, res) => {
  const { playerId } = req.params;

  try {
    const reviews = await Review.find({ player: playerId }).populate(
      // name and photo
      "player sponsor",
      "name photo"
    );
    const averageRatings =
      reviews.reduce((sum, review) => sum + review.rating, 0) /
        reviews.length || 0;
    const averageRating = Number(averageRatings.toFixed(2)).toLocaleString('en-US', {
      minimumFractionDigits: averageRatings % 1 === 0 ? 0 : 2,
      maximumFractionDigits: averageRatings % 1 === 0 ? 0 : 2,
    });

    res.status(200).json({
      success: true,
      reviews,
      averageRating,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ============= Add feedback =============
export const addFeedback = async (req, res) => {
  const { playerId } = req.params;
  const { rating, comment } = req.body;
  const sponsorId = req.body.sponsorId;

  try {
    const newReview = new Review({
      player: playerId,
      sponsor: sponsorId,
      rating,
      comment,
    });

    await newReview.save();
    res.status(201).json({
      success: true,
      message: "Feedback added successfully",
      review: newReview,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

