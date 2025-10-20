import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  getBoards,
  createBoard,
  getBoardById,
} from "../controllers/boardController.js";

const router = express.Router();

// Get all boards for logged-in user
router.get("/", authMiddleware, getBoards);

// Create new board
router.post("/", authMiddleware, createBoard);

// Get a specific board
router.get("/:id", authMiddleware, getBoardById);

export default router;
