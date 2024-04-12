const Joi = require("joi");
const Organisation = require("../models/organisation");

exports.userValidation = Joi.object({
  name: Joi.string().required(),
  username: Joi.string().required(),
  institution: Joi.string(),
  address: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  contact: Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.number().required(),
  }).required(),
});

exports.orgValidation = Joi.object({
  orgname: Joi.string().required(),
  name: Joi.string().required(),
  image: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  description: Joi.string().required(),
  category: Joi.string().required(),
  address: Joi.string().required(),
});

exports.institutionValidation = Joi.object({
  name: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d@$!%*?&]{8,}$"))
    .required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  contact: Joi.object({
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    phone: Joi.number().required(),
  }).required(),
});

exports.eventValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  volunteers: Joi.number().required(),
  budget: Joi.number().required(),
  date: Joi.date().required(),
  institution: Joi.string().required(),
});

exports.helpValidation = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  address: Joi.string().required(),
  category: Joi.string().required(),
  image: Joi.string().required(),
});

exports.npoValidation = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().required(),
  image: Joi.string().required(),
  address: Joi.string().required(),
  volunteers: Joi.number().required(),
  date: Joi.date().required(),
  organisation: Joi.string().required(),
});