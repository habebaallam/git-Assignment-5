
import { Comment } from "./comment.model.js";
import { Op } from "sequelize";
import { User } from "../users/user.model.js";
import { Post } from "../posts/post.model.js";

export const createBulkComments = async (req, res) => {
  try {
    const comments = await Comment.bulkCreate(req.body);

    return res.status(201).json({
      message: "Comments created successfully",
      comments,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------

export const updateComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const { userId, content } = req.body;

    const comment = await Comment.findByPk(commentId);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    if (comment.userId !== Number(userId)) {
      return res.status(403).json({
        message: " you are not authorized to update this comment",
      });
    }

    comment.content = content;
    await comment.save();

    return res.status(200).json({
      message: "Comment updated successfully",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------

export const findOrCreateComment = async (req, res) => {
  try {
    const { postId, userId, content } = req.body;

    const [comment, created] = await Comment.findOrCreate({
      where: {
        postId,
        userId,
        content,
      },
      defaults: {
        postId,
        userId,
        content,
      },
    });

    return res.status(created ? 201 : 200).json({
      message: created
        ? "Comment created successfully"
        : "Comment already exists",
      comment,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------

export const searchComments = async (req, res) => {
  try {
    const { word } = req.query;

    if (!word) {
      return res.status(400).json({
        message: "no comment found",
      });
    }

    const where = {
      content: {
        [Op.like]: `%${word}%`,
      },
    };

    const comments = await Comment.findAll({ where });
    const count = await Comment.count({ where });

    return res.status(200).json({
      count,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------

export const getNewestComments = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.findAll({
      where: { postId },
      order: [["createdAt", "DESC"]],
      limit: 3,
    });

    return res.status(200).json({
      count: comments.length,
      comments,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------
export const getSpecificCommentDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: User,
          attributes: ["id", "name", "email"],
        },
        {
          model: Post,
          attributes: ["id", "title", "content"],
        },
      ],
    });

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found",
      });
    }

    return res.status(200).json({
      comment,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

