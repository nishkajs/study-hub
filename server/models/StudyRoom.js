const mongoose = require("mongoose");

const StudyRoomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("StudyRoom", StudyRoomSchema);

