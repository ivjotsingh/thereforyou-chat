const mongoose = require("mongoose");

const Topic = require("./topic");

const ListenerSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  isActive: {
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