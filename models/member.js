const mongoose = require("mongoose");

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
        type: Map,
        of: Number,
        required: "Enter topic ",
      },
    },
  ],
  overallRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Member", MemberSchema);
