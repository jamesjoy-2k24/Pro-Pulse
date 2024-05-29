import Booking from "../models/BookingSchema.js";
import Player from "../models/PlayerSchema.js";
import Sponsor from "../models/SponsorSchema.js";
import Review from "../models/ReviewSchema.js";
import mongoose from "mongoose";
import Stripe from "stripe";
// import dotenv from "dotenv";
// dotenv.config();
// import { sendSMS } from "../utils/Twilio.js";

// ====== Create bookings for players ========
// export const createBooking =  async (req, res) => {
//   const {playerId, sponsorId} = req.body;

//   try{
//     const booking = new Booking({
//       player: playerId,
//       sponsor: sponsorId
//     });
//     await booking.save();

//     const player = await Player.findById(playerId);
//     const sponsor = await Sponsor.findById(sponsorId);

//     await sendSMS(player.phone, `Booking confirmed for ${player.name} from ${sponsor.name}`);
//     await sendSMS(sponsor.phone, `Booking confirmed for ${player.name} from ${sponsor.name}`);
//     res.status(200).json({
//       success: true,
//       message: "Booking created successfully",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: error.message,
//     });
//   }
// }

// ====== Get checkout session ========

export const getCheckoutSession = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const playerId = req.params.playerId;
    const { sponsorId } = req.body;

    // Validate playerId and sponsorId as ObjectId
    if (
      !mongoose.Types.ObjectId.isValid(playerId) ||
      !mongoose.Types.ObjectId.isValid(sponsorId)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid player or sponsor ID",
      });
    }

    // Fetch the player by ID
    const player = await Player.findById(playerId);
    if (!player) {
      return res.status(404).json({
        success: false,
        message: "Player not found",
      });
    }

    // Fetch the sponsor by ID
    const sponsor = await Sponsor.findById(sponsorId);
    if (!sponsor) {
      return res.status(404).json({
        success: false,
        message: "Sponsor not found",
      });
    }

    // Ensure player.price is a valid number
    if (isNaN(player.price) || player.price == null) {
      return res.status(400).json({
        success: false,
        message: "Invalid player price",
      });
    }

    // Initialize Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      // success_url: `${process.env.CLIENT_URL}/checkout-success`,
      success_url: `${process.env.CLIENT_URL}/checkout-success?playerId=${player._id}`,
      cancel_url: `${req.protocol}://${req.get("host")}/players/${player._id}`,

      client_reference_id: playerId,
      line_items: [
        {
          price_data: {
            currency: "lkr",
            unit_amount: player.price * 100, // Stripe expects amount in cents
            product_data: {
              name: player.name,
              description: player.bio || "No description available",
              images: [player.photo],
            },
          },
          quantity: 1,
        },
      ],
    });

    // Create and save a new booking
    const booking = new Booking({
      sponsor: sponsor._id,
      player: player._id,
      price: player.price,
      sessionId: session.id,
    });

    await booking.save();

    res.status(200).json({
      success: true,
      session,
      message: "Booking session created successfully",
    });
  } catch (error) {
    console.error("Error during booking session creation:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====== Payment success ========

export const paymentSuccess = async (req, res) => {
  try {
    const booking = await Booking.findById(req.body.data.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    booking.status = "approved";
    booking.isPaid = true;
    await booking.save();
    res.status(200).json({
      success: true,
      message: "Payment successful",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ====== Get all bookings =========

export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("player", "name photo")
      .populate("sponsor", "name photo");
    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ====== Delete booking ========
export const deleteBooking = async (req, res) => {
  const { id } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Booking deleted successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


