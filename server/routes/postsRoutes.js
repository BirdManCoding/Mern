const express = require('express')
const router = express.Router()

// @route   GET /api/posts/sample
// @desc    sampleRoute
// @access  Public
router.get("/sample", (req, res, next) => {
    res.json({message: "Hallo von der Sample Route"});
});
// @route   GET /api/posts/sample
// @desc    sampleRoute
// @access  Public
router.post("/sample", (req, res, next) => {
    res.json({content: req.body});
});

module.exports = router;