// backend/src/routes/authRoutes.js
import express from "express";
import { googleAuth, getMe, logout } from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * POST /api/auth/google
 * Body: { idToken: string }
 * Verifies Google ID token and returns JWT and user.
 */
router.post("/google", googleAuth);

/**
 * GET /api/auth/me
 * Protected route — returns current user info
 */
router.get("/me", authMiddleware, getMe);

/**
 * POST /api/auth/logout
 */
router.post("/logout", authMiddleware, logout);

export default router;
