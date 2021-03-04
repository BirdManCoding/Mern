require("dotenv/config");
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');



( async() => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.get("/", (req, res, next) => res.send(`Der Port ist ${process.env.SERVER_PORT}`));

    app.post("/", (req, res, next) => {
        console.log(req.body);
        res.status(200).send(true)
    })

    try{
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        })
    }catch(err){
        throw new Error("An unknown error occurred")
    }

    app.listen(process.env.SERVER_PORT, () => {
        console.log(`Server running on Port ${process.env.SERVER_PORT}`)
    });
})()