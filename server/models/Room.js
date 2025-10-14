// models/Room.js
import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    participants: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        role: {
          type: String,
          enum: ["host", "editor", "viewer"],
          default: "editor",
        },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
    mode: {
      type: String,
      enum: ["cloud", "lan"],
      default: "cloud",
    },
    isLocked: {
      type: Boolean,
      default: false, // Host can lock/unlock editing
    },
    board: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Board",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
