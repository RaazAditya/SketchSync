// backend/src/utils/jwt.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "raaz";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET not set in environment");
}

export const signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
