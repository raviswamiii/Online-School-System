import { Server } from "socket.io";

const socketSetup = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinRoom", ({ senderId, receiverId }) => {
      const roomId = [senderId, receiverId].sort().join("_");
      socket.join(roomId);
      console.log("Joined room:", roomId);
    });

    socket.on("sendMessage", ({ senderId, receiverId, text }) => {
      console.log("Message received:", { senderId, receiverId, text });
      const roomId = [senderId, receiverId].sort().join("_");

      io.to(roomId).emit("receiveMessage", { senderId, text });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export default socketSetup;
