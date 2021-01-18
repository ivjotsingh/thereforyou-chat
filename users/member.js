const mongoose = require("mongoose");

const MemberSchema = mongoose.Schema({
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
  sessions: {
    //Map of session name to rating
    type: Map,
    of: Number,
    required: "Enter topic ",
  },
  overallRating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Member", MemberSchema);
