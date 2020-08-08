const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Posts = mongoose.model("Posts");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys");
const login = require("../middleware/login");

//create posts
router.post("/createpost", login, (req, res) => {
  const { title, body } = req.body;
  if (!title || !body) {
    return res.status(422).json({
      error: "Please add all the fields"
    });
  }
  console.log(req.user);

  // create post
  const post = new Posts({
    title,
    body,
    postedBy: req.user
  });

  post
    .save()
    .then(newPost => {
      return res.status(201).json({
        data: newPost
      });
    })
    .catch(err => {
      return res.json({
        err
      });
    });
});

// all posts irrespective of the user
router.get("/posts", login, (req, res) => {
  Posts.find()
    .populate("postedBy", "_id name")
    .then(posts => {
      res.status(200).json({
        data: posts
      });
    })
    .catch(err => {
      res.json({
        err
      });
    });
});

// user posts
router.get("/myposts", login, (req, res) => {
  Posts.find({ postedBy: req.user._id })
    .populate("postedBy", "_id name")
    .then(posts => {
      res.status(200).json({
        data: posts
      });
    })
    .catch(err => {
      res.json({
        err
      });
    });
});
module.exports = router;
