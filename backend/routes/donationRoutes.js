const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const Donation = require("../models/donation.js");
const User = require("../models/user.js");
const Organisation = require("../models/organisation.js");
const donationRouter = express.Router();
require("dotenv").config();

donationRouter.use(express.json());

donationRouter.post(
  "/new/:id/",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { username, amount } = req.body;
    let findUser = await User.findOne({ username: username });
    if (findUser != null) {
      let findOrg = await Organisation.findById(id);
      if (findOrg != null) {
        let newData = new Donation({
          amount: amount,
          by: findUser,
          to: findOrg,
        });
        await newData.save();
        res.send("Saved!");
      } else {
        throw new ExpressError(404, "Organization not found!");
      }
    } else {
      throw new ExpressError(404, "User not found!");
    }
  })
);

donationRouter.get(
  "/all",
  wrapAsync(async (req, res) => {
    let result = await Donation.find({}).populate("to").populate("by");
    if (result.length != 0) {
      res.send(result);
    } else {
      throw new ExpressError(400, "No donations!");
    }
  })
);

donationRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = donationRouter;
