const { check } = require("express-validator");
const HttpError = require("../models/HttpError");
const { validationResult } = require("express-validator");

exports.userValidator = [
  check("email").isEmail().normalizeEmail(),
  check("password").isString().trim().notEmpty().isLength({ min: 6 }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(new HttpError("Invalid inputs passed", 422));
    }
    next();
  },
];
