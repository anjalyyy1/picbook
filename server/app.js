const express = require("express");
const app = express();
const PORT = 5000;
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
app.listen(PORT);

mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.on("connected", () => {
  console.log("db connected");
});

mongoose.connection.on("error", err => {
  console.log("error", err);
});

// disabling cors
app.use((req, res, next) => {
  // this will not send any response but would adjust/enhance it
  res.header("Access-Control-Allow-Origin", "*"); // * -> give access to any origin (any webpage, or we can specify the url to whom we want to give the access)
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  ); // cld be * also (these headers can also be appended to an incoming request)

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
    return res.status(200).json({}); // we return so tht further code is not executed if the req method is OPTIONS
  }
  next();
});

require("./models/user");
require("./models/posts");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/posts"));
