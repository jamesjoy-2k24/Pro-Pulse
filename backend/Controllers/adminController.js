import Admin from "../models/AdminSchema.js";
import Player from "../models/PlayerSchema.js";
import Sponsor from "../models/SponsorSchema.js";

// Get Single admin profile
export const getSingleAdmin = async (req, res) => {
  const { id } = req.params;

  try {
    const admin = await Admin.findById(id);

    if (!admin) {
      return res
        .status(404)
        .json({ message: "Admin not found", success: false });
    }

    res.status(200).json({ admin, success: true });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Approve Player
export const approvePlayer = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const player = await Player.findByIdAndUpdate(
      id,
      { isApproved: status },
      { new: true }
    );

    if (!player) {
      return res
        .status(404)
        .json({ message: "Player not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Player status updated", success: true, player });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Approve Sponsor
export const approveSponsor = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const sponsor = await Sponsor.findByIdAndUpdate(
      id,
      { isApproved: status },
      { new: true }
    );

    if (!sponsor) {
      return res
        .status(404)
        .json({ message: "Sponsor not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Sponsor status updated", success: true, sponsor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Decline Player
export const declinePlayer = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const player = await Player.findByIdAndUpdate(
      id,
      { isApproved: status },
      { new: true }
    );

    if (!player) {
      return res
        .status(404)
        .json({ message: "Player not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Player status updated", success: true, player });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// Decline Sponsor
export const declineSponsor = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const sponsor = await Sponsor.findByIdAndUpdate(
      id,
      { isApproved: status },
      { new: true }
    );

    if (!sponsor) {
      return res
        .status(404)
        .json({ message: "Sponsor not found", success: false });
    }

    res
      .status(200)
      .json({ message: "Sponsor status updated", success: true, sponsor });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", success: false });
  }
};
