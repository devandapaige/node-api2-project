// implement your posts router here
const express = require("express");
const db = require("./posts-model");

const router = express.Router();

//testing router
router.get("/", (req, res) => {
  res.json({ message: "node-api2-project posts-router project api" });
});

//[GET] all posts - promise
router.get("/api/posts", (req, res) => {
  db.find()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The posts information could not be retrieved",
      });
    });
});

//[GET] /api/posts/:id - Promise
router.get("/api/posts/:id", (req, res) => {
  db.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be retrieved",
      });
    });
});

//[POST] /api/posts - Promise
router.post("/api/posts", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  }
  db.insert(req.body)
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});

//[PUT] /api/posts/:id - Edit post Promise
router.put("/api/posts/:id", (req, res) => {
  if (!req.body.title || !req.body.contents) {
    return res.status(400).json({
      message: "Please provide title and contents for the post",
    });
  }
  db.update(req.body.title, req.body)
    .then((post) => {
      post
        ? res.status(200).json(post)
        : res.status(404).json({
            message: "The post with the specified ID does not exist",
          });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "The post information could not be modified",
      });
    });
});

//[DELETE] by id /api/posts/:id - Promise

module.exports = router;
