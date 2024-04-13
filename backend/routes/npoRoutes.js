const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const app = express();
var jwt = require("jsonwebtoken");
const npoRouter = express.Router();
const {
  userValidation,
  eventValidation,
  npoValidation,
} = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const Event = require("../models/event.js");
const Institution = require("../models/institution.js");
const Organisation = require("../models/organisation.js");
const NPO = require("../models/npo.js");
require("dotenv").config();

npoRouter.use(express.json());

const validateEvent = (req, res, next) => {
  let { error } = npoValidation.validate(req.body);
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
    if (result.type == "Organization") {
      req.body.organisation = result.data.orgname;
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

npoRouter.post(
  "/new",
  jwtVerify,
  validateEvent,
  wrapAsync(async (req, res) => {
    let { name, description, image, volunteers, organisation, date, address } =
      req.body;
    let findinsti = await Organisation.find({ orgname: organisation });
    if (findinsti.length != 0) {
      let newData = new NPO({
        name: name,
        description: description,
        image: image,
        volunteers: volunteers,
        date: date,
        address: address,
      });
      newData.organisation = findinsti[0];
      await newData.save();

      res.send("added");
    } else {
      throw new ExpressError(404, "Organisation not found");
    }
  })
);

npoRouter.post(
  "/volunteer",
  userJWT,
  wrapAsync(async (req, res) => {
    let eventFind = await NPO.findById(req.body.id);
    let userFind = await User.findOne({ username: req.body.username });
    if (userFind.length != 0) {
      eventFind["registered_volunteers"].push(userFind);
      const newVolunteers = eventFind["volunteers"] - 1;
      eventFind["volunteers"] = newVolunteers;
      await eventFind.save();
      userFind["volunteering2"].push(eventFind);
      await userFind.save();
      res.send("DONE");
    } else {
      throw new ExpressError(404, "User not found!");
    }
  })
);

npoRouter.get(
  "/all",
  wrapAsync(async (req, res) => {
    let events = await NPO.find({}).populate([
      "registered_volunteers",
      "organisation",
    ]);
    if (events.length == 0) {
      throw new ExpressError(404, "No events");
    } else {
      res.send(events);
    }
  })
);

npoRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = npoRouter;