const mongoose = require("mongoose");

const npoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  volunteers: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  registered_volunteers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  organisation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organisation",
  },
});

const NPO = mongoose.model("NPO", npoSchema);

module.exports = NPO;
