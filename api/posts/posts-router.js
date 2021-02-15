// implement your posts router here
const express = require("express");
const posts = require("./posts-model");

const router = express.Router();

router.get("/", (req, res) => {
    res.json({ message: "node-api2-project posts-router project api"})
})

module.exports = router;
