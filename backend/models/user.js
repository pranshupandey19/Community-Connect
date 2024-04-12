const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  userProfilePic: {
    type: String,
    default:
      "https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png",
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  institution: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Institution",
  },
  donations: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Donation",
    },
  ],
  helps: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Help",
    },
  ],
  contact: {
    phone: {
      type: Number,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  volunteering: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  volunteering2: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NPO",
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
