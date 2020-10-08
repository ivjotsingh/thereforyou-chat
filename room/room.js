const mongoose = require("mongoose");

const RoomSchema = mongoose.Schema({
  roomName: {
    type: String,
    required: true,
    unique: true,
    maxlength: 40,
    minlength: 4,
  },
  users: {
    type: [mongoose.Schema.Types.ObjectId],
    maxlength: 2,
    minlength: 1,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
