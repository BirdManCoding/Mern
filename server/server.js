require("dotenv/config");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const postRoutes = require("./routes/postsRoutes");
const userRoutes = require("./routes/usersRoutes");

const app = express();

app.use(
  cors({
    origin: process.env.APP_URI,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/posts/", postRoutes);
app.use("/api/users/", userRoutes);

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
