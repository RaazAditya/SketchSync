// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    avatar: {
      type: String, // Google profile picture URL
    },
    locale: {
      type: String, // 'en', 'hi', etc.
    },
    timezone: {
      type: String, // Optional, useful for notifications or time-based replay
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    // For quick access control
    roles: {
      type: [String],
      enum: ["user", "admin"],
      default: ["user"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
