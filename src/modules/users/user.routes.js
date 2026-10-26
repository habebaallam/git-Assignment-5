import express from "express";
import {
  signup,
  createOrUpdateUser,
  getUserByEmail,
  getUserById,
} from "./user.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.put("/:id", createOrUpdateUser);
router.get("/by-email", getUserByEmail);
router.get("/:id", getUserById);

export default router;

