exports.getPosts =  (req, res, next) => {
    res.json({message: "get controller is working"});
}

exports.sendPost =  (req, res, next) => {
    console.log(req.body);
    res.json({message: "post controller is working"});
}


