import "dotenv/config";
import express from "express";
import databaseConnection from "./config/mongodb.js";
import schoolRouter from "./routes/schoolRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/messageRoute.js";
import { createServer } from "http";
import { initSocket } from "./socket.js";

databaseConnection();
const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
initSocket(server);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/schools", schoolRouter);
app.use("/messages", messageRouter);

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
