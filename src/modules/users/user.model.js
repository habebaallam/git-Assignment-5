

import { DataTypes } from "sequelize";
import { sequelize } from "../../DB/connection.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        checkPasswordLength(value) {
          if (value.length <= 6) {
            throw new Error(
              "Password must be greater than 6 characters"
            );
          }
        },
      },
    },

    role: {
      type: DataTypes.ENUM("user", "admin"),
      defaultValue: "user",
    },
  },
  {
    tableName: "users",

    hooks: {
      beforeCreate(user) {
        if (!user.name || user.name.trim().length <= 2) {
          throw new Error(
            "Name must be greater than 2 characters"
          );
        }
      },
    },
  }
);
