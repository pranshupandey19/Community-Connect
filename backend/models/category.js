const mongoose = require("mongoose");

const categorySchmema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchmema);

module.exports = Category;