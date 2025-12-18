import express from "express";
import http from "http";
import databaseConnection from "./config/mongodb.js";
import dotenv from "dotenv";
import schoolRouter from "./routes/schoolRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import initSocket from "./socket.js";

dotenv.config();
databaseConnection();

const app = express();
const server = http.createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------- MIDDLEWARE ----------------
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL, // e.g. http://localhost:5173
    credentials: true,
  })
);

// ---------------- ROUTES ----------------
app.use("/schools", schoolRouter);

// ---------------- SOCKET INITIALIZATION ----------------
initSocket(server); // ✅ socket.io attached here

// ---------------- START SERVER ----------------
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
