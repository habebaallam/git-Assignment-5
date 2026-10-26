
import express from "express";
import {
  createBulkComments,
  updateComment,
  findOrCreateComment,
  searchComments,
    getNewestComments,
    getSpecificCommentDetails,
} from "./comment.controller.js";

const router = express.Router();

router.post("/", createBulkComments);
router.post("/find-or-create", findOrCreateComment);
router.get("/search", searchComments);
router.get("/newest/:postId", getNewestComments);
router.get("/details/:id", getSpecificCommentDetails);
router.patch("/:commentId", updateComment);

export default router;