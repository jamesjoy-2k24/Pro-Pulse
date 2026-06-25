console.log("Starting seed script...");

import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import Admin from "./models/AdminSchema.js";
import Player from "./models/PlayerSchema.js";
import Sponsor from "./models/SponsorSchema.js";

dotenv.config();

console.log("Loaded environment variables");

// Connect to MongoDB
async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}

// Dummy data
const dummyData = {
  admin: {
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
    photo: "https://example.com/admin-photo.jpg",
  },
  players: [
    {
      name: "John Doe",
      email: "john@example.com",
      password: "password123",
      phone: "+94123456789",
      bio: "Professional cricket player",
      photo: "https://example.com/john-photo.jpg",
      place: "Colombo",
      price: 500,
      club: ["Colombo Cricket Club"],
      team: "Sri Lanka National Team",
      sports: ["Cricket"],
      position: "Batsman",
      gender: "Male",
      age: 28,
      experiences: ["Played in IPL 2023", "National Team Player since 2020"],
      about: "A passionate cricketer with 8 years of professional experience.",
      isApproved: "approved",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      password: "password123",
      phone: "+94987654321",
      bio: "Professional volleyball player",
      photo: "https://example.com/jane-photo.jpg",
      place: "Kandy",
      price: 400,
      club: ["Kandy Volleyball Club"],
      team: "Sri Lanka Women's Volleyball Team",
      sports: ["Volleyball"],
      position: "Setter",
      gender: "Female",
      age: 25,
      experiences: ["Asian Games 2022 participant", "National Champion 2021"],
      about: "Dedicated volleyball player aiming for international success.",
      isApproved: "approved",
    },
  ],
  sponsors: [
    {
      name: "ABC Sports",
      email: "abc@example.com",
      password: "sponsor123",
      phone: "+94111222333",
      bio: "Sports equipment sponsor",
      photo: "https://example.com/abc-photo.jpg",
      place: "Galle",
    },
    {
      name: "XYZ Brands",
      email: "xyz@example.com",
      password: "sponsor123",
      phone: "+94444555666",
      bio: "Apparel and sports gear sponsor",
      photo: "https://example.com/xyz-photo.jpg",
      place: "Negombo",
    },
  ],
};

async function seedDatabase() {
  await connectDB();

  try {
    console.log("Clearing existing data...");
    // Clear existing data
    await Admin.deleteMany({});
    await Player.deleteMany({});
    await Sponsor.deleteMany({});

    console.log("Hashing passwords...");
    // Hash passwords
    const hashedAdminPassword = await bcrypt.hash(dummyData.admin.password, 10);
    const hashedPlayerPasswords = await Promise.all(
      dummyData.players.map((player) => bcrypt.hash(player.password, 10)),
    );
    const hashedSponsorPasswords = await Promise.all(
      dummyData.sponsors.map((sponsor) => bcrypt.hash(sponsor.password, 10)),
    );

    console.log("Creating admin...");
    // Create admin
    const admin = new Admin({
      ...dummyData.admin,
      password: hashedAdminPassword,
    });
    await admin.save();

    console.log("Creating players...");
    // Create players
    const players = dummyData.players.map((player, index) => ({
      ...player,
      password: hashedPlayerPasswords[index],
      playerId: new mongoose.Types.ObjectId(),
    }));
    await Player.insertMany(players);

    console.log("Creating sponsors...");
    // Create sponsors
    const sponsors = dummyData.sponsors.map((sponsor, index) => ({
      ...sponsor,
      password: hashedSponsorPasswords[index],
      sponsorId: new mongoose.Types.ObjectId(),
    }));
    await Sponsor.insertMany(sponsors);

    console.log("\nDatabase seeded successfully!");
    console.log("- Admin: admin@example.com / admin123");
    console.log(
      "- Players: john@example.com / password123, jane@example.com / password123",
    );
    console.log(
      "- Sponsors: abc@example.com / sponsor123, xyz@example.com / sponsor123",
    );

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    await mongoose.disconnect();
    process.exit(1);
  }
}

seedDatabase();
