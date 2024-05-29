import Player from "../models/PlayerSchema.js";
import Booking from "../models/BookingSchema.js";

// ===== Update Player ======
export const updatePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and update the player
    const updatedPlayer = await Player.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    // Return the updated player
    res.status(200).json(updatedPlayer);
  } catch (error) {
    // Return the error
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// ===== Delete Player =====
export const deletePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find and delete the player
    await Player.findByIdAndDelete(id);

    // Return a success message
    res.status(200).json({ message: "Player has been deleted" });
  } catch (error) {
    // Return the error
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get Single Player
export const getSinglePlayer = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the player
    const singlePlayer = await Player.findById(id).select("-password");

    // Return the player
    res.status(200).json({ data: singlePlayer });
  } catch (error) {
    // Return the error
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Get all players
export const getAllPlayers = async (req, res) => {
  try {
    const players = await Player.find();
    res.status(200).json({ success: true, data: players });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Player Profile
export const getPlayerProfile = async (req, res) => {
  const playerId = req.userId;

  // Debug: Log the ID to ensure it is correct
  console.log(`Received ID: ${playerId}`);

  try {
    const player = await Player.findById(playerId);

    if (!player) {
      // Player not found
      return res.status(404).json({ message: "Player not found" });
    }

    const { password, ...rest } = player._doc;
    const appointments = await Booking.find({ player: playerId });

    // Success response
    res.status(200).json({
      success: true,
      message: "Player profile retrieved successfully",
      data: { ...rest, appointments },
    });
  } catch (error) {
    // Log the error to the console
    console.error(`Error retrieving player profile: ${error.message}`);

    // Error response
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// =========== Get Player Bookings ===========
export const getPlayerBookings = async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await Booking.find({ player: id })
      .populate("player", "name photo")
      .populate("sponsor", "name photo");

    if (!bookings || bookings.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No bookings found for this player",
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

// =========== Get verified Players ============
// controllers/playerController.js
export const getApprovedPlayers = async (req, res) => {
  try {
    const players = await Player.find({ isApproved: "approved" });
    res.status(200).json({
      success: true,
      players,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
