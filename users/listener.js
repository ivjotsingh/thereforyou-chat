const mongoose = require("mongoose");

const ListenerSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  isOnline: {
    type: Boolean,
    default: false,
  },
  isAvailable: {
    type: Boolean,
    default: false,
  },
  sessions: [
    {
      topic: {
        type: Map,
        of: Number,
        required: true,
      },
    },
  ],
  overallRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Listener", ListenerSchema);
