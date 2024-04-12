const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const app = express();
const orgRouter = express.Router();
var jwt = require("jsonwebtoken");
const { userValidation, orgValidation } = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const Organisation = require("../models/organisation.js");
const Category = require("../models/category.js");
require("dotenv").config();

orgRouter.use(express.json());

const validateOrg = (req, res, next) => {
  let { error } = orgValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

orgRouter.get(
  "/",
  wrapAsync(async (req, res) => {
    let result = await Organisation.find().populate("category");
    if (result.length == 0) {
      throw new ExpressError(404, "No Organisations Found!");
    }
    res.send(result);
  })
);

orgRouter.post(
  "/signup",
  validateOrg,
  wrapAsync(async (req, res) => {
    let { orgname, name, description, category, address, password, image } =
      req.body;
    let result = await Organisation.find({ orgname: orgname });
    if (result.length == 0) {
      let findCategory = await Category.find({ name: category });

      if (findCategory.length != 0) {
        let newData = new Organisation({
          orgname: orgname,
          image: image,
          name: name,
          password: password,
          description: description,
          address: address,
        });
        newData.category = findCategory[0];
        let token = jwt.sign(
          {
            data: {
              orgname: orgname,
              image: image,
              name: name,
              description: description,
            },
            type: "Organization",
          },
          process.env.JWT_PASS
        );
        await newData.save();
        res.send(token);
      } else {
        throw new ExpressError(404, "Category does not exist!");
      }
    } else {
      throw new ExpressError(400, "Organization exists!");
    }
  })
);

orgRouter.post(
  "/signin",
  wrapAsync(async (req, res) => {
    let { orgname, password } = req.body;
    let findOrg = await Organisation.findOne({ orgname: orgname });
    if (findOrg != null) {
      if (password == findOrg.password) {
        let token = jwt.sign(
          {
            data: {
              orgname: findOrg.orgname,
              image: findOrg.image,
              name: findOrg.name,
              description: findOrg.description,
            },
            type: "Organization",
          },
          process.env.JWT_PASS
        );
        res.send(token);
      } else {
        throw new ExpressError(401, "Wrong Password!");
      }
    } else {
      throw new ExpressError(404, "Org. not found!");
    }
  })
);

orgRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});

module.exports = orgRouter;
