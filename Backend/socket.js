import { Server } from "socket.io";
import crypto from "crypto";

// userId (schoolId) → socketId
const onlineUsers = new Map();

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;

    if (userId) {
      onlineUsers.set(userId, socket.id);
      console.log("🟢 User connected:", userId);
    }

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      const receiverSocketId = onlineUsers.get(receiverId);

      const messageData = {
        _id: crypto.randomUUID(),
        senderId,
        receiverId,
        text,
        createdAt: new Date(),
      };

      // Send to receiver only
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("receiveMessage", messageData);
      }

      // Send back to sender (for UI)
      socket.emit("receiveMessage", messageData);
    });

    socket.on("disconnect", () => {
      if (userId) {
        onlineUsers.delete(userId);
        console.log("🔴 User disconnected:", userId);
      }
    });
  });
};

export default initSocket;
