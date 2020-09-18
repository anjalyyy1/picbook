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
  const { title, body, imageUrl } = req.body;
  if (!title || !body || !imageUrl) {
    return res.status(422).json({
      error: "Please add all the fields"
    });
  }
  console.log(req.user);

  // create post
  const post = new Posts({
    title,
    body,
    picture: imageUrl,
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
    .populate("comments.postedBy", "_id name")
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

//create posts
router.patch("/like", login, async (req, res) => {
  try {
    const response = await Posts.findByIdAndUpdate(
      req.body.postId,
      { $push: { likes: req.user._id } },
      { new: true }
    );

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: error });
  }
});

//create posts
router.patch("/dislike", login, async (req, res) => {
  Posts.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: { likes: req.user._id }
    },
    { new: true }
  ).exec((err, result) => {
    if (err) {
      return res.status(422).json({ error: err });
    } else {
      res.json(result);
    }
  });
});

//create posts
router.patch("/comment", login, async (req, res) => {
  const comment = {
    postedBy: req.user._id,
    text: req.body.comment
  };

  try {
    const response = await Posts.findByIdAndUpdate(
      req.body.postId,
      { $push: { comments: comment } },
      { new: true }
    )
      .populate("comments.postedBy", "_id name")
      .populate("postedBy", "_id name");

    return res.json(response);
  } catch (error) {
    console.log(error);
    return res.status(422).json({ error: error });
  }
});

module.exports = router;
