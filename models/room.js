const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    max: 40,
    min: 4,
  },
  users: {
    type: Array,
    max: 2,
    min: 1,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
