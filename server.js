
import dotenv from "dotenv";
import app from "./src/app.js";
import { sequelize } from "./src/DB/connection.js";

import { User } from "./src/modules/users/user.model.js";
import { Post } from "./src/modules/posts/post.model.js";
import { Comment } from "./src/modules/comments/comment.model.js";

dotenv.config();


User.hasMany(Post, { foreignKey: "userId" });
Post.belongsTo(User, { foreignKey: "userId" });

Post.hasMany(Comment, { foreignKey: "postId" });
Comment.belongsTo(Post, { foreignKey: "postId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    console.log("Database tables created successfully.");
    console.log("Database connected successfully.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error.message);
  }
};

startServer();