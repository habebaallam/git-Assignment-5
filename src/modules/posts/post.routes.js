
import express from "express";
import {
  createPost,
  deletePost,
  getPostsDetails,
  getPostsWithCommentCount,
} from "./post.controller.js";

const router = express.Router();

router.post("/", createPost);
router.get("/details", getPostsDetails);
router.get("/comment-count", getPostsWithCommentCount);
router.delete("/:postId", deletePost);

export default router;