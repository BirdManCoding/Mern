require("dotenv/config");
const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postRoutes = require("./routes/postsRoutes");
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/api/posts/", postRoutes);

    mongoose
    .connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      app.listen(process.env.SERVER_PORT);
      console.log("db and server are running");
    })
    .catch(err => {
      throw new HttpError("An unknown error occurred!", 500);
    });
