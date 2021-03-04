const Post = require("../models/Post")

exports.getPosts =  async (req, res, next) => {
    let posts;

    try {
        posts = await Post.find({});
      } catch (err) {
        throw new Error(err);
      }

    res.json(posts);
}

exports.sendPost =  async (req, res, next) => {

    const post = new Post({...req.body});
    
    let response;
    try{
       response = await post.save();
    }catch(err){
        throw new Error(err);
    }


    res.json({createdPost: {response}});
}


