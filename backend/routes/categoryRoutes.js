const express = require("express");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");
const app = express();
const categoryRouter = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const Category = require("../models/category.js");
var jwt = require("jsonwebtoken");

require("dotenv").config();

categoryRouter.use(express.json());

categoryRouter.get("/", wrapAsync(async (req, res) => {
    let result = await Category.find();
    if (result.length === 0) {
        throw new ExpressError(404, "No Category Found!");
    }
    const names = result.map(category => category.name);
    res.send(names);
}));

module.exports = categoryRouter;