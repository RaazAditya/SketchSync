// backend/src/models/User.js
import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {},
  { _id: false } // not using participants here; placeholder if needed later
);

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
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
      index: true,
    },
    avatar: {
      type: String,
    },
    locale: {
      type: String,
    },
    timezone: {
      type: String,
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
    roles: {
      type: [String],
      enum: ["user", "admin"],
      default: ["user"],
    },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
