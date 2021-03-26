const jwt = require("jsonwebtoken");

const HttpError = require("../models/HttpError");

exports.isAuth = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Auth Failed");
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userData = { userId: decodedToken.userId };

    next();
  } catch (err) {
    return next(
      new HttpError(
        "Authentifizierung fehlgeschlagen, bitte erneut einloggen",
        403
      )
    );
  }
};
