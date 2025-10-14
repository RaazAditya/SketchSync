// models/SessionEvent.js
import mongoose from "mongoose";

const sessionEventSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    type: {
      type: String,
      enum: ["draw", "add", "delete", "move", "text", "shape"],
      required: true,
    },
    payload: {
      type: Object, // the actual change details (Fabric.js object)
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SessionEvent", sessionEventSchema);
