import mongoose from "mongoose";

const sponsorSchema = new mongoose.Schema({
  sponsorId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },
  place: {
    type: String,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    default: "sponsor",
  },
  price: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isApproved: {
    type: String,
    enum: ["approved", "declined"],
    default: "approved",
  },
  bookings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
  reviews: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Review",
  },
});

export default mongoose.model("Sponsor", sponsorSchema);
