import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
  },
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
    required: true,
  },
  sponsor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sponsor",
    required: true,
  },
});

// populate the player and sponsor fields name and photo
reviewSchema.pre("findOne", function () {
  this.populate("player", "name photo");
  this.populate("sponsor", "name photo");
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
