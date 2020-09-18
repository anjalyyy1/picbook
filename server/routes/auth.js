const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const login = require("../middleware/login");

router.get("/", (req, res) => {
  res.send("hello");
});

router.post("/signup", (req, res) => {
  const { name, password, email } = req.body;

  if (!email || !password || !name) {
    res.status(422).json({
      error: "Please add the required fields."
    });
  }

  User.findOne({ email })
    .then(savedUser => {
      if (savedUser) {
        res.status(422).json({
          error: "User already exists."
        });
      }

      bcrypt
        .hash(password, 12)
        .then(hashedPassword => {
          const user = new User({
            email,
            name,
            password: hashedPassword
          });

          user
            .save()
            .then(user => {
              return res.json({
                message: "You are logged in.",
                data: user
              });
            })
            .catch(err => {
              res.json({
                error: err
              });
            });
        })
        .catch(err => {
          res.json({
            error: err
          });
        });
    })
    .catch(err => {
      res.json({
        error: err
      });
    });
});

router.post("/signin", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "Please enter all the details."
    });
  }

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(422).json({
        error: "User does not exist."
      });
    }

    bcrypt
      .compare(password, user.password)
      .then(didMatch => {
        if (didMatch) {
          //once signed successfully give FE a jwt token so tht FE can access protected routes
          const token = jwt.sign({ _id: user._id }, JWT_SECRET);
          const { _id, email, name } = user;

          res.json({
            token,
            userData: { _id, email, name }
          });
        } else {
          return res.status(422).json({
            error: "Invalid email or password."
          });
        }
      })
      .catch(err => {
        console.log("error", err);
      });
  });
});

router.get("/protected", login, (req, res) => {
  res.send("hello useer");
});

module.exports = router;
