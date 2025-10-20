// backend/src/app.js
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes.js";
import boardRoutes from "./routes/boardRoutes.js";


const app = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// CORS - allow frontend origin and allow credentials for cookies
const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
app.use(
  cors({
    origin: CLIENT_URL,
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);

// Health check
app.get("/api/health", (req, res) => res.json({ ok: true }));

export default app;
