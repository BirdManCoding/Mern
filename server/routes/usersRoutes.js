const { Router } = require("express");
const userControllers = require("../controllers/usersControllers");
const { userValidator } = require("../middlewares/userValidation");

const router = Router();

// @route   GET /api/users/register
// @desc    sample Route
// @access  Public
router.post("/register", userValidator, userControllers.register);

module.exports = router;
