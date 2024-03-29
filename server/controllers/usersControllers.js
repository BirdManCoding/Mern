const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const HttpError = require("../models/HttpError");
const User = require("../models/User");

exports.register = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError(err, 500));
  }
  if (existingUser)
    return next(new HttpError("Dieser Benutzer existiert bereits", 422));

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  const newUser = new User({
    email,
    password: hashedPassword,
    posts: [],
  });

  try {
    await newUser.save();
  } catch (err) {
    return next(new HttpError(err, 500));
  }

  res.status(201).json({
    message: "user created successfully",
    userId: newUser.id,
  });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (err) {
    return next(new HttpError(err, 500));
  }
  if (!existingUser) return next(new HttpError("invalid login", 422));

  const valid = await bcrypt.compare(password, existingUser.password);
  if (!valid) return next(new HttpError("invalid login", 422));

  let accessToken = jwt.sign(
    { userId: existingUser.id },
    process.env.JWT_SECRET
  );

  res.cookie("token", accessToken, {
    httpOnly: true,
  });

  res.json({ message: "cookie got send" });
};

exports.logout = async (req, res, next) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.json({ message: "cookie removed" });
};

exports.loggedIn = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const token = req.cookies.token;

    if (!token) {
      return res.json(false);
    }
    jwt.verify(token, process.env.JWT_SECRET);
    res.json(true);
  } catch (err) {
    return res.json(false);
  }
};
