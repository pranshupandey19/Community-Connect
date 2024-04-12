const mongoose = require("mongoose");

const helpSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  image: {
    type: String,
  },
  state: {
    type: String,
    default: "unresolved",
    enum: ["unresolved", "resolving", "resolved"],
  },
});

const Help = mongoose.model("Help", helpSchema);

module.exports = Help;
