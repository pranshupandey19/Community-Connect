const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    amount:{
        type:Number,
        required: true
    },
    by:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    to:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Organisation"
    }
})

const Donation = mongoose.model("Donation",donationSchema)

module.exports = Donation