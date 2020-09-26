const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  messageText: {
    type: String,
    required: true,
    max: 1500,
    min: 1,
  },
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
