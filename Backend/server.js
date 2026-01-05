import express from "express";
import databaseConnection from "./config/mongodb.js";
import dotenv from "dotenv";
import schoolRouter from "./routes/schoolRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
// import { createServer } from "http";
// import { Server } from "socket.io";

dotenv.config();
databaseConnection();

const PORT = process.env.PORT || 3000;
const app = express();
// const server = new createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: process.env.FRONTEND_URL,
//     methods: ["GET", "POST"],
//     credentials: true,
//   },
// });

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

// io.on("connection", (socket) => {
//   console.log("User connected", socket.id);

//   socket.on("disconnect", () => {
//     console.log("User disconnected", socket.id);
//   });

//   socket.on("message", ({room, messages}) => {
//     console.log("Message received:", room, messages);
//     io.to(room).emit("message-receive", messages);
//   });
// });

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
