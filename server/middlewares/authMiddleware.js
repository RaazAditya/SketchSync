// backend/src/middleware/authMiddleware.js
import { verifyToken } from "../utils/jwt.js";
import User from "../models/User.js";

export const authMiddleware = async (req, res, next) => {
  try {
    // Try cookie first (httpOnly cookie), then Authorization header
    const token =
      req.cookies?.token ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = verifyToken(token);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.id).select("-__v");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    console.error("authMiddleware error:", err);
    return res.status(401).json({ message: "Authentication failed" });
  }
};
