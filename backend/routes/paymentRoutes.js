const express = require("express");
const razorpay = require("razorpay");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const app = express();
var jwt = require("jsonwebtoken");
const paymentRouter = express.Router();
const { userValidation, eventValidation } = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const crypto = require("crypto");
const Payment = require("../models/payment.js");
require("dotenv").config();

paymentRouter.use(express.json());

const instance = new razorpay({
  key_id: process.env.KEY_ID,
  key_secret: process.env.KEY_SECRET,
});

paymentRouter.post(
  "/checkout",
  wrapAsync(async (req, res) => {
    const options = {
      amount: Number(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  })
);

paymentRouter.post("/paymentverification/:id/:amount", async (req, res) => {
  let { id, amount } = req.params;
  res.redirect(`https://community-connect-chads.vercel.app/thanks/${id}/${amount}`);
});

paymentRouter.get("/getkey", (req, res) => {
  res.json({ key: process.env.KEY_ID });
});

module.exports = paymentRouter;
