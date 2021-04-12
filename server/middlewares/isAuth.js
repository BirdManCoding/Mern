const jwt = require("jsonwebtoken");

const HttpError = require("../models/HttpError");

exports.isAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies.token;

    if (!token) {
      return next(new HttpError("Unauthorized", 401));
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.userId;

    next();
  } catch (err) {
    console.log(err);
    return next(new HttpError("Unauthorized", 401));
  }
};
