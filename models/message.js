const mongoose = require("mongoose");

const MessageSchema = mongoose.Schema({
  messageText: {
    type: String,
    required: true,
    maxlength: 1500,
    minlength: 1,
  },
  from: {
    type: mongoose.Schema.Types.ObjectId, //user_id
    required: true,
  },
  to: {
    type: mongoose.Schema.Types.ObjectId, //room_id
    required: true,
  },

  timeStamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", MessageSchema);
