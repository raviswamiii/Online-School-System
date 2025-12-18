import { Server } from "socket.io";
import Message from "./models/messageModel.js"; // adjust path if needed

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("🔌 Socket connected:", socket.id);

    // join private chat room
    socket.on("joinChat", (chatId) => {
      socket.join(chatId);
      console.log(`👥 Joined chat room: ${chatId}`);
    });

    // send message
    socket.on("sendMessage", async (data) => {
      try {
        const message = await Message.create({
          chatId: data.chatId,
          senderId: data.senderId,
          text: data.text,
        });

        // emit only to that chat room
        io.to(data.chatId).emit("receiveMessage", message);
      } catch (error) {
        console.error("❌ Socket message error:", error.message);
      }
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket disconnected:", socket.id);
    });
  });
};

export default initSocket;
