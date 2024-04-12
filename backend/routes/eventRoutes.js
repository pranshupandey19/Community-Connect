const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const app = express();
var jwt = require("jsonwebtoken");
const eventRouter = express.Router();
const { userValidation, eventValidation } = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const Event = require("../models/event.js");
const Institution = require("../models/institution.js");
require("dotenv").config();

eventRouter.use(express.json());

const validateEvent = (req, res, next) => {
  let { error } = eventValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

const jwtVerify = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let result = jwt.verify(authorization, process.env.JWT_PASS);
    if (result.type == "Institution") {
      req.body.institution = result.data.name;
      next();
    } else {
      throw new ExpressError(
        403,
        "Not authorised to access this route without correct auth token"
      );
    }
  } catch (err) {
    throw new ExpressError(
      403,
      "Not authorised to access this route without correct auth token"
    );
  }
};

const userJWT = (req, res, next) => {
  try {
    let { authorization } = req.headers;
    let result = jwt.verify(authorization, process.env.JWT_PASS);
    req.body.username = result.data.username;
    next();
  } catch (err) {
    throw new ExpressError(
      403,
      "Not authorised to access this route without correct auth token"
    );
  }
};

eventRouter.post(
  "/new",
  jwtVerify,
  validateEvent,
  wrapAsync(async (req, res) => {
    let { name, description, image, volunteers, institution, budget, date} =
      req.body;
    let findinsti = await Institution.find({ name: institution });
    if (findinsti.length != 0) {
      let newData = new Event({
        name: name,
        description: description,
        image: image,
        volunteers: volunteers,
        budget: budget,
        date: date
      });
      newData.institution = findinsti[0];
      await newData.save();

      res.send("added");
    } else {
      throw new ExpressError(404, "Institution not found");
    }
  })
);

eventRouter.post(
  "/volunteer",
  userJWT,
  wrapAsync(async (req, res) => {
    let eventFind = await Event.findById(req.body.id);
    let userFind = await User.findOne({ username: req.body.username });
    if (userFind.length != 0) {
      eventFind["registered_volunteers"].push(userFind);
      const newVolunteers = eventFind["volunteers"] - 1;
      eventFind["volunteers"] = newVolunteers;
      await eventFind.save();
      userFind["volunteering"].push(eventFind);
      await userFind.save();
      res.send("DONE");
    } else {
      throw new ExpressError(404, "User not found!");
    }
  })
);

eventRouter.get(
  "/all",
  wrapAsync(async (req, res) => {
    let events = await Event.find({}).populate("registered_volunteers");
    if (events.length == 0) {
      throw new ExpressError(404, "No events");
    } else {
      res.send(events);
    }
  })
);

eventRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = eventRouter;