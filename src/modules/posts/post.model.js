
import { Model, DataTypes } from "sequelize";
import { sequelize } from "../../DB/connection.js";

export class Post extends Model {}

Post.init({
    id : {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title : {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    content : {
        type: DataTypes.TEXT,
        allowNull: false,
},
 userId : {
    type: DataTypes.INTEGER,
    allowNull: false,
 },
},
{
    sequelize,
    modelName: "Post",
    tableName: "posts",
    paranoid: true,
}
); 