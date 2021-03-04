const express = require('express')
const router = express.Router()

const postControllers = require("../controllers/postsControllers")

// @route   GET /api/posts/
// @desc    get all Posts
// @access  Public
router.get("/", postControllers.getPosts);

// @route   GET /api/posts/
// @desc    send a Post
// @access  Public
router.post("/", postControllers.sendPost);

module.exports = router;