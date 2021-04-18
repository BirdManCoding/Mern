const { v4: uuid4 } = require("uuid");
const { promisify } = require("util");
const fs = require("fs");
const pipeline = promisify(require("stream").pipeline);
const mongoose = require("mongoose");

const User = require("../models/User");
const Post = require("../models/Post");
const HttpError = require("../models/HttpError");

/*=================================================================================================================
get Posts
=====================================================================================================================*/

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

  const postToObject = posts.map(post => post.toObject({ getters: true }));

  res.json(postToObject);
};

/*=================================================================================================================
get single Post by Id
=====================================================================================================================*/

exports.getPost = async (req, res, next) => {
  const postId = req.params.id;

  let post;
  try {
    post = await Post.findById(postId);
  } catch (err) {
    return next(new HttpError(err));
  }

  if (!post) return next(new HttpError("No Post was found by Id", 404));

  res.json(post.toObject({ getters: true }));
};

/*=================================================================================================================
delete single Post by Id
=====================================================================================================================*/

exports.deletePost = async (req, res, next) => {
  const postId = req.params.id;

  let deletedPost;
  try {
    deletedPost = await Post.findByIdAndDelete(postId);
  } catch (err) {
    return next(new HttpError(err));
  }

  if (!deletedPost) return next(new HttpError("No Post found by Id", 404));

  res.json({ deleted: true });
};

/*=================================================================================================================
update single Post by Id
=====================================================================================================================*/

exports.updatePost = async (req, res, next) => {
  const postId = req.params.id;
  const body = req.body;

  let updatedPost;
  try {
    updatedPost = await Post.findByIdAndUpdate(postId, body);
  } catch (err) {
    return next(new HttpError(err));
  }

  if (!updatedPost) return next(new HttpError("No Post found by Id", 404));

  res.json({ postId: postId, body: body });
};

/*=================================================================================================================
send a Post
=====================================================================================================================*/

exports.sendPost = async (req, res, next) => {
  const { file } = req;
  const fileName = uuid4() + file.detectedFileExtension;
  await pipeline(
    file.stream,
    fs.createWriteStream(`${__dirname}/../public/images/${fileName}`)
  );

  const post = new Post({
    ...req.body,
    headerImage: fileName,
    userId: req.user,
  });

  try {
    const user = await User.findById(req.user);
    const session = await mongoose.startSession();
    user.posts.push(post.id);

    session.startTransaction();
    await post.save({ session });
    await user.save({ session });
    await session.commitTransaction();
  } catch (err) {
    next(new HttpError(err));
  }

  res.json({ message: "post created successfully" });
};
