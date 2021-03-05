const Post = require("../models/Post");
const HttpError = require("../models/HttpError");

exports.getPosts = async (req, res, next) => {
  let posts;

  try {
    posts = await Post.find({});
  } catch (err) {
    next(new HttpError(err));
  }

  if (posts.length === 0 || !posts) {
    return next(new HttpError("No Posts found", 404));
  }

  res.json(posts);
};

exports.sendPost = async (req, res, next) => {
  const post = new Post({ ...req.body });

  let response;
  try {
    response = await post.save();
  } catch (err) {
    next(new HttpError(err));
  }

  res.json(response);
};
