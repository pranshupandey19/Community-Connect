const mongoose = require("mongoose");

require("dotenv").config({ path: "../.env" });

async function main() {
  await mongoose.connect(process.env.MONGO_KEY);
}

module.exports = { main };
