const { Router } = require("express");
const { check } = require("express-validator");

const postControllers = require("../controllers/postsControllers");

const router = Router();

// @route   GET /api/posts/
// @desc    get all Posts
// @access  Public
router.get("/", postControllers.getPosts);

// @route   GET /api/posts/
// @desc    send a Post
// @access  Public
router.post(
  "/",
  [
    check("title").isString().trim().notEmpty(),
    check("content")
      .isString()
      .trim()
      .notEmpty()
      .isLength({ min: 50, max: 1500 }),
    check("headerImage").isURL().notEmpty(),
  ],
  postControllers.sendPost
);

module.exports = router;
