// Import required modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const StudyRoom = require("./models/StudyRoom"); // Import your MongoDB model

// Create Express app
const app = express();
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

// Root route for testing
app.get("/", (req, res) => {
  res.send("Backend is live!");
});

// POST route to create a study room
app.post("/study-room", async (req, res) => {
  console.log("📩 POST /study-room hit");
  console.log("🧾 Request body:", req.body);

  const { name } = req.body;

  try {
    const newRoom = await StudyRoom.create({ name });
    console.log("✅ Room created:", newRoom);
    res.status(201).json(newRoom);
  } catch (err) {
    console.error("❌ Error creating room:", err);
    res.status(500).json({ error: "Failed to create room" });
  }
});

// Start the server
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});

