import http from "http";
import connectDB from "./configs/db.js";
import path from "path"; // ✅ add this


import app from "./app.js";

const PORT = process.env.PORT || 5000;



export default async function startServer() {
  try {
    await connectDB();

    // create HTTP server (you can attach socket.io here)
    const server = http.createServer(app);

    // TODO: initialize socket.io and pass `server` and auth middleware for sockets
    // import { initSocket } from "./socket/socketHandler.js";
    // initSocket(server);

    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Server startup error:", err);
    process.exit(1);
  }
}

