const { Router } = require("express");

const { postValidator } = require("../middlewares/postValidation");
const postControllers = require("../controllers/postsControllers");

const router = Router();

// @route   GET /api/posts/
// @desc    get all Posts
// @access  Public
router.get("/", postControllers.getPosts);

// @route   GET /api/posts/
// @desc    send a Post
// @access  Public
router.post("/", postValidator(), postControllers.sendPost);

module.exports = router;
