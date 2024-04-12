const mongoose = require("mongoose");

const organisationsSchema = new mongoose.Schema({
  orgname: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  address: {
    type: String,
    required: true,
  },
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
  helps_resolved: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
    },
  ],
  helps_resolving: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
    },
  ],
  helps_received: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
    },
  ],
});

const Organisation = mongoose.model("Organisation", organisationsSchema);

module.exports = Organisation;
