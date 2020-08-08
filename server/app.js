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

require("./models/user");
require("./models/posts");

app.use(express.json());
app.use(require("./routes/auth"));
app.use(require("./routes/posts"));
