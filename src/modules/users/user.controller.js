

import { User } from "./user.model.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    const user = User.build({
      name,
      email,
      password,
    });

    await user.save();

    return res.status(201).json({
      message: "User created successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------

export const createOrUpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const user = await User.findByPk(id);

    if (user) {
      await user.update(
        { name, email, password, role },
        { validate: false }
      );

      return res.status(200).json({
        message: "User updated successfully",
        user,
      });
    }

    const newUser = User.build(
      { id, name, email, password, role },
      { isNewRecord: true }
    );

    await newUser.save({ validate: false });

    return res.status(201).json({
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------

export const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User found successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  }
  catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
};

// ------------------------------------------------------------

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: { exclude: ["role"] },
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User found successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};