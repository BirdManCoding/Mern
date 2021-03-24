const bcrypt = require("bcrypt");

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

  res
    .status(201)
    .json({ message: "user created successfully", userId: newUser.id });
};
