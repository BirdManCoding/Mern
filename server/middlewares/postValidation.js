const { check } = require("express-validator");

exports.postValidator = () => [
  check("title").isString().trim().notEmpty(),
  check("content")
    .isString()
    .trim()
    .notEmpty()
    .isLength({ min: 50, max: 1500 }),
  check("headerImage").isURL().notEmpty(),
];
