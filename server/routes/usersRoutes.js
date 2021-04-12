const { Router } = require("express");
const userControllers = require("../controllers/usersControllers");
const { userValidator } = require("../middlewares/userValidation");

const router = Router();

// @route   GET /api/users/register
// @desc    register Route
// @access  Public
router.post("/register", userValidator, userControllers.register);

// @route   POST /api/users/login
// @desc    login Route
// @access  Public
router.post("/login", userValidator, userControllers.login);

// @route   POST /api/users/logout
// @desc    logout Route
// @access  Public
router.post("/logout", userControllers.logout);

module.exports = router;
