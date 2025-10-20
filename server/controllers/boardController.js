import Board from "../models/Board.js";

export const getBoards = async (req, res) => {
  try {
    const boards = await Board.find({ owner: req.user.id }).sort({
      updatedAt: -1,
    });
    res.json(boards);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch boards" });
  }
};

export const createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      owner: req.user.id,
      title: req.body.title || "Untitled Board",
    });
    res.status(201).json(board);
  } catch (error) {
    res.status(500).json({ message: "Failed to create board" });
  }
};

export const getBoardById = async (req, res) => {
  try {
    const board = await Board.findById(req.params.id);
    if (!board) return res.status(404).json({ message: "Board not found" });
    res.json(board);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch board" });
  }
};
