import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Player",
  },
  sponsor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Sponsor",
  },
  price: {
    type: String,
    required: true,
  },
  sessionId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: "paid",
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
});

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "player",
    select: "name photo",
  });
  this.populate({
    path: "sponsor",
    select: "name photo",
  });
  next();
});
export default mongoose.model("Booking", bookingSchema);
