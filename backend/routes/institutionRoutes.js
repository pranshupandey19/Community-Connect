const express = require("express");
const institutionRouter = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const app = express();
var jwt = require("jsonwebtoken");
const {
  userValidation,
  institutionValidation,
} = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const Institution = require("../models/institution.js");
require("dotenv").config();

institutionRouter.use(express.json());

const validateInstitution = (req, res, next) => {
  let { error } = institutionValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

institutionRouter.get(
  "/",
  wrapAsync(async (req, res) => {
    let result = await Institution.find({});
    res.send(result);
  })
);

institutionRouter.post(
  "/signup",
  validateInstitution,
  wrapAsync(async (req, res) => {
    let newData = new Institution(req.body);
    await newData.save();
    let token = jwt.sign(
      {
        data: {
          name: req.body.name,
          address: req.body.address,
          description: req.body.description,
        },
        type: "Institution",
      },
      process.env.JWT_PASS
    );
    res.send(token);
  })
);

institutionRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let findData = req.body;
    let result = await Institution.find({ name: req.body.name });
    if (result.length != 0) {
      if (result[0].password == req.body.password) {
        let token = jwt.sign(
          {
            data: {
              name: result[0].name,
              address: result[0].address,
              description: result[0].description,
            },
            type: "Institution",
          },
          process.env.JWT_PASS
        );
        res.send(token);
      } else {
        throw new ExpressError(401, "Wrong Password");
      }
    } else {
      throw new ExpressError(404, "Institution not found");
    }
  })
);

institutionRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = institutionRouter;
