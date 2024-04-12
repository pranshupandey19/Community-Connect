const { helpValidation } = require("../utils/validation");

const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const bodyParser = require("body-parser");

var jwt = require("jsonwebtoken");
const helpRouter = express.Router();
const { userValidation, eventValidation } = require("../utils/validation");
const ExpressError = require("../utils/ExpressError.js");
const Category = require("../models/category");
const Help = require("../models/help");
require("dotenv").config();

helpRouter.use(express.json());

helpRouter.use(bodyParser.json({ limit: "50mb" }));
helpRouter.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

const validateHelp = (req, res, next) => {
  let { error } = helpValidation.validate(req.body);
  if (error) {
    throw new ExpressError(400, error);
  } else {
    next();
  }
};

helpRouter.get("/all", wrapAsync(async(req, res)=>{
  let data = await Help.find({}).populate('category');
  res.send(data);
}))

helpRouter.post("/help",validateHelp,wrapAsync(async(req,res)=>{
  let {title,description,address,image,category} = req.body
  let findCat = await Category.find({name:category})
  if(findCat.length != 0){
    let newData = new Help({
      title:title,
      description:description,
      address:address,
      image:image
    })
    newData.category = findCat[0]
    await newData.save()
    res.send("help received")
  }
  else{
    throw new ExpressError(404, "Category not found");
  }
}))

helpRouter.put("/update/:id", wrapAsync(async(req, res)=>{
  let {newState} = req.body
  let { id } = req.params;
  let findHelp = await Help.findById(id);
  findHelp.state = newState;
  await findHelp.save()
  res.send("Done")
}))


helpRouter.use((err, req, res, next) => {
  let { status = 500, message = "Some error occured..!" } = err;
  res.status(status).send(message);
});


module.exports = helpRouter;
