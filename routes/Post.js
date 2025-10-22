const express = require("express");
const { creatComment } = require("../controllers/commentsController.js");
const { createPost, getPost, getPostById } = require("../controllers/postController.js");
const { likePost, deleteLike } = require("../controllers/likesController.js");
const router = express.Router();



router.post("/comments/create",creatComment);
router.post("/createPost",createPost);
router.get("/getPost",getPost);
router.get("/getPost/:id",getPostById)
router.post("/like",likePost);
router.delete("/deleteLike",deleteLike)
module.exports = router;