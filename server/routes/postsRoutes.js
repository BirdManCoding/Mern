const { Router } = require("express");
const multer = require("multer");

const { postValidator } = require("../middlewares/postValidation");
const { isAuth } = require("../middlewares/isAuth");
const postControllers = require("../controllers/postsControllers");

const router = Router();
const upload = multer();

// @route   GET /api/posts/ //postControllers.getPosts
// @desc    get all Posts
// @access  Private
router.get("/", isAuth, (req, res, next) => {
  res.json(`your userId ist ${req.userData.userId}`);
});

// @route   GET /api/posts/:id
// @desc    get single Post by id
// @access  Public
router.get("/:id", postControllers.getPost);

// @route   DELETE /api/posts/:id
// @desc    delete single Post by Id
// @access  Public
router.delete("/:id", postControllers.deletePost);

// @route   PATCH /api/posts/:id
// @desc    delete single Post by Id
// @access  Public
router.patch("/:id", postValidator, postControllers.updatePost);

// @route   POST /api/posts/
// @desc    send a Post
// @access  Public
router.post(
  "/",
  upload.single("headerImage"),
  postValidator,
  postControllers.sendPost
);

module.exports = router;
