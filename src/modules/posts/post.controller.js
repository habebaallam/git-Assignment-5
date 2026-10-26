import { Post } from "./post.model.js";
import { User } from "../users/user.model.js";
import { Comment } from "../comments/comment.model.js";
import { sequelize } from "../../DB/connection.js";
// ------------------------------------------------------------

export const createPost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    const post = await Post.create({
      title,
      content,
      userId,
    });

    return res.status(201).json({
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};

// ------------------------------------------------------------


export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const { userId } = req.body;
    const post = await Post.findByPk(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.userId !== userId) {
      return res.status(403).json({ message: " you are not authorized to delete this post" });
    }

    await post.destroy();
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------


export const getPostsDetails = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: ["id", "title"],
      include: [
        {
          model: User,
          attributes: ["id", "name"],
        },
        {
          model: Comment,
          attributes: ["id", "content"],
        },
      ],
    });

    return res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------
export const getPostsWithCommentCount = async (req, res) => {
  try {
    const posts = await Post.findAll({
      attributes: [
        "id",
        "title",
        [
          sequelize.literal(`(
            SELECT COUNT(*)
            FROM comments
            WHERE comments.postId = Post.id
          )`),
          "commentCount",
        ],
      ],
    });

    return res.status(200).json({
      message: "Posts retrieved successfully",
      posts,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};


