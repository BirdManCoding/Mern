const { Router } = require("express");
const userControllers = require("../controllers/usersControllers");
const { userValidator } = require("../middlewares/userValidation");

const router = Router();

// @route   GET /api/users/register
// @desc    register Route
// @access  Public
router.post("/register", userValidator, userControllers.register);

// @route   GET /api/users/login
// @desc    login Route
// @access  Public
router.post("/login", userValidator, userControllers.login);

module.exports = router;
