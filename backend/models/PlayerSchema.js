import mongoose from "mongoose";

const playerSchema = new mongoose.Schema({
  playerId: {
    type: mongoose.Schema.Types.ObjectId,
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
  name: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },
  nic: {
    type: String,
  },
  photo: {
    type: String,
  },
  role: {
    type: String,
    default: "player",
  },
  place: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },

  // Fields for player
  price: {
    type: Number,
    default: 300,
  },
  club: {
    type: [String],
  },
  team: {
    type: String,
  },
  sports: {
    type: [String],
  },
  position: {
    type: String,
  },
  gender: {
    type: String,
  },
  age: {
    type: Number,
  },
  experiences: {
    type: Array,
  },
  about: {
    type: String,
  },
  reviews: [
    {
      reviewer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
        select: "name photo",
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  isApproved: {
    type: String,
    enum: ["pending", "approved", "declined"],
    default: "pending",
  },
  available: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  token: String,
  bookings: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
  },
});

export default mongoose.model("Player", playerSchema);
