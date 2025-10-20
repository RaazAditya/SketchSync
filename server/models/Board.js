import mongoose from "mongoose";

const boardSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Untitled Board",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    collaborators: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    data: {
      type: Object, // fabric.js canvas JSON
      default: {},
    },
    lastEdited: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Board", boardSchema);
