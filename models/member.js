const mongoose = require("mongoose");

const Topic = require("./topic");

const MemberSchema = mongoose.Schema({
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
        type: Topic,
        required: true,
      },
      overallRating: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("Member", MemberSchema);
