// models/Board.js
import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    data: {
      type: Object, // Fabric.js JSON structure
      required: true,
    },
    lastModifiedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    snapshots: [
      {
        data: Object, // for replay or undo-redo
        timestamp: { type: Date, default: Date.now },
      },
    ],
    lastSaved: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);
