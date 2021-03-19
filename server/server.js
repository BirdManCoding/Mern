require("dotenv/config");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postRoutes = require("./routes/postsRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.use("/api/posts/", postRoutes);

app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);
  res
    .status(error.code || 500)
    .json({ message: error.message || "An unknown error occurred" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    app.listen(process.env.SERVER_PORT);
    console.log("db and server are running");
  })
  .catch(err => {
    throw new Error(err);
  });
