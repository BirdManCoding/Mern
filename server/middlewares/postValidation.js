const { check } = require("express-validator");
const HttpError = require("../models/HttpError");
const { validationResult } = require("express-validator");

exports.postValidator = [
  check("title").isString().trim().notEmpty(),
  check("content")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 50, max: 1500 }),

  (req, res, next) => {
    const { file } = req;
    if (!file || file.detectedFileExtension !== ".jpg") {
      return next(new HttpError("Invalid inputs passed", 422));
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError("Invalid inputs passed", 422));
    }
    next();
  },
];
