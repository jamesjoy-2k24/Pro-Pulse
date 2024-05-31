import Sponsor from "../models/SponsorSchema.js";
import Booking from "../models/BookingSchema.js";
// import Player from "../models/PlayerSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// ======== Update a single sponsor ========
export const updateSponsor = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedSponsor = await Sponsor.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(req.body.password, salt);
      updatedSponsor.password = hash;
    }

    const token = jwt.sign(
      { _id: updatedSponsor._id, role: updatedSponsor.role },
      process.env.JWT_SECRET_KEY
    );

    updatedSponsor.token = token;

    // Return the updated sponsor
    res.status(200).json(updatedSponsor);
  } catch (error) {
    // Return the error
    res.status(500).json(error);
  }
};

// ========= Delete a single sponsor =========
export const deleteSponsor = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the sponsor
    await Sponsor.findByIdAndDelete(id);

    // Return a success message
    res.status(200).json("Sponsor has been deleted");
  } catch (error) {
    // Return the error
    res.status(500).json(error);
  }
};

// ======== Get Single sponsor =========
export const getSingleSponsor = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the sponsor
    const singleSponsor = await Sponsor.findById(id).select("-password");

    // Return the sponsor
    res.status(200).json(singleSponsor);
  } catch (error) {
    // Return the error
    res.status(500).json(error);
  }
};

// ========= Get All sponsors =========
export const getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find().select("-password");
    res.status(200).json({ data: sponsors, message: "Sponsors retrieved" });
  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ========= Get sponsor profile =========
export const getSponsorProfile = async (req, res) => {
  const sponsorId = req.sponsorId;
  try {
    const sponsor = await Sponsor.findById(req.userId);

    if (!sponsor) {
      return res.status(404).json({
        success: false,
        message: "Sponsor not found",
        data: null,
      });
    }

    const data = sponsor._doc;

    res.status(200).json({
      success: true,
      message: "Sponsor profile retrieved successfully",
      data: data,
    });
  } catch (error) {
    console.error("Error retrieving sponsor profile:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// ====== Get sponsor bookings ========
export const getSponsorBookings = async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await Booking.find({ sponsor: id }).populate(
      "player",
      "name photo"
    );

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this sponsor",
      });
    }

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
