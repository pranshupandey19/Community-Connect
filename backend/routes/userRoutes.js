const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const app = express();
const userRouter = express.Router();
var jwt = require("jsonwebtoken");
const { userValidation } = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const Institution = require("../models/institution.js");
require("dotenv").config();

userRouter.use(express.json());

const validateUser = (req, res, next) => {
  let { error } = userValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

userRouter.post(
  "/signup",
  validateUser,
  wrapAsync(async (req, res) => {
    // console.log(req.body)
    let { username, name, password, address, institution, contact } = req.body;
    let findUser = await User.find({ username: req.body.username });
    if (findUser.length == 0) {
      let findInsti = await Institution.find({ name: institution });
      if (findInsti.length != 0) {
        let newUser = new User({
          username: username,
          name: name,
          password: password,
          address: address,
          contact: contact,
        });
        newUser.institution = findInsti[0];
        let token = jwt.sign(
          {
            data: {
              username: username,
              name: name,
              address: address,
              institution: findInsti[0],
            },
            type: "User",
          },
          process.env.JWT_PASS
        );
        await newUser.save();
        res.send(token);
      } else {
        throw new ExpressError(404, "Institution not found");
      }
    } else {
      throw new ExpressError(400, "Username Exists");
    }
  })
);

userRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let findData = req.body;
    let result = await User.find({ username: req.body.username });
    if (result.length != 0) {
      if (result[0].password == req.body.password) {
        let insti = await Institution.findById(result[0].institution);
        let token = jwt.sign(
          {
            data: {
              username: result[0].username,
              name: result[0].name,
              address: result[0].address,
              institution: insti,
            },
            type: "User",
          },
          process.env.JWT_PASS
        );
        res.send(token);
      } else {
        throw new ExpressError(401, "Wrong Password");
      }
    } else {
      throw new ExpressError(404, "Username does not exist");
    }
  })
);

userRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = userRouter;
