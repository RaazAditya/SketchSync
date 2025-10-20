// backend/src/controllers/authController.js
import { OAuth2Client } from "google-auth-library";
import User from "../models/User.js";
import { signToken } from "../utils/jwt.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Accepts idToken from frontend, verifies it with Google, creates/returns user & jwt
export const googleAuth = async (req, res) => {
  try {
    const { idToken } = req.body;
    if (!idToken) return res.status(400).json({ message: "idToken missing" });

    // verify id token with Google
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    /*
      payload example:
      {
        sub: 'googleId',
        email: 'user@gmail.com',
        name: 'User Name',
        picture: 'https://lh3.googleusercontent.com/...',
        locale: 'en'
      }
    */

    const googleId = payload.sub;
    const email = payload.email;
    const name = payload.name;
    const avatar = payload.picture;
    const locale = payload.locale;

    // Find or create the user
    let user = await User.findOne({ googleId });
    if (!user) {
      // if email already used by another googleId (unlikely) – handle carefully
      user = await User.create({
        googleId,
        name,
        email,
        avatar,
        locale,
      });
    } else {
      // update profile fields if changed
      const shouldUpdate =
        user.name !== name || user.avatar !== avatar || user.locale !== locale || user.email !== email;
      if (shouldUpdate) {
        user.name = name;
        user.avatar = avatar;
        user.locale = locale;
        user.email = email;
        await user.save();
      }
    }

    // create JWT (store user id and roles)
    const token = signToken({ id: user._id, roles: user.roles });

    // Set cookie (httpOnly) and also return token in body for flexibility
    const cookieOptions = {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days (should match JWT_EXPIRES_IN)
      path: "/",
    };

    res.cookie("token", token, cookieOptions);

    // update lastActive
    user.lastActive = new Date();
    await user.save();

    return res.json({
      success: true,
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles,
      },
    });
  } catch (err) {
    console.error("googleAuth error:", err);
    return res.status(500).json({ message: "Google authentication failed" });
  }
};

// GET /api/auth/me
export const getMe = async (req, res) => {
  try {
    const user = req.user;
    if (!user) return res.status(404).json({ message: "User not found" });

    return res.json({
      success: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        roles: user.roles,
      },
    });
  } catch (err) {
    console.error("getMe error:", err);
    return res.status(500).json({ message: "Failed to fetch user" });
  }
};

// POST /api/auth/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", { path: "/" });
    return res.json({ success: true, message: "Logged out" });
  } catch (err) {
    console.error("logout error:", err);
    return res.status(500).json({ message: "Logout failed" });
  }
};
